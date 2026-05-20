import dotenv from 'dotenv';
// Load env vars before ANY other imports
dotenv.config();
dotenv.config({ path: '.env.local' });

import mongoose from 'mongoose';
import app from './app';

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

if (process.env.TELEGRAM_BOT_TOKEN && process.env.TELEGRAM_CHAT_ID) {
    console.log("✅ Telegram Notification Enabled");
    console.log(`   - Chat ID: ${process.env.TELEGRAM_CHAT_ID}`);
} else {
    console.warn("⚠️ Telegram Notification NOT Configured");
}

if (!MONGO_URI) {
    console.error("Fatal Error: MONGO_URI is not defined in the environment variables.");
    process.exit(1);
}

const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('MongoDB connected successfully.');
    } catch (error) {
        console.error('Database connection error:', error);
        process.exit(1);
    }
};

const startServer = async () => {
    await connectDB();
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
};

startServer();