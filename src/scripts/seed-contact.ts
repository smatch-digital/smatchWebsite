import 'dotenv/config'
import { getPayload } from '@/getPayload'
import configPromise from '@payload-config'

async function seedContact() {
    console.log('Starting Contact Page Seeding...')
    const payload = await getPayload({ config: configPromise })

    // 1. Create or find Contact Form
    console.log('Setting up Contact Form...')
    const existingForm = await payload.find({
        collection: 'forms',
        where: {
            title: {
                equals: 'Contact Form',
            },
        },
        limit: 1,
    })

    let formId: number | string

    if (existingForm.docs.length > 0) {
        formId = existingForm.docs[0].id
        console.log('Contact Form already exists.')
    } else {
        const newForm = await payload.create({
            collection: 'forms',
            data: {
                title: 'Contact Form',
                submitButtonLabel: 'Envoyer le Message',
                confirmationType: 'message',
                confirmationMessage: {
                    root: {
                        type: 'root',
                        children: [
                            {
                                type: 'paragraph',
                                version: 1,
                                children: [
                                    {
                                        type: 'text',
                                        text: 'Merci pour votre message ! Notre équipe vous répondra dans les plus brefs délais.',
                                        version: 1,
                                        detail: 0,
                                        format: 0,
                                        mode: 'normal',
                                        style: '',
                                    },
                                ],
                            },
                        ],
                        direction: 'ltr' as const,
                        format: '' as const,
                        indent: 0,
                        version: 1,
                    },
                },
                fields: [
                    {
                        blockType: 'text',
                        name: 'name',
                        label: 'Nom Complet',
                        width: 100,
                        required: true,
                    },
                    {
                        blockType: 'email',
                        name: 'email',
                        label: 'Email',
                        width: 50,
                        required: true,
                    },
                    {
                        blockType: 'text',
                        name: 'phone',
                        label: 'Téléphone',
                        width: 50,
                        required: false,
                    },
                    {
                        blockType: 'text',
                        name: 'company',
                        label: 'Entreprise',
                        width: 100,
                        required: false,
                    },
                    {
                        blockType: 'select',
                        name: 'subject',
                        label: 'Sujet',
                        width: 100,
                        required: true,
                        options: [
                            { label: 'Demande de démonstration', value: 'demo' },
                            { label: 'Information sur les solutions', value: 'info' },
                            { label: 'Partenariat', value: 'partnership' },
                            { label: 'Support technique', value: 'support' },
                            { label: 'Autre', value: 'other' },
                        ],
                    },
                    {
                        blockType: 'textarea',
                        name: 'message',
                        label: 'Votre Message',
                        width: 100,
                        required: true,
                    },
                ],
            },
        })
        formId = newForm.id
        console.log('Contact Form created.')
    }

    // 2. Create Contact Block
    const contactBlock = {
        blockType: 'contact' as const,
        headline: 'Contactez-nous',
        subheadline: 'Une question, un projet ? Notre équipe est à votre écoute pour vous accompagner dans votre transformation digitale.',
        form: formId,
        email: 'contact@smatch.ma',
        phone: '+212 5 22 XX XX XX',
        address: 'Casablanca, Maroc\nTechnopark, Bâtiment C',
        socialLinks: [
            { platform: 'LinkedIn', url: 'https://linkedin.com/company/smatch-digital' },
            { platform: 'Twitter', url: 'https://twitter.com/smatchdigital' },
        ],
        theme: 'dark' as const,
    }

    // 3. Hero for Contact Page
    const heroData = {
        type: 'lowImpact' as const,
        richText: {
            root: {
                type: 'root',
                children: [
                    {
                        type: 'heading',
                        tag: 'h1',
                        version: 1,
                        children: [{
                            type: 'text',
                            text: 'Contact',
                            version: 1,
                            detail: 0,
                            format: 0,
                            mode: 'normal',
                            style: '',
                        }],
                    },
                ],
                direction: 'ltr' as const,
                format: '' as const,
                indent: 0,
                version: 1,
            },
        },
    }

    // 4. Upsert Contact Page
    console.log('Upserting Contact Page...')
    const existingContact = await payload.find({
        collection: 'pages',
        where: {
            slug: {
                equals: 'contact',
            },
        },
        limit: 1,
    })

    const layout = [contactBlock]

    if (existingContact.docs.length > 0) {
        await payload.update({
            collection: 'pages',
            id: existingContact.docs[0].id,
            data: {
                hero: heroData,
                layout: layout,
                _status: 'published',
            },
        })
        console.log('Contact page updated.')
    } else {
        await payload.create({
            collection: 'pages',
            data: {
                title: 'Contact',
                slug: 'contact',
                hero: heroData,
                layout: layout,
                _status: 'published',
            },
        })
        console.log('Contact page created.')
    }

    console.log('Contact Seeding Complete!')
    process.exit(0)
}

seedContact().catch((err) => {
    console.error(err)
    process.exit(1)
})
