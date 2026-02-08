"use server";

import { z } from "zod";
import prisma from "@/lib/prisma";
import { unauthenticatedAction } from "@/lib/safe-action";

const getBookingByIdSchema = z.object({
  bookingId: z.string(),
});

export interface BookingDetails {
  id: string;
  bookingId: string;
  rentalType: string;
  status: string;
  phoneNumber: string;
  carType: string;
  pickupDate: Date;
  pickupTime: string;
  createdAt: Date;
  outstationDetails?: {
    tripType: string;
    pickupCity: string;
    destinationCity: string;
    dropDate: Date | null;
  } | null;
  localDetails?: {
    pickupCity: string;
    destinationCity: string;
    packageType: string;
  } | null;
  airportDetails?: {
    transferType: string;
    airportName: string;
    city: string;
  } | null;
}

export const getBookingByIdAction = unauthenticatedAction
  .createServerAction()
  .input(getBookingByIdSchema)
  .handler(async ({ input }) => {
    const booking = await prisma.booking.findUnique({
      where: { bookingId: input.bookingId },
      include: {
        outstationDetails: true,
        localDetails: true,
        airportDetails: true,
      },
    });

    if (!booking) {
      throw new Error("Booking not found");
    }

    return { booking: booking as BookingDetails };
  });