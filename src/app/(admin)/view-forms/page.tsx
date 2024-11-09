import React from 'react';
import FormsList from '@/app/forms/formsList';
import { getUserForms } from '@/app/actions/getUserForms';
import { InferSelectModel } from 'drizzle-orm';
import { forms as dbForms } from '@/db/schema';

type Props = {}

const page = async (props: Props) => {
    const forms : InferSelectModel<typeof dbForms>[] = await getUserForms();
    
    return (
        <>
            <div className='text-4xl font-bold px-4 m-5'>My forms</div>
            <FormsList forms={forms}/>
        </>
    )
}

export default page