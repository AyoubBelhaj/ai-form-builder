import { db } from '@/db';
import { eq } from 'drizzle-orm';
import React from 'react';
import { forms } from '@/db/schema';
import { auth } from '@/auth';
import Form from '../../Form';

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

    const session = await auth();
    const userId = session?.user?.id;
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

    if ( userId !== form?.userId ) {
        return <div>Not Authorized</div>
    }

    if (!form) {
        return <div>Form not found</div>
      }

    return (
        <Form form={form}/>
    )
}

export default Page