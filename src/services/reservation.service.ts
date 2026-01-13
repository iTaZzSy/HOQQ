import { z } from 'zod';
import Reservation, { IReservation } from '../models/reservation.model';

// Zod schema for validation - can be kept here or in a separate validation file
export const reservationValidationSchema = z.object({
  guestName: z.string().min(1, { message: "Guest name is required" }),
  phone: z.string().min(1, { message: "Phone number is required" }),
  date: z.coerce.date().refine((val) => val > new Date(), {
    message: "Date must be a valid future date",
  }),
  time: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, { message: "Invalid time format (HH:MM)" }),
  guestCount: z.coerce.number().int().min(1).max(10, { message: "Guest count must be between 1 and 10" }),
});

export type ReservationInput = z.infer<typeof reservationValidationSchema>;

export const createReservation = async (input: ReservationInput): Promise<IReservation> => {
  const { date, time } = input;

  // 1. Check for conflicting reservations
  const startOfDay = new Date(date);
  startOfDay.setUTCHours(0, 0, 0, 0);

  const endOfDay = new Date(date);
  endOfDay.setUTCHours(23, 59, 59, 999);

  const existingReservation = await Reservation.findOne({
    date: {
      $gte: startOfDay,
      $lt: endOfDay
    },
    time: time
  });

  if (existingReservation) {
    // Using a custom error object or class is better for specific error handling
    throw new Error("Time slot unavailable");
  }

  // 2. Save the new reservation
  const newReservation = new Reservation(input);
  await newReservation.save();
  return newReservation;
};

export const updateReservationSchema = reservationValidationSchema.partial();
export type UpdateReservationInput = z.infer<typeof updateReservationSchema>;

export const getReservations = async (): Promise<IReservation[]> => {
  return Reservation.find().sort({ date: -1 });
};

export const updateReservation = async (id: string, payload: UpdateReservationInput): Promise<IReservation | null> => {
    return Reservation.findByIdAndUpdate(id, payload, { new: true });
};

export const deleteReservation = async (id: string): Promise<IReservation | null> => {
    return Reservation.findByIdAndDelete(id);
};
