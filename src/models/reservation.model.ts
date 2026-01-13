import mongoose, { Schema, Document } from 'mongoose';

// 1. تعريف واجهة البيانات (Interface) لـ TypeScript
export interface IReservation extends Document {
  guestName: string;
  phone: string;
  date: Date;        // تاريخ اليوم (مثلاً: 2023-10-25)
  time: string;      // الوقت (مثلاً: "19:00")
  guestCount: number;
  status: 'pending' | 'confirmed' | 'cancelled';
  createdAt: Date;
}

// 2. تصميم المخطط (Schema) لـ MongoDB
const ReservationSchema: Schema = new Schema({
  guestName: { type: String, required: true },
  phone: { type: String, required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true }, // نخزنه كنص لتسهيل المقارنة
  guestCount: { type: Number, required: true, min: 1, max: 10 },
  status: { 
    type: String, 
    enum: ['pending', 'confirmed', 'cancelled'], 
    default: 'pending' 
  }
}, {
  timestamps: true // يضيف created_at و updated_at تلقائياً
});

// 3. تصدير المودل
export default mongoose.model<IReservation>('Reservation', ReservationSchema);