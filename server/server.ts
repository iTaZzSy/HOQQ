import mongoose from 'mongoose';
import dotenv from 'dotenv';
import app from './app';

dotenv.config();
dotenv.config({ path: '.env.local' });

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

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