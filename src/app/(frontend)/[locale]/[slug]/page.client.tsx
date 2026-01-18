'use client'

import { useSelectedLayoutSegment } from 'next/navigation'
import React, { useEffect } from 'react'

const PageClient: React.FC = () => {
    /* Force the page to re-render when the slug segment changes, to get the latest update in Payload */
    const segment = useSelectedLayoutSegment()

    useEffect(() => {
        // Intentionally empty - just here to trigger re-render on segment change
    }, [segment])

    return <React.Fragment />
}

export default PageClient
