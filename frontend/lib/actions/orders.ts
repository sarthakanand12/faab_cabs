"use server";

import { z } from "zod";
import prisma from "@/lib/prisma";
import { authenticatedAction } from "@/lib/safe-action";
import { RentalType, BookingStatus, Prisma } from "@/lib/generated/prisma/client";

const getOrdersSchema = z.object({
  phoneNumber: z.string().optional(),
  pickupDateFrom: z.string().optional(),
  pickupDateTo: z.string().optional(),
  city: z.string().optional(),
  rentalType: z.enum(["OUTSTATION", "LOCAL", "AIRPORT"]).optional(),
  status: z.enum(["PENDING", "CONFIRMED", "COMPLETED", "CANCELLED"]).optional(),
  bookingId: z.string().optional(),
  page: z.number().default(1),
  limit: z.number().default(20),
});

export type OrderFilters = z.infer<typeof getOrdersSchema>;

export interface OrderWithDetails {
  id: string;
  bookingId: string;
  rentalType: RentalType;
  status: BookingStatus;
  phoneNumber: string;
  carType: string;
  pickupDate: Date;
  pickupTime: string;
  createdAt: Date;
  updatedAt: Date;
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

export interface OrdersResponse {
  orders: OrderWithDetails[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export const getOrdersAction = authenticatedAction
  .createServerAction()
  .input(getOrdersSchema)
  .handler(async ({ input, ctx }): Promise<OrdersResponse> => {
    const { session } = ctx;
    
    if (session.access === "READ" && input.status) {
      // READ only admins can view but not filter by status for modification
    }

    const where: Prisma.BookingWhereInput = {};

    if (input.phoneNumber) {
      where.phoneNumber = {
        contains: input.phoneNumber,
        mode: "insensitive",
      };
    }

    if (input.bookingId) {
      where.bookingId = {
        contains: input.bookingId,
        mode: "insensitive",
      };
    }

    if (input.rentalType) {
      where.rentalType = input.rentalType as RentalType;
    }

    if (input.status) {
      where.status = input.status as BookingStatus;
    }

    if (input.pickupDateFrom || input.pickupDateTo) {
      where.pickupDate = {};
      if (input.pickupDateFrom) {
        where.pickupDate.gte = new Date(input.pickupDateFrom);
      }
      if (input.pickupDateTo) {
        where.pickupDate.lte = new Date(input.pickupDateTo);
      }
    }

    // Handle city filtering across all booking types
    if (input.city) {
      where.OR = [
        {
          outstationDetails: {
            pickupCity: {
              contains: input.city,
              mode: "insensitive",
            },
          },
        },
        {
          outstationDetails: {
            destinationCity: {
              contains: input.city,
              mode: "insensitive",
            },
          },
        },
        {
          localDetails: {
            pickupCity: {
              contains: input.city,
              mode: "insensitive",
            },
          },
        },
        {
          localDetails: {
            destinationCity: {
              contains: input.city,
              mode: "insensitive",
            },
          },
        },
        {
          airportDetails: {
            city: {
              contains: input.city,
              mode: "insensitive",
            },
          },
        },
      ];
    }

    const skip = (input.page - 1) * input.limit;

    const [orders, total] = await Promise.all([
      prisma.booking.findMany({
        where,
        include: {
          outstationDetails: true,
          localDetails: true,
          airportDetails: true,
        },
        orderBy: {
          createdAt: "desc",
        },
        skip,
        take: input.limit,
      }),
      prisma.booking.count({ where }),
    ]);

    return {
      orders: orders as OrderWithDetails[],
      total,
      page: input.page,
      limit: input.limit,
      totalPages: Math.ceil(total / input.limit),
    };
  });

export const updateOrderStatusAction = authenticatedAction
  .createServerAction()
  .input(
    z.object({
      orderId: z.string(),
      status: z.enum(["PENDING", "CONFIRMED", "COMPLETED", "CANCELLED"]),
    })
  )
  .handler(async ({ input, ctx }) => {
    const { session } = ctx;

    if (session.access !== "WRITE") {
      throw new Error("Unauthorized: Write access required");
    }

    const updated = await prisma.booking.update({
      where: { id: input.orderId },
      data: { status: input.status as BookingStatus },
    });

    return { success: true, order: updated };
  });