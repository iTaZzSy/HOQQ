
import dotenv from 'dotenv';
import path from 'path';

// Load env vars
const envPath = path.join(__dirname, '../../.env');
console.log("Loading env from:", envPath);
dotenv.config({ path: envPath });

console.log("Environment check:");
console.log("TELEGRAM_BOT_TOKEN:", process.env.TELEGRAM_BOT_TOKEN ? "Set (ends with ... " + process.env.TELEGRAM_BOT_TOKEN.slice(-5) + ")" : "NOT SET");
console.log("TELEGRAM_CHAT_ID:", process.env.TELEGRAM_CHAT_ID || "NOT SET");

// Mock IReservation
const mockReservation: any = {
    _id: "test-id-123",
    name: "Test User",
    phone: "+905550000000",
    date: new Date(),
    time: "19:00",
    guests: 4
};

// We need to import the service AFTER env vars are loaded
import { sendReservationNotification } from '../services/notification.service';

console.log("Testing Telegram Notification...");
console.log("Reservation:", mockReservation);

sendReservationNotification(mockReservation)
    .then(() => console.log("Test finished (check console for success/error)"))
    .catch(err => console.error("Test script failed:", err));
