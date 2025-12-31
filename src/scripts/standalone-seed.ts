import 'dotenv/config'
import { seedHome } from '@/utilities/seedHome'

const runSeed = async () => {
    try {
        await seedHome()
        process.exit(0)
    } catch (error) {
        console.error('Error seeding home page:', error)
        process.exit(1)
    }
}

runSeed()
