import { db } from '@/db';
import { eq } from 'drizzle-orm';
import React from 'react';
import { forms } from '@/db/schema';
import Form from '../Form';

type Props = {

}

const Page = async ({ params }: {
    params: {
        formId: string
    }
}) => {
    const { formId } = params;

    if ( !formId ) {
        return <div>Form not found</div>
    }

    const form = await db.query.forms.findFirst({
        where: eq(forms.id, parseInt(formId)),
        with: {
            questions: {
                with: {
                    fieldOptions: true
                }
            }
        }
    })

    if (!form) {
        return <div>Form not found</div>
      }

    return (
        <Form form={form} editMode={false}/>
    )
}

export default Page