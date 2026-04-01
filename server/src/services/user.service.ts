import { PrismaClient } from '../generated/prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool as any);
export const prisma = new PrismaClient({ adapter });

export const getUserProfile = async (userId: string) => {
    const user = await prisma.user.findUnique({
        where: { id: userId },
        include: {
            posts: {
                orderBy: { createdAt: 'desc' },
                include: { _count: { select: { likes: true } } }
            },
            _count: {
                select: { followers: true, following: true }
            },
            followers: { select: { followerId: true } },
            following: { select: { followingId: true } },
            reviews: true,
            comments: true,
            views: {
                include: {
                    post: {
                        include: {
                            author: { select: { country: true } }
                        }
                    }
                }
            }
        }
    });
    if (!user) throw new Error("User not found");
    
    // Calculate Stats
    const written = user.posts.length;
    const reviewed = user.reviews.length;
    const commentsCount = user.comments.length;
    const read = user.views.length;

    const countriesSet = new Set(user.views.map(v => v.post.author.country).filter(Boolean));
    const uniqueCountries = countriesSet.size;

    const tagsSet = new Set(user.views.flatMap(v => v.post.tags || []));
    const uniqueTags = tagsSet.size;

    // Clearance Level compute
    const totalXp = (written * 50) + (reviewed * 20) + (commentsCount * 10) + (read * 5);
    const clearanceLevel = Math.floor(totalXp / 100) + 1;

    // Espionage Badges
    const badges = {
        signalCaster: written >= 15 ? 3 : written >= 5 ? 2 : written >= 1 ? 1 : 0,
        dataSiphon: read >= 200 ? 3 : read >= 50 ? 2 : read >= 10 ? 1 : 0,
        networkInfiltrator: uniqueCountries >= 25 ? 3 : uniqueCountries >= 10 ? 2 : uniqueCountries >= 3 ? 1 : 0,
        chiefInterrogator: reviewed >= 50 ? 3 : reviewed >= 10 ? 2 : reviewed >= 1 ? 1 : 0,
        multiThreat: uniqueTags >= 20 ? 3 : uniqueTags >= 10 ? 2 : uniqueTags >= 3 ? 1 : 0
    };

    const stats = {
        written,
        reviewed,
        read,
        countries: uniqueCountries,
        level: clearanceLevel,
        badges,
        followers: user._count.followers,
        following: user._count.following,
        totalLikesReceived: user.posts.reduce((sum, p) => sum + p._count.likes, 0)
    };

    const { password, views, reviews, comments, followers, following, ...userWithoutPassword } = user;
    return { 
        ...userWithoutPassword, 
        stats,
        followerIds: followers.map(f => f.followerId),
        followingIds: following.map(f => f.followingId)
    };
};

export const updateUserProfile = async (userId: string, bio?: string, avatarBase64?: string) => {
    const updatedUser = await prisma.user.update({
        where: { id: userId },
        data: {
            bio: bio !== undefined ? bio : undefined,
            avatar: avatarBase64 !== undefined ? avatarBase64 : undefined
        }
    });

    const { password, ...userWithoutPassword } = updatedUser;
    return userWithoutPassword;
};

export const followUser = async (followerId: string, followingId: string) => {
    if (followerId === followingId) throw new Error("Cannot follow yourself");
    
    // Check if already following
    const existing = await prisma.follows.findUnique({
        where: { followerId_followingId: { followerId, followingId } }
    });
    if (existing) return;

    await prisma.follows.create({
        data: { followerId, followingId }
    });

    // Notify the user being followed
    await prisma.notification.create({
        data: {
            userId: followingId,
            type: "FOLLOW",
            message: "A new operative is now monitoring your transmissions.",
            link: `/user/${followerId}`
        }
    });

    return { success: true };
};

export const unfollowUser = async (followerId: string, followingId: string) => {
    if (followerId === followingId) throw new Error("Cannot unfollow yourself");

    await prisma.follows.delete({
        where: { followerId_followingId: { followerId, followingId } }
    }).catch(() => {}); // Ignore if not existing
    return { success: true };
};
