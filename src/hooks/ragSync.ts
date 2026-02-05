import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

interface RAGPayload {
    source_id: string
    action: 'upsert' | 'delete'
    content?: string
    metadata?: {
        collection: string
        slug: string
        locale: string
        url: string
    }
}

/**
 * Sends a document update to the n8n RAG webhook for vector database synchronization.
 * Fire-and-forget pattern with timeout to prevent blocking CMS operations.
 */
async function sendToRAGWebhook(payload: RAGPayload): Promise<void> {
    const webhookUrl = process.env.N8N_RAG_WEBHOOK_URL

    if (!webhookUrl) {
        console.warn('[RAG] N8N_RAG_WEBHOOK_URL not configured, skipping sync')
        return
    }

    try {
        // Create abort controller for 5-second timeout
        const controller = new AbortController()
        const timeoutId = setTimeout(() => controller.abort(), 5000)

        await fetch(webhookUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
            signal: controller.signal,
        })

        clearTimeout(timeoutId)
    } catch (error) {
        // Log error but don't throw - we don't want to block CMS operations
        console.error('[RAG] Webhook sync failed:', error)
    }
}

/**
 * Extracts searchable content from a document.
 * Override this function per collection if needed.
 */
function extractContent(doc: any): string {
    const parts: string[] = []

    if (doc.title) parts.push(doc.title)
    if (doc.headline) parts.push(doc.headline)
    if (doc.description) parts.push(doc.description)
    if (doc.excerpt) parts.push(doc.excerpt)

    // For rich text content, extract plain text
    if (doc.content && Array.isArray(doc.content)) {
        const textContent = doc.content
            .map((block: any) => {
                if (block.type === 'paragraph' && block.children) {
                    return block.children.map((child: any) => child.text || '').join(' ')
                }
                return ''
            })
            .join(' ')
        parts.push(textContent)
    }

    return parts.join('. ').trim()
}

/**
 * Creates an afterChange hook for RAG synchronization.
 * Only syncs published documents.
 */
export function createRAGAfterChangeHook(
    collectionSlug: string,
): CollectionAfterChangeHook {
    return async ({ doc, previousDoc, operation }) => {
        const locale = doc.locale || 'fr'
        const slug = doc.slug || doc.id

        // Build source_id: {collection}_{id}
        const source_id = `${collectionSlug}_${doc.id}`

        // Case 1: Document is now published -> UPSERT
        if (doc._status === 'published') {
            const content = extractContent(doc)
            const url = `/${locale}/${collectionSlug}/${slug}`

            const payload: RAGPayload = {
                source_id,
                action: 'upsert',
                content,
                metadata: {
                    collection: collectionSlug,
                    slug,
                    locale,
                    url,
                },
            }

            // Fire and forget
            sendToRAGWebhook(payload).catch(() => {
                // Already logged in sendToRAGWebhook
            })
        }

        // Case 2: Document was published but is now unpublished -> DELETE
        if (previousDoc?._status === 'published' && doc._status === 'draft') {
            const payload: RAGPayload = {
                source_id,
                action: 'delete',
            }

            sendToRAGWebhook(payload).catch(() => {
                // Already logged
            })
        }
    }
}

/**
 * Creates an afterDelete hook for RAG synchronization.
 * Removes the document from the vector database.
 */
export function createRAGAfterDeleteHook(
    collectionSlug: string,
): CollectionAfterDeleteHook {
    return async ({ doc }) => {
        const source_id = `${collectionSlug}_${doc.id}`

        const payload: RAGPayload = {
            source_id,
            action: 'delete',
        }

        sendToRAGWebhook(payload).catch(() => {
            // Already logged
        })
    }
}
