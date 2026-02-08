"use server";

import bcrypt from "bcryptjs";
import { z } from "zod";
import prisma from "@/lib/prisma";
import { unauthenticatedAction } from "@/lib/safe-action";
import {
  createToken,
  setAuthCookie,
  clearAuthCookie,
  type AdminSession
} from "@/lib/auth";

const loginSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

export const loginAction = unauthenticatedAction
  .createServerAction()
  .input(loginSchema)
  .handler(async ({ input }) => {
    const admin = await prisma.admin.findUnique({
      where: { username: input.username },
    });

    if (!admin) {
      throw new Error("Invalid credentials");
    }

    const isValidPassword = await bcrypt.compare(input.password, admin.password);

    if (!isValidPassword) {
      throw new Error("Invalid credentials");
    }

    const session: AdminSession = {
      id: admin.id,
      username: admin.username,
      access: admin.access,
    };

    const token = await createToken(session);
    await setAuthCookie(token);

    return { success: true, admin: session };
  });

export const logoutAction = unauthenticatedAction
  .createServerAction()
  .handler(async () => {
    await clearAuthCookie();
    return { success: true };
  });
