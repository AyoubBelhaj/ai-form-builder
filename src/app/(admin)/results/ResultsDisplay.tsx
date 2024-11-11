import React from 'react';
import { Table } from './Table';
import { db } from '@/db';
import { eq } from 'drizzle-orm';
import { fieldOptions, forms, questions } from '@/db/schema';

type Props = {
    formId: number
}

const ResultsDisplay = async (props: Props) => {

    const userForm = await db.query.forms.findFirst({
        where: eq(forms.id, props.formId),
        with:
        {
            questions: {
                with: {
                    fieldOptions: true
                }
            },
            submissions: {
                with: {
                    answers: {
                        with:{
                            fieldOptions: true
                        }
                    }
                }
            },
        }
    });

    if (!userForm) return null;
    if (!userForm.submissions) return <p>No submissions on this form yet!</p>;
    return (
        <div><Table data={userForm.submissions} columns={userForm.questions}/></div>
    )
}

export default ResultsDisplay