"use server";
import { db } from "@/db";
import { forms } from "@/db/schema";
import { eq } from "drizzle-orm";
import { auth } from "../api/auth/[...nextauth]/route";

export async function getUserForms() {
    const session = await auth();
    const userId = session?.user?.id;

    if(!userId) {
        return [];
    }

    const userForms = await db.query.forms.findMany({
        where: eq(forms.userId, userId)
    });

    return userForms;
}