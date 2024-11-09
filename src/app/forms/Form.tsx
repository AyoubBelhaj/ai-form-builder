'use client';
import React, { useState } from 'react';
import { FormSelectModel, QuestionSelectModel, FieldOptionsSelectModel } from '@/types/form-types';
import { Form as FormComponent, FormField as ShadcnFormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import FormField from './FormField';
import { publishForm } from '../actions/mutateForm';
import FormPublishSuccess from './FormPublishSuccess';

type Props = {
    form: Form,
    editMode: boolean
}

interface Form extends FormSelectModel {
    questions: Array<QuestionSelectModel & {
        fieldOptions: Array<FieldOptionsSelectModel>
    }>
}

const Form = (props: Props) => {

    const [successDialogOpen, setSucessDialogOpen] = useState(false) ;

    const form = useForm();

    const { editMode } = props;

    const handleDialogChange = (open: boolean) => {
        setSucessDialogOpen(open);
    }

    const onSubmit = async (data: any) => {
        if (editMode) {
            await publishForm(props.form.id);
            setSucessDialogOpen(true);
        }
    }

    return (
        <div className='text-center'>
            <h1 className='text-lg font-bold py-3'>{props.form.name}</h1>
            <h3 className='text-md'>{props.form.description}</h3>
            <FormComponent {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className='grid w-full max-w-3xl items-center gap-6 text-left'>
                    {props.form.questions.map((question, index) => {
                        return (
                            <FormItem key={question.id}>
                                <ShadcnFormField control={form.control}
                                    name={`question_${question.id}`}
                                    key={`${question.text}_${index}`}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className='text-base mt-3'>
                                                {index + 1}.{" "}{question.text}
                                            </FormLabel>
                                            <FormControl>
                                                <FormField element={question} key={index} value={field.value} onChange={field.onChange} />
                                            </FormControl>
                                        </FormItem>
                                    )} />
                            </FormItem>
                        )
                    })}
                    <Button type='submit'>{editMode ? "Publish" : "Submit"}</Button>
                </form>
            </FormComponent>
            <FormPublishSuccess formId={props.form.id} open={successDialogOpen} onOpenChange={handleDialogChange}/>
        </div>
    )
}

export default Form