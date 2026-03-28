import { Response } from 'express';
import { AuthRequest } from '../middlewares/auth.middleware';
import { getUserProfile, updateUserProfile } from '../services/user.service';

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

export const updateMe = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const userId = req.user?.userId;
        if (!userId) {
            res.status(401).json({ error: "Unauthorized" });
            return;
        }

        const { bio, avatar } = req.body;
        
        const updatedProfile = await updateUserProfile(userId, bio, avatar);
        res.status(200).json({ message: "Profile updated successfully", user: updatedProfile });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};
