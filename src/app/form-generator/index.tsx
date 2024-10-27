'use client'
import React, { useEffect, useState } from 'react'

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,

} from "@/components/ui/dialog"

import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { useFormState, useFormStatus } from 'react-dom'
import { generateForm } from '../actions/generateForm'


type Props = {}

const intialState: {
    message: string,
    data?: any
} = {
    message: ""
}

export function SubmitButton() {
    const { pending } = useFormStatus()
    return (
        <Button type='submit' disabled={pending}>
            {pending ? "Generating..." : "Generate"}
        </Button>
    );
}

const FormGenerator = (props: Props) => {
    const [open, setOpen] = useState(false);
    const [state, formAction] = useFormState(generateForm, intialState)

    const onFormCreate = () => {
        setOpen(true);
    }

    useEffect(() => {
        if (state.message === "success") {
            setOpen(false)
        }
        console.log(state.message);

        console.log(state.data);

    }, [state.message])


    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <Button onClick={onFormCreate}>Create your Form</Button>
            <DialogContent className='sm:mx-w-[425px]'>
                <DialogHeader>
                    <DialogTitle>Create your own Form</DialogTitle>
                </DialogHeader>
                <form action={formAction}>
                    <div className="grid gap-4 py-4">
                        <Textarea id='description' name='description' required placeholder='Share what your form is about, who is it for, and what information you would like to collect. And AI will do the magic ' />
                    </div>

                    <DialogFooter>
                        <SubmitButton />
                        <Button variant='link'>create manually</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default FormGenerator