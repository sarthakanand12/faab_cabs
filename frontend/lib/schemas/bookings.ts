import { z } from "zod";

// Base booking schema
const baseBookingSchema = z.object({
  phoneNumber: z.string().min(10, "Phone number must be at least 10 digits"),
  carType: z.string().min(1, "Car type is required"),
  pickupDate: z.string().min(1, "Pickup date is required"),
  pickupTime: z.string().min(1, "Pickup time is required"),
});

// Outstation booking schema
export const outstationBookingSchema = baseBookingSchema.extend({
  rentalType: z.literal("OUTSTATION"),
  tripType: z.enum(["ONE_WAY", "ROUND_TRIP"]),
  pickupCity: z.string().min(1, "Pickup city is required"),
  destinationCity: z.string().min(1, "Destination city is required"),
  dropDate: z.string().optional(),
});

// Local booking schema
export const localBookingSchema = baseBookingSchema.extend({
  rentalType: z.literal("LOCAL"),
  pickupCity: z.string().min(1, "Pickup city is required"),
  destinationCity: z.string().min(1, "Destination city is required"),
  packageType: z.string().min(1, "Package type is required"),
});

// Airport booking schema
export const airportBookingSchema = baseBookingSchema.extend({
  rentalType: z.literal("AIRPORT"),
  transferType: z.enum(["PICKUP_FROM_AIRPORT", "DROP_TO_AIRPORT"]),
  airportName: z.string().min(1, "Airport name is required"),
  city: z.string().min(1, "City is required"),
});

// Union schema for all booking types
export const createBookingSchema = z.discriminatedUnion("rentalType", [
  outstationBookingSchema,
  localBookingSchema,
  airportBookingSchema,
]);

export type CreateBookingInput = z.infer<typeof createBookingSchema>;
