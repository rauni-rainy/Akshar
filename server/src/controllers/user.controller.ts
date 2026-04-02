import { Response } from 'express';
import { AuthRequest } from '../middlewares/auth.middleware';
import { getUserProfile, updateUserProfile, followUser, unfollowUser, prisma } from '../services/user.service';

export const getMe = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const userId = req.user?.userId;
        if (!userId) {
            res.status(401).json({ error: "Unauthorized" });
            return;
        }

        const profile = await getUserProfile(userId);
        res.status(200).json(profile);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const getPublicUser = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const profile = await getUserProfile(id as string);
        
        let isFollowing = false;
        const activeUserId = req.user?.userId;
        if (activeUserId) {
            const followRecord = await prisma.follows.findUnique({
                where: { followerId_followingId: { followerId: activeUserId, followingId: id as string } }
            });
            isFollowing = !!followRecord;
        }

        res.status(200).json({ ...profile, isFollowing });
    } catch (error: any) {
        res.status(404).json({ error: "User not found" });
    }
};

export const updateMe = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const userId = req.user?.userId;
        if (!userId) {
            res.status(401).json({ error: "Unauthorized" });
            return;
        }

        const { bio, avatar } = req.body;
        
        if (bio && bio.length > 800) {
            res.status(400).json({ error: "Bio cannot exceed 800 characters" });
            return;
        }
        
        const updatedProfile = await updateUserProfile(userId, bio, avatar);
        res.status(200).json({ message: "Profile updated successfully", user: updatedProfile });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const followUserCtrl = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const userId = req.user?.userId;
        const targetId = req.params.id as string;
        if (!userId) {
            res.status(401).json({ error: "Unauthorized" });
            return;
        }
        await followUser(userId, targetId);
        res.status(200).json({ success: true });
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
};

export const unfollowUserCtrl = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const userId = req.user?.userId;
        const targetId = req.params.id as string;
        if (!userId) {
            res.status(401).json({ error: "Unauthorized" });
            return;
        }
        await unfollowUser(userId, targetId);
        res.status(200).json({ success: true });
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
};
