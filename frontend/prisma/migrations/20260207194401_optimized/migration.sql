-- CreateEnum
CREATE TYPE "RentalType" AS ENUM ('OUTSTATION', 'LOCAL', 'AIRPORT');

-- CreateEnum
CREATE TYPE "OutstationTripType" AS ENUM ('ONE_WAY', 'ROUND_TRIP');

-- CreateEnum
CREATE TYPE "AirportTransferType" AS ENUM ('PICKUP_FROM_AIRPORT', 'DROP_TO_AIRPORT');

-- CreateEnum
CREATE TYPE "BookingStatus" AS ENUM ('PENDING', 'CONFIRMED', 'COMPLETED', 'CANCELLED');

-- CreateTable
CREATE TABLE "Booking" (
    "id" TEXT NOT NULL,
    "bookingId" TEXT NOT NULL,
    "rentalType" "RentalType" NOT NULL,
    "status" "BookingStatus" NOT NULL DEFAULT 'PENDING',
    "phoneNumber" TEXT NOT NULL,
    "carType" TEXT NOT NULL,
    "pickupDate" TIMESTAMP(3) NOT NULL,
    "pickupTime" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Booking_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OutstationBooking" (
    "id" TEXT NOT NULL,
    "bookingId" TEXT NOT NULL,
    "tripType" "OutstationTripType" NOT NULL,
    "pickupCity" TEXT NOT NULL,
    "destinationCity" TEXT NOT NULL,
    "dropDate" TIMESTAMP(3),

    CONSTRAINT "OutstationBooking_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LocalBooking" (
    "id" TEXT NOT NULL,
    "bookingId" TEXT NOT NULL,
    "pickupCity" TEXT NOT NULL,
    "destinationCity" TEXT NOT NULL,
    "packageType" TEXT NOT NULL,

    CONSTRAINT "LocalBooking_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AirportBooking" (
    "id" TEXT NOT NULL,
    "bookingId" TEXT NOT NULL,
    "transferType" "AirportTransferType" NOT NULL,
    "airportName" TEXT NOT NULL,
    "city" TEXT NOT NULL,

    CONSTRAINT "AirportBooking_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Booking_bookingId_key" ON "Booking"("bookingId");

-- CreateIndex
CREATE INDEX "Booking_rentalType_idx" ON "Booking"("rentalType");

-- CreateIndex
CREATE INDEX "Booking_phoneNumber_idx" ON "Booking"("phoneNumber");

-- CreateIndex
CREATE INDEX "Booking_status_idx" ON "Booking"("status");

-- CreateIndex
CREATE INDEX "Booking_pickupDate_idx" ON "Booking"("pickupDate");

-- CreateIndex
CREATE INDEX "Booking_createdAt_idx" ON "Booking"("createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "OutstationBooking_bookingId_key" ON "OutstationBooking"("bookingId");

-- CreateIndex
CREATE UNIQUE INDEX "LocalBooking_bookingId_key" ON "LocalBooking"("bookingId");

-- CreateIndex
CREATE UNIQUE INDEX "AirportBooking_bookingId_key" ON "AirportBooking"("bookingId");

-- AddForeignKey
ALTER TABLE "OutstationBooking" ADD CONSTRAINT "OutstationBooking_bookingId_fkey" FOREIGN KEY ("bookingId") REFERENCES "Booking"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LocalBooking" ADD CONSTRAINT "LocalBooking_bookingId_fkey" FOREIGN KEY ("bookingId") REFERENCES "Booking"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AirportBooking" ADD CONSTRAINT "AirportBooking_bookingId_fkey" FOREIGN KEY ("bookingId") REFERENCES "Booking"("id") ON DELETE CASCADE ON UPDATE CASCADE;
