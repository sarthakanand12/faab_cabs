"use server";

import { z } from "zod";
import prisma from "@/lib/prisma";
import { unauthenticatedAction } from "@/lib/safe-action";

const createWriteToUsSchema = z.object({
    customerName: z.string().min(1, "Name is required").max(120),
    contactNumber: z.string().min(7, "Contact number is required").max(20),
    emailId: z.string().email("Valid email is required").max(200),
    message: z.string().min(1, "Message is required").max(2000),
    source: z.string().max(100).optional(),
});

type InsertedWriteToUsRow = {
    id: number;
    createdAt: Date;
};

export const createWriteToUsAction = unauthenticatedAction
    .createServerAction()
    .input(createWriteToUsSchema)
    .handler(async ({ input }) => {
        const customerName = input.customerName.trim();
        const contactNumber = input.contactNumber.trim();
        const emailId = input.emailId.trim().toLowerCase();
        const message = input.message.trim();
        const source = input.source?.trim() || "website-contact-form";

        // Use SQL insert instead of prisma.writeToUsData.create to avoid failures
        // when a stale generated Prisma client is deployed.
        const rows = await prisma.$queryRaw<InsertedWriteToUsRow[]>`
      INSERT INTO "write_to_us_data" ("customerName", "contactNumber", "emailId", "message", "source")
      VALUES (${customerName}, ${contactNumber}, ${emailId}, ${message}, ${source})
      RETURNING "id", "createdAt"
    `;

        const row = rows[0];
        if (!row) {
            throw new Error("Failed to save your message");
        }

        return { success: true, id: row.id, createdAt: row.createdAt };
    });
