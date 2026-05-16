import { PrismaClient } from '../src/generated/prisma/client';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();

import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool as any);
const prisma = new PrismaClient({ adapter });

async function main() {
    console.log('Seeding dummy data...');

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash('password123', salt);

    // Create Dummy Users
    const user1 = await prisma.user.upsert({
        where: { email: 'golu@akshar.com' },
        update: {},
        create: {
            email: 'golu@akshar.com',
            password: passwordHash,
            realName: 'Gaurav Kumar',
            displayName: 'Golu',
            country: 'India',
            bio: 'Goodbye!!!!!...\n\nRead more',
        }
    });

    const user2 = await prisma.user.upsert({
        where: { email: 'natasha@akshar.com' },
        update: {},
        create: {
            email: 'natasha@akshar.com',
            password: passwordHash,
            realName: 'Natasha Naveed',
            displayName: 'Natasha Naveed',
            country: 'Saudi Arabia',
            bio: 'Writing stories from the desert.',
        }
    });

    // Create Dummy Posts
    const post1 = await prisma.post.create({
        data: {
            title: 'The Hero Within',
            content: 'INT. LIVING ROOM, WASHINGTON D.C. - DAY\nCHARLOTTE SWISSBERRY (30) quietly reads a nature magazine on the living room couch, immersed, legs outstretched. TOM (8), her son, storms into the room with ALEX (8), his friend, dashing after him...',
            type: 'STORY',
            published: true,
            authorId: user2.id,
            prompt: 'Rule of Law: Your Imagination',
            tags: ['Seeking Review', 'Saudi Arabia', 'Poetry', 'Playwriting']
        }
    });

    const post2 = await prisma.post.create({
        data: {
            title: 'Goodbye',
            content: 'Hey there,\nI am writing this piece to officially declare my departure. The journey has been beautiful...',
            type: 'POEM',
            published: true,
            authorId: user1.id,
            prompt: 'FREE WRITING',
            tags: ['Free Writing', 'India']
        }
    });

    // Add Likes
    await prisma.like.create({
        data: {
            userId: user1.id,
            postId: post2.id
        }
    });

    console.log('Database seeding completed successfully ✅');
    console.log(`Test Account 1: ${user1.email} / password123`);
    console.log(`Test Account 2: ${user2.email} / password123`);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
