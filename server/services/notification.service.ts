
import axios from 'axios';
import { IReservation } from '../models/reservation.model';

export const sendReservationNotification = async (reservation: IReservation): Promise<void> => {
    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!botToken || !chatId) {
        console.warn("Telegram Bot Token or Chat ID not configured. Skipping notification.");
        return;
    }

    const messageBody = `
🌟 *Yeni Rezervasyon!* 🌟

👤 *İsim:* ${reservation.name}
📞 *Telefon:* ${reservation.phone}
📅 *Tarih:* ${new Date(reservation.date).toLocaleDateString('tr-TR')}
⏰ *Saat:* ${reservation.time}
👥 *Kişi Sayısı:* ${reservation.guests}
    `.trim();

    try {
        const url = `https://api.telegram.org/bot${botToken}/sendMessage`;
        console.log(`[Notification] Sending message to ${chatId} for ${reservation._id}`);
        await axios.post(url, {
            chat_id: chatId,
            text: messageBody,
            parse_mode: 'Markdown'
        });
        console.log(`[Notification] Success! Telegram notification sent for reservation: ${reservation._id}`);
    } catch (error: any) {
        console.error("[Notification] Error sending Telegram notification:");
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.error("Data:", error.response.data);
            console.error("Status:", error.response.status);
        } else if (error.request) {
            // The request was made but no response was received
            console.error("No response received:", error.request);
        } else {
            // Something happened in setting up the request that triggered an Error
            console.error("Error setting up request:", error.message);
        }
    }
};
