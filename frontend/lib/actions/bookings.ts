"use server";

import prisma from "@/lib/prisma";
import { unauthenticatedAction } from "@/lib/safe-action";
import { createBookingSchema } from "@/lib/schemas/bookings";

// Helper to generate booking ID
function generateBookingId(): string {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 5).toUpperCase();
  return `FAAB${timestamp}${random}`;
}

export const createBookingAction = unauthenticatedAction
  .createServerAction()
  .input(createBookingSchema)
  .handler(async ({ input }) => {
    const bookingId = generateBookingId();
    
    try {
      // Parse date and time
      const pickupDateTime = new Date(`${input.pickupDate}T${input.pickupTime}`);
      
      if (isNaN(pickupDateTime.getTime())) {
        throw new Error("Invalid pickup date or time");
      }

      // Create base booking
      const booking = await prisma.booking.create({
        data: {
          bookingId,
          rentalType: input.rentalType,
          phoneNumber: input.phoneNumber,
          carType: input.carType,
          pickupDate: pickupDateTime,
          pickupTime: input.pickupTime,
          status: "PENDING",
        },
      });

      // Create specific booking details based on rental type
      switch (input.rentalType) {
        case "OUTSTATION": {
          let dropDateTime: Date | undefined;
          if (input.dropDate) {
            dropDateTime = new Date(input.dropDate);
            if (isNaN(dropDateTime.getTime())) {
              throw new Error("Invalid return date");
            }
          }

          await prisma.outstationBooking.create({
            data: {
              bookingId: booking.id,
              tripType: input.tripType,
              pickupCity: input.pickupCity,
              destinationCity: input.destinationCity,
              dropDate: dropDateTime,
            },
          });
          break;
        }

        case "LOCAL": {
          await prisma.localBooking.create({
            data: {
              bookingId: booking.id,
              pickupCity: input.pickupCity,
              destinationCity: input.destinationCity,
              packageType: input.packageType,
            },
          });
          break;
        }

        case "AIRPORT": {
          await prisma.airportBooking.create({
            data: {
              bookingId: booking.id,
              transferType: input.transferType,
              airportName: input.airportName,
              city: input.city,
            },
          });
          break;
        }
      }

      return {
        success: true,
        bookingId: booking.bookingId,
        id: booking.id,
      };
    } catch (error) {
      console.error("Error creating booking:", error);
      
      if (error instanceof Error) {
        throw new Error(`Failed to create booking: ${error.message}`);
      }
      
      throw new Error("Failed to create booking");
    }
  });
