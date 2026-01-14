import { z } from 'zod';
import Reservation, { IReservation } from '../models/reservation.model';

export const reservationValidationSchema = z.object({
  guestName: z.string().min(1, { message: "İsim gereklidir" }),
  phone: z.string().min(1, { message: "Telefon numarası gereklidir" }),
  date: z.coerce.date().refine((val) => val > new Date(), {
    message: "Tarih geçerli bir gelecek tarih olmalıdır",
  }),
  time: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, { message: "Geçersiz saat formatı (SS:DD)" }),
  guestCount: z.coerce.number().int().min(1).max(10, { message: "Kişi sayısı 1 ile 10 arasında olmalıdır" }),
});

export type ReservationInput = z.infer<typeof reservationValidationSchema>;

export const createReservation = async (input: ReservationInput): Promise<IReservation> => {
  const { date, time } = input;

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
    throw new Error("Seçilen zaman dilimi müsait değil");
  }

  const newReservation = new Reservation({
    name: input.guestName,
    phone: input.phone,
    date: input.date,
    time: input.time,
    guests: input.guestCount
  });
  await newReservation.save();
  return newReservation;
};

export const updateReservationSchema = reservationValidationSchema.partial();
export type UpdateReservationInput = z.infer<typeof updateReservationSchema>;

export const getReservations = async (): Promise<any[]> => {
  const reservations = await Reservation.find().sort({ date: -1 }).lean();
  return reservations.map((res: any) => ({
    ...res,
    name: res.name || res.guestName,
    guests: res.guests || res.guestCount
  }));
};

export const updateReservation = async (id: string, payload: UpdateReservationInput): Promise<IReservation | null> => {
    return Reservation.findByIdAndUpdate(id, payload, { new: true });
};

export const deleteReservation = async (id: string): Promise<IReservation | null> => {
    return Reservation.findByIdAndDelete(id);
};