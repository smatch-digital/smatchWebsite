
import { getPayload } from '@/getPayload'
import configPromise from '@payload-config'
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const ASSETS_DIR = path.resolve(__dirname, '../../public/assets')

async function uploadMedia(payload: any, filePath: string, alt: string) {
    const absolutePath = path.join(ASSETS_DIR, filePath)
    if (!fs.existsSync(absolutePath)) {
        console.warn(`File not found: ${absolutePath}`)
        return null
    }

    const existing = await payload.find({
        collection: 'media',
        where: {
            alt: {
                equals: alt,
            },
        },
        limit: 1,
    })

    if (existing.docs.length > 0) {
        return existing.docs[0].id
    }

    console.log(`Uploading ${alt}...`)
    const file = await fs.readFileSync(absolutePath)
    const media = await payload.create({
        collection: 'media',
        data: {
            alt,
        },
        file: {
            data: file,
            name: path.basename(filePath),
            mimetype: 'image/' + (path.extname(filePath) === '.svg' ? 'svg+xml' : path.extname(filePath).substring(1)),
            size: file.length,
        },
    })
    return media.id
}

async function seedHome() {
    console.log('Starting Home Page Seeding...')
    const payload = await getPayload({ config: configPromise })

    // 1. Upload Assets
    const heroBgId = await uploadMedia(payload, 'hero/hero-background.jpg', 'Hero Background')

    const logo1Id = await uploadMedia(payload, 'logos/logo-1.svg', 'Partner 1')
    const logo2Id = await uploadMedia(payload, 'logos/logo-2.svg', 'Partner 2')
    const logo3Id = await uploadMedia(payload, 'logos/logo-3.svg', 'Partner 3')
    const logo4Id = await uploadMedia(payload, 'logos/logo-4.svg', 'Partner 4')
    const logo5Id = await uploadMedia(payload, 'logos/logo-5.svg', 'Partner 5')

    const domain1Id = await uploadMedia(payload, 'domains/supply-chain-iso.png', 'Supply Chain ISO')
    const domain2Id = await uploadMedia(payload, 'domains/industry-iso.png', 'Industry ISO')
    const domain3Id = await uploadMedia(payload, 'domains/solutions-iso.png', 'Solutions ISO')

    // 2. Construct Blocks

    // Hero
    const heroData = {
        type: 'smatch' as const,
        headline: 'ACCÉLÉREZ VOTRE TRANSFORMATION DIGITALE.',
        subheadline: 'Smatch accompagne les acteurs industriels pour repenser les systèmes industriels, logistiques et organisationnels.',
        enableCta: true,
        primaryCta: {
            type: 'custom' as const,
            label: 'CONTACTEZ-NOUS',
            url: '/contact',
            appearance: 'gold' as const,
        },
        secondaryCta: {
            type: 'custom' as const,
            label: 'DÉCOUVRIR LES OFFRES',
            url: '/solutions',
            appearance: 'outline-gold' as const,
        },
        media: heroBgId,
    }

    // Trusted By
    const trustedByBlock = {
        blockType: 'trustedBy' as const,
        title: 'TRUSTED BY',
        partners: [
            { name: 'Partner 1', logoType: 'image' as const, logo: logo1Id },
            { name: 'Partner 2', logoType: 'image' as const, logo: logo2Id },
            { name: 'Partner 3', logoType: 'image' as const, logo: logo3Id },
            { name: 'Partner 4', logoType: 'image' as const, logo: logo4Id },
            { name: 'Partner 5', logoType: 'image' as const, logo: logo5Id },
        ],
    }

    // Intro (AboutBlock)
    const introBlock = {
        blockType: 'about' as const,
        headingPart1: 'ÉDITEUR.',
        headingPart2: 'INTÉGRATEUR.',
        tag: '/// ORIGIN_STORY',
        description: "SMATCH Digital accélère la transformation numérique de ses partenaires à travers des solutions technologiques centrées sur l'humain, combinant expertise métier et innovations. En tant qu'intégrateur et éditeur, nous intervenons dans les secteurs industriel, logistique, agricole et touristique en apportant des solutions prêtes à la mise en œuvre. La traçabilité, l'IoT, l'automatisation, l'IA et la Data Intelligence sont autant de briques qui composent l'apanage de nos solutions. Notre approche favorise l'interopérabilité, la valorisation des données, et l'adoption des technologies intelligentes au service de la performance terrain.",
        cta: 'CASABLANCA, MA',
    }

    // Ecosystem
    const ecosystemBlock = {
        blockType: 'ecosystem' as const,
        headline: 'Notre Écosystème',
        description: 'Un écosystème complet de solutions et de technologies pour accompagner nos clients dans toutes les étapes de leur digitalisation',
        connectivityTitle: 'Connectivité Universelle',
        connectivityDesc: 'Intégration native avec +100 ERPs. SAP, Oracle, Sage et solutions propriétaires.',
        supportTitle: 'Support Ingénieur',
        supportDesc: 'Assistance technique dediée 24/7.',
        apiTitle: 'API First',
        apiDesc: 'Documentation complete et SDKs modernes pour développeurs.',
        optimizationTitle: "Optimization par l'IA",
        optimizationDesc: "Anticipez vos besoins et optimisez vos flux grâce à l'analyse prédictive.",
        controlTitle: 'Contrôle Total',
        controlDesc: 'Paramétrez vos flux logistiques via une interface intuitive sans code.',
    }

    // Domains
    const domainsBlock = {
        blockType: 'domains' as const,
        title: 'Architecture de Solutions',
        subtitle: "Une suite intégrée d'outils puissants conçus pour l'évolutivité, la sécurité et la performance opérationnelle.",
        tabs: [
            {
                tabLabel: 'Supply Chain & Logistique',
                moduleTag: 'MODULE: LOG_2.0 // FLOW OPTIMIZATION',
                subTitle: '1. AgriTech & Smart Assets',
                mainTitle: 'Gestion de Flux & Traçabilité',
                description: 'Déploiement de capteurs intelligents et systèmes de tri automatisés. Nos solutions connectent vos actifs physiques à vos données décisionnelles pour une maintenance prédictive.',
                hardware: 'Capteurs RFID / Beacons GPS / Handhelds',
                image: domain1Id,
            },
            {
                tabLabel: 'Industrie X.0 & IOT',
                moduleTag: 'MODULE: IND_X.0 // AUTOMATION LAYER',
                subTitle: '2. Smart Factory & Robotique',
                mainTitle: 'Usine Connectée & Robotique',
                description: 'Déploiement de capteurs intelligents et systèmes de tri automatisés. Nos solutions connectent vos actifs physiques (convoyeurs, machines) à vos données décisionnelles pour une maintenance prédictive.',
                hardware: 'Capteurs IoT / RFID Industriel',
                image: domain2Id,
            },
            {
                tabLabel: 'Solutions Metier',
                moduleTag: 'MODULE: CUSTOM_DEV // BUSINESS LOGIC',
                subTitle: '3. Solutions Spécifiques',
                mainTitle: 'Applications Verticales',
                description: "Développement de solutions verticales adaptées aux contraintes spécifiques de votre secteur d'activité, intégrant les processus métiers complexes.",
                hardware: 'Tablettes Durcies / Bornes Interactives',
                image: domain3Id,
            },
        ],
    }

    // Journal (ArchiveBlock)
    const journalBlock = {
        blockType: 'archive' as const,
        introContent: {
            root: {
                type: 'root',
                children: [
                    {
                        type: 'heading',
                        tag: 'h2',
                        version: 1,
                        children: [{ type: 'text', text: 'Journal', version: 1, detail: 0, format: 0, mode: 'normal', style: '' }],
                    },
                ],
                direction: 'ltr' as const,
                format: '' as const,
                indent: 0,
                version: 1,
            },
        },
        populateBy: 'collection' as const,
        relationTo: 'projects' as const,
        limit: 5,
    }

    // Why Choose (SmartGrid)
    const whyChooseBlock = {
        blockType: 'smart-grid' as const,
        columns: '3' as const,
        cards: [
            {
                id: '01',
                badge: '01 // EXP',
                title: 'Heritage Industriel',
                description: "Ne du terrain, optimise pour l'industrie.",
                iconType: 'name' as const,
                iconName: 'Factory',
            },
            {
                id: '02',
                badge: '02 // INNOV',
                title: "Forte Capacite d'innovation",
                description: 'IoT, IA et standards de demain.',
                iconType: 'name' as const,
                iconName: 'RocketLaunch',
            },
            {
                id: '03',
                badge: '03 // REL',
                title: 'Solutions Fiables & Evolutives',
                description: 'Architecture robuste pour operations 24/7.',
                iconType: 'name' as const,
                iconName: 'ShieldCheck',
            },
            {
                id: '04',
                badge: '04 // TEAM',
                title: 'Equipe Multicompetente',
                description: 'Ingenieurs et consultants dedies.',
                iconType: 'name' as const,
                iconName: 'UsersThree',
            },
            {
                id: '05',
                badge: '05 // INT',
                title: 'Integration Rapide',
                description: "Pret a l'usage, connectivite immediate.",
                iconType: 'name' as const,
                iconName: 'Plug',
            },
            {
                id: '06',
                badge: '06 // PERF',
                title: 'Approche Oriente Resultats',
                description: 'Performance et efficacite garanties.',
                iconType: 'name' as const,
                iconName: 'ChartLineUp',
            },
        ],
    }

    // CTA
    const ctaBlock = {
        blockType: 'cta' as const,
        headline: 'Pret a transformer votre organisation ?',
        subheadline: 'Découvrez nos solutions ou contactez notre équipe pour échanger sur vos besoins.',
        link: {
            type: 'custom' as const,
            label: 'VOIR PROJET',
            url: '/projects',
            appearance: 'gold' as const,
        },
    }

    // 3. Upsert Home Page
    console.log('Upserting Home Page...')
    const existingHome = await payload.find({
        collection: 'pages',
        where: {
            slug: {
                equals: 'home',
            },
        },
        limit: 1,
    })

    // Order of blocks as they appear in the visual design
    const layout = [
        trustedByBlock,
        introBlock,
        ecosystemBlock,
        domainsBlock,
        journalBlock,
        whyChooseBlock,
        ctaBlock
    ]

    if (existingHome.docs.length > 0) {
        await payload.update({
            collection: 'pages',
            id: existingHome.docs[0].id,
            data: {
                hero: heroData,
                layout: layout,
                _status: 'published',
            },
        })
        console.log('Home page updated.')
    } else {
        await payload.create({
            collection: 'pages',
            data: {
                title: 'Home',
                slug: 'home',
                hero: heroData,
                layout: layout,
                _status: 'published',
            },
        })
        console.log('Home page created.')
    }

    console.log('Seeding Complete!')
    process.exit(0)
}

seedHome().catch((err) => {
    console.error(err)
    process.exit(1)
})
