import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    // Create initial Council Members
    const members = [
        {
            name: 'Eldric the Wise',
            role: 'Grand Vizier',
            title: 'Keeper of Ancient Knowledge',
            description: 'An ancient AI entity that holds the history of the kingdom.',
            stats: JSON.stringify({ wisdom: 10, strength: 2, magic: 8 }),
            status: 'active'
        },
        {
            name: 'Lyra the Swift',
            role: 'Scout Commander',
            title: 'Eye of the Storm',
            description: 'Specializes in rapid data gathering and reconnaissance.',
            stats: JSON.stringify({ wisdom: 5, strength: 7, magic: 4 }),
            status: 'active'
        }
    ];

    for (const member of members) {
        await prisma.councilMember.create({
            data: member
        });
    }

    console.log('Seed data inserted');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
