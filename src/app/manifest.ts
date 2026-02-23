import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'Smatch Digital',
        short_name: 'Smatch',
        description:
            'SMATCH conçoit et déploie des solutions innovantes pour numériser et automatiser les processus métier des acteurs industriels, des prestataires logistiques et des institutions.',
        start_url: '/fr',
        display: 'standalone',
        background_color: '#050505',
        theme_color: '#FFAA00',
        icons: [
            {
                src: '/favicon.ico',
                sizes: '32x32',
                type: 'image/x-icon',
            },
            {
                src: '/favicon.svg',
                sizes: 'any',
                type: 'image/svg+xml',
            },
        ],
    }
}
