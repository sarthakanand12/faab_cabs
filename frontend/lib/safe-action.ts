import { createServerActionProcedure } from "zsa";
import { getAdminSession, AdminSession } from "./auth";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function shapeErrors({ err }: any) {
    const isDev = process.env.NODE_ENV === "development";
    if (isDev) {
        console.error(err);
        return {
            code: err.code ?? "Error",
            message: `${isDev ? "DEV ONLY - " : ""}${err.message}`,
        }
    } else {
        return {
            code: "Error",
            message: "Something went wrong!",
        }
    }
}

export const unauthenticatedAction = createServerActionProcedure()
    .experimental_shapeError(shapeErrors)
    .handler(async () => {
    });

export const authenticatedAction = createServerActionProcedure()
    .experimental_shapeError(shapeErrors)
    .handler(async (): Promise<{ session: AdminSession }> => {
        const session = await getAdminSession();
        if (!session) {
            throw new Error("Unauthorized");
        }
        return { session };
    });

export type { AdminSession };
