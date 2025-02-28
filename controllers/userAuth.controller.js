import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../models/userSchema.js';
import { z } from 'zod';
import dotenv from 'dotenv';
dotenv.config();

const userValidation = z.object({
    name: z.string().min(3).max(30),
    email: z.string().email(),
    password: z.string().min(6).max(30),
    confirmPassword: z.string().min(6).max(30),
}).refine(data => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
});

export const signIn = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRY });

        res.status(200).json({
            success: true,
            message: 'User signed in successfully',
            role:"User",
            data: {
              token,
              user,
            }
          });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export const signUp = async (req, res) => {
    const validation = userValidation.safeParse(req.body);
    if (!validation.success) {
        return res.status(400).json({ message: validation.error.errors[0].message });
    }

    try {
        const { name, email, password } = req.body;

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await User.create({ name, email, password: hashedPassword });

        const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRY });

        res.status(201).json({
            success: true,
            message: 'User created successfully',
            data: {
                token,
                user: newUser,
            }
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export const signOut = async (req, res) => {
    res.status(200).json({ message: "User logged out successfully" });
};
