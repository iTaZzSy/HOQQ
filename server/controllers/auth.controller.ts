import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user.model';

export const login = async (req: Request, res: Response) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).json({ message: "Geçersiz kullanıcı adı veya şifre" });
        }

        const isMatch = await bcrypt.compare(password, user.passwordHash);
        if (!isMatch) {
            return res.status(401).json({ message: "Geçersiz kullanıcı adı veya şifre" });
        }

        const secret = process.env.JWT_SECRET;
        if (!secret) {
            console.error("JWT_SECRET is not defined");
            return res.status(500).json({ message: "Sunucu hatası" });
        }

        const token = jwt.sign({ userId: user._id, username: user.username }, secret, { expiresIn: '2h' });

        return res.json({ token });

    } catch (error) {
        console.error("Login error details:", error);
        return res.status(500).json({ message: "Sunucu hatası" });
    }
};