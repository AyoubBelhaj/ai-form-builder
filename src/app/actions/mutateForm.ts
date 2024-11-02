'use server'

import { db } from "@/db";
import { forms, questions as dbQuestions, fieldOptions } from '@/db/schema'

import { auth } from "@/auth";

export async function saveForm(data: any) {
    const { name, description, questions } = data;
    const session = await auth();
    const userId = session?.user?.id;

    const newForm = await db.insert(forms).values({
        name, description, userId, published: false
    }).returning({ insertedId: forms.id });

    const formId = newForm[0].insertedId;
}