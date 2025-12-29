'use client'

import React, { useState, useMemo, useDeferredValue } from 'react'
import * as PhosphorIcons from '@phosphor-icons/react'
import Fuse from 'fuse.js'

// Filter out non-icon exports more aggressively
const iconList = Object.keys(PhosphorIcons).filter((key) => {
    // Phosphor icons always start with a capital letter
    if (key[0] !== key[0].toUpperCase()) return false
    // Exclude known non-icon exports
    if (['IconContext', 'Icon', 'SSR', 'IconBase'].includes(key)) return false
    // Ensure it's something that looks like a component
    const exportItem = (PhosphorIcons as Record<string, unknown>)[key]
    return exportItem && (typeof exportItem === 'function' || typeof exportItem === 'object')
})

export const IconGallery: React.FC = () => {
    const [search, setSearch] = useState('')
    const deferredSearch = useDeferredValue(search) // Debounce rendering for performance
    const [copied, setCopied] = useState<string | null>(null)

    // Memoize the fuzzy searcher
    const fuse = useMemo(() => new Fuse(iconList, {
        threshold: 0.3, // 0.0 = perfect match, 1.0 = match anything. 0.3 allows for some typos.
        distance: 100,
        keys: [], // array required by TS definition even if searching specific strings
    }), [])

    // Smart filtering
    const filteredIcons = useMemo(() => {
        if (!deferredSearch) return iconList
        return fuse.search(deferredSearch).map((result) => result.item)
    }, [deferredSearch, fuse])

    const handleCopy = (name: string) => {
        navigator.clipboard.writeText(name)
        setCopied(name)
        setTimeout(() => setCopied(null), 2000)
    }

    return (
        <PhosphorIcons.IconContext.Provider value={{
            color: "currentColor",
            size: 32,
            weight: "regular",
            mirrored: false,
        }}>
            <div className="icon-gallery-container" style={{ padding: '40px', maxWidth: '1600px', margin: '0 auto' }}>

                <div style={{ marginBottom: '40px' }}>
                    <h1 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '10px' }}>Icon Library (Phosphor)</h1>
                    <p style={{ color: '#666', marginBottom: '20px' }}>
                        Click any icon to copy its name to the clipboard. Paste it into the &quot;Icon&quot; field in the CMS.
                    </p>
                    <div style={{ position: 'relative', maxWidth: '600px' }}>
                        <input
                            type="text"
                            placeholder="Smart Search (e.g., 'Warning' matches 'WarningCircle')..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            style={{
                                width: '100%',
                                padding: '12px 20px',
                                fontSize: '16px',
                                border: '1px solid #ddd',
                                borderRadius: '8px',
                                backgroundColor: '#fff',
                                color: '#000',
                                fontFamily: 'inherit',
                                boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
                            }}
                        />
                        {/* Visual indicator for deferred loading */}
                        {search !== deferredSearch && (
                            <div style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', color: '#888' }}>
                                ...
                            </div>
                        )}
                    </div>
                    <div style={{ marginTop: '10px', fontSize: '14px', color: '#888' }}>
                        Showing {filteredIcons.length} icons
                    </div>
                </div>

                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
                        gap: '20px',
                    }}
                >
                    {filteredIcons.map((name) => {
                        const Icon = (PhosphorIcons as any)[name]
                        const isCopied = copied === name

                        // Fallback if component is missing (safety)
                        if (!Icon) return null

                        return (
                            <button
                                key={name}
                                onClick={() => handleCopy(name)}
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    padding: '20px',
                                    border: isCopied ? '1px solid #22c55e' : '1px solid #eee',
                                    borderRadius: '12px',
                                    backgroundColor: isCopied ? '#f0fdf4' : '#fff',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s ease',
                                    gap: '12px',
                                    minHeight: '110px'
                                }}
                                title={`Click to copy: ${name}`}
                                type="button"
                            >
                                <Icon />
                                <span
                                    style={{
                                        fontSize: '11px',
                                        color: isCopied ? '#22c55e' : '#666',
                                        textAlign: 'center',
                                        wordBreak: 'break-word',
                                        fontFamily: 'monospace',
                                        lineHeight: '1.2'
                                    }}
                                >
                                    {isCopied ? 'COPIED!' : name}
                                </span>
                            </button>
                        )
                    })}
                </div>

                {filteredIcons.length === 0 && (
                    <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
                        No icons found matching &quot;{search}&quot;
                    </div>
                )}
            </div>
        </PhosphorIcons.IconContext.Provider>
    )
}
