-- CreateTable
CREATE TABLE "write_to_us_data" (
    "id" SERIAL NOT NULL,
    "customerName" TEXT NOT NULL,
    "contactNumber" TEXT NOT NULL,
    "emailId" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "source" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "write_to_us_data_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "write_to_us_data_createdAt_idx" ON "write_to_us_data"("createdAt");
