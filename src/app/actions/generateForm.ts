'use server'

import { revalidatePath } from "next/cache"
import { z } from 'zod'

export async function generateForm(
    _prevState: {
        message: string
    },
    formData: FormData
) {
    const schema = z.object({
        description: z.string().min(1)
    })

    const parse = schema.safeParse({
        description: formData.get("description")
    })

    if (!parse.success) {
        return {
            message: "Invalid form Data"
        }
    }

    const data = parse.data;

    try {

        if (!process.env.OPENAI_API_KEY) {
            return {
                message: "Invalid OpenAI API Key"
            }
        }

        const response = await fetch(
            "https://api.openai.com/v1/chat/completions",
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization : `Bearer ${process.env.OPENAI_API_KEY}`
                },
                method: "POST",
                body: JSON.stringify({
                    model: "gpt-4o-turbo",
                    messages: [
                        {
                            role: "system",
                            content: data.description
                        }
                    ]
                })
            })
            const json = await response.json();
            revalidatePath("/");

            return {
                message: "success" , data: json
            }
    }catch(e) {
        console.log(e);
        return {
            message: "Failed to create form"
        }
        
    }
} 