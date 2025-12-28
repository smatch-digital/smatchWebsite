import React from 'react'
import { DefaultTemplate } from '@payloadcms/next/templates'
import { IconGallery } from './IconGallery'
import { AdminViewProps } from 'payload'

const IconGalleryView: React.FC<AdminViewProps> = (props) => {
    const { i18n, payload, user, params, searchParams, visibleEntities } = props

    return (
        <DefaultTemplate
            i18n={i18n}
            payload={payload}
            user={user}
            params={params}
            searchParams={searchParams}
            visibleEntities={visibleEntities || { collections: [], globals: [] }}
        >
            <IconGallery />
        </DefaultTemplate>
    )
}

export default IconGalleryView
