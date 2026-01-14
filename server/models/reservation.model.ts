import mongoose, { Schema, Document } from 'mongoose';

export interface IReservation extends Document {
  name: string;
  phone: string;
  date: Date;
  time: string;
  guests: number;
  status: 'pending' | 'confirmed' | 'cancelled';
}

const ReservationSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    date: { type: Date, required: true },
    time: { type: String, required: true },
    guests: { type: Number, required: true },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'cancelled'],
      default: 'pending',
    },
  },
  {
    timestamps: true 
  }
);

export default mongoose.model<IReservation>('Reservation', ReservationSchema);