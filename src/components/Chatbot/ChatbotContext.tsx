'use client'

import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react'

// Generate a unique session ID for the browser session
function generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`
}

interface ChatbotContextType {
    isOpen: boolean
    openChat: () => void
    closeChat: () => void
    toggleChat: () => void
    sessionId: string
    isLoading: boolean
    sendMessage: (message: string, locale?: string) => Promise<string | null>
}

const ChatbotContext = createContext<ChatbotContextType | undefined>(undefined)

export function ChatbotProvider({ children }: { children: ReactNode }) {
    const [isOpen, setIsOpen] = useState(false)
    const [sessionId, setSessionId] = useState<string>('')
    const [isLoading, setIsLoading] = useState(false)

    // Initialize session ID on mount (client-side only)
    useEffect(() => {
        // Check if we have an existing session in sessionStorage
        const existingSession = sessionStorage.getItem('chatbot_session_id')
        if (existingSession) {
            setSessionId(existingSession)
        } else {
            const newSessionId = generateSessionId()
            sessionStorage.setItem('chatbot_session_id', newSessionId)
            setSessionId(newSessionId)
        }
    }, [])

    const openChat = () => setIsOpen(true)
    const closeChat = () => setIsOpen(false)
    const toggleChat = () => setIsOpen((prev) => !prev)

    const sendMessage = useCallback(async (message: string, locale: string = 'fr'): Promise<string | null> => {
        if (!sessionId) return null

        setIsLoading(true)
        try {
            const response = await fetch('/api/chatbot', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    sessionId,
                    message,
                    locale,
                    timestamp: new Date().toISOString(),
                }),
            })

            if (!response.ok) {
                console.error('Chatbot API error:', response.status)
                return null
            }

            const data = await response.json()
            return data.reply || null
        } catch (error) {
            console.error('Failed to send message:', error)
            return null
        } finally {
            setIsLoading(false)
        }
    }, [sessionId])

    return (
        <ChatbotContext.Provider value={{
            isOpen,
            openChat,
            closeChat,
            toggleChat,
            sessionId,
            isLoading,
            sendMessage
        }}>
            {children}
        </ChatbotContext.Provider>
    )
}

export function useChatbot() {
    const context = useContext(ChatbotContext)
    if (context === undefined) {
        throw new Error('useChatbot must be used within a ChatbotProvider')
    }
    return context
}
