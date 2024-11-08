'use server';

import { revalidatePath } from "next/cache";
import { z } from 'zod';
import { saveForm } from "./mutateForm";


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

    const promptExplanation =
    "Based on the description, generate a survey object with 3 fields: name(string) for the form, description(string) of the form and a questions array where every element has 2 fields: text and the fieldType and fieldType can be of these options RadioGroup, Select, Input, Textarea, Switch; and return it in json format. For RadioGroup, and Select types also return fieldOptions array with text and value fields. For example, for RadioGroup, and Select types, the field options array can be [{text: 'Yes', value: 'yes'}, {text: 'No', value: 'no'}] and for Input, Textarea, and Switch types, the field options array can be empty. For example, for Input, Textarea, and Switch types, the field options array can be []";

    const data = parse.data;

    try {

        if (!process.env.GEMENI_API_KEY) {
            return {
                message: "Invalid OpenAI API Key"
            }
        }

        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${process.env.GEMENI_API_KEY}`,
            {
                headers: {
                    "Content-Type": "application/json",
                },
                method: "POST",
                body: JSON.stringify({
                    contents: [
                        {
                            parts: [{
                                text: `${promptExplanation} ${data.description}`
                            }]
                            
                        }
                    ]
                })
            })
            const json = await response.json();

            const cleanedText = json.candidates[0].content.parts[0].text.replace(/```json|```/g, '');
            const jsonResult = JSON.parse(cleanedText); 
            
            console.log("jsonResult",JSON.stringify(jsonResult));
            
            
            const savedId = await saveForm({
                name : jsonResult.name,
                description: jsonResult.description,
                questions: jsonResult.questions
            }); 
                        
            revalidatePath("/");

            return {
                message: "success" , data: {savedFormId : savedId}
            }
    }catch(e) {
        console.log(e);
        return {
            message: "Failed to create form"
        }
        
    }
} 