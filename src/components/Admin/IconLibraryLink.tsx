'use client'
import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export const IconLibraryLink: React.FC = () => {
    const pathname = usePathname()
    const isActive = pathname === '/admin/icons'

    return (
        <div style={{ marginTop: '10px', paddingLeft: '10px' }}>
            <Link
                href="/admin/icons"
                style={{
                    textDecoration: 'none',
                    color: isActive ? 'var(--theme-success-500)' : 'var(--theme-elevation-500)',
                    fontWeight: isActive ? 'bold' : 'normal',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontSize: '0.9rem'
                }}
            >
                🎨 Icon Library
            </Link>
        </div>
    )
}

export default IconLibraryLink
