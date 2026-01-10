'use client'

import React, { useEffect, useState } from 'react'

/**
 * ScaleWrapper
 * 
 * This component forces the application to maintain the proportions of the 
 * 1600px design on smaller screens (between 1024px and 1600px) by 
 * mathematically scaling the content.
 * 
 * It effectively "zooms out" the interface on 1080p-1440p screens (or high-DPI 
 * screens with scaling) to preserve the "Pro" look intended for wide displays.
 */
export const ScaleWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [scale, setScale] = useState(1)

    useEffect(() => {
        const handleResize = () => {
            // We target a 1600px design width
            const targetWidth = 1600
            const currentWidth = window.innerWidth

            // Only apply scaling logic for screens that are:
            // 1. Smaller than our target (1600px)
            // 2. Larger than typical tablets (1024px) - below this we want natural mobile/tablet flow
            if (currentWidth < targetWidth && currentWidth > 1024) {
                const newScale = currentWidth / targetWidth
                setScale(newScale)
            } else {
                setScale(1) // Reset to normal scale
            }
        }

        // Initial calculation
        handleResize()

        // Add event listener
        window.addEventListener('resize', handleResize)

        // Cleanup
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    // If scale is 1, render normally to avoid unnecessary CSS layers
    if (scale === 1) {
        return <>{children}</>
    }

    return (
        <div
            style={{
                // @ts-ignore - 'zoom' is a non-standard property but essential for this specific Chrome/Edge fix
                zoom: scale,
                width: '100%',
                height: '100%',
            }}
        >
            {children}
        </div>
    )
}
