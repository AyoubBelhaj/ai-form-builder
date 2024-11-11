"use server";
import { db } from "@/db";
import { formSubmissions, answers as dbAnswers } from "@/db/schema";


export type Answer = {
    questionId: number;
    value?: string | null;
    fieldOptionsId?: number | null;
}

interface SubmitAnswersData {
    formId: number;
    answers: Answer[];
}

export async function submitAnswers(data: SubmitAnswersData) {
    const { formId, answers } = data;
    try {
        const newFormSubmissions = await db.insert(formSubmissions).values({
            formId
        }).returning({ insertedId: formSubmissions.id, });

        const [{ insertedId }] = newFormSubmissions;

        await db.transaction(async (tx) => {
            for (const answer of answers) {
                await tx
                    .insert(dbAnswers)
                    .values({
                        formSubmissionId: insertedId,
                        ...answer,
                    }).returning({ answerId: dbAnswers.id, });
            }
        });

        return insertedId;
    } catch (e) {
        console.error(e);
        return null;
    }
}
