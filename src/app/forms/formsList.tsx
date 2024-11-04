import { forms } from '@/db/schema';
import { InferSelectModel } from 'drizzle-orm';
import React from 'react'
import {
    Card,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import Link from 'next/link';
import { Button } from '@/components/ui/button';


type Form = InferSelectModel<typeof forms>;

type props = {
    forms: Form[]
}

const FormsList = (props: props) => {
    return (
        <div className='grid grid-cols1 md:grid-cols-3 m-5 p-5 gap-4'>{props.forms.map((form: Form) => (
            <Card key={form.id} className='max-w-[350px]'>
                <CardHeader>
                    <CardTitle>{form.name}</CardTitle>
                    <CardDescription>{form.description}</CardDescription>
                </CardHeader>
                <CardFooter>
                    <Link className='w-full' href={`/forms/edit/${form.id}`} >
                        <Button className='w-full'>View</Button>
                    </Link>
                </CardFooter>
            </Card>
        )
        )}</div>
    )
}

export default FormsList