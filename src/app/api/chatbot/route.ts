import { NextRequest, NextResponse } from 'next/server'

/**
 * POST /api/chatbot
 * Sends a message to the n8n webhook and returns the response
 */
export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const { sessionId, message, locale, timestamp } = body

        // Validate required fields
        if (!sessionId || !message) {
            return NextResponse.json(
                { error: 'Missing required fields: sessionId, message' },
                { status: 400 }
            )
        }

        const webhookUrl = process.env.CHATBOT_WEBHOOK_URL

        if (!webhookUrl) {
            console.error('CHATBOT_WEBHOOK_URL is not configured')
            return NextResponse.json(
                { error: 'Chatbot service is not configured' },
                { status: 503 }
            )
        }

        // Send to n8n webhook
        const webhookResponse = await fetch(webhookUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                sessionId,
                message,
                locale: locale || 'fr',
                timestamp: timestamp || new Date().toISOString(),
                source: 'smatch-website',
            }),
        })

        if (!webhookResponse.ok) {
            console.error('Webhook error:', webhookResponse.status, await webhookResponse.text())
            return NextResponse.json(
                { error: 'Failed to process message' },
                { status: 502 }
            )
        }

        // Parse webhook response (n8n should return the bot's reply)
        const data = await webhookResponse.json()

        return NextResponse.json({
            success: true,
            reply: data.reply || data.message || data.response || "Merci pour votre message! Un expert vous répondra bientôt.",
            sessionId,
        })
    } catch (error) {
        console.error('Chatbot API error:', error)
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        )
    }
}
