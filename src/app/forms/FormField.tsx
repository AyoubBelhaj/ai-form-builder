import React from 'react'

import {
    Select,
    SelectContent,
    SelectItem,
    SelectLabel,
    SelectTrigger,
} from "@/components/ui/select";

import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { FieldOptionsSelectModel, QuestionSelectModel } from '@/types/form-types';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { FormControl } from '@/components/ui/form';
import { Label } from '@/components/ui/label';

type Props = {
    element: QuestionSelectModel & {
        fieldOptions: Array<FieldOptionsSelectModel>
    }
}

const FormField = ({ element }: Props) => {

    if (!element) return null;

    const components = {
        Input: () => <Input type='text' />,
        Switch: () => <Switch />,
        Textarea: () => <Textarea />,
        Select: () => (
            <Select>
                <SelectTrigger>
                    <SelectLabel>Select an option</SelectLabel>
                </SelectTrigger>
                <SelectContent>
                    {element.fieldOptions.map((option, index) => (
                        <SelectItem key={`${option.text} ${option.value}`} value={`answerId_${option.id}`}>
                            {option.text}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        ),
        RadioGroup: () => (
            <RadioGroup>
                {element.fieldOptions.map((option, index) => (
                    <div key={`${option.text} ${option.value}`} className='flex items-center space-x-2'>
                        <FormControl>
                            <RadioGroupItem  value={`answerId_${option.id}`} id={option.value?.toString() || `answerId_${option.id}`}>
                                {option.text}
                            </RadioGroupItem>
                        </FormControl>
                        <Label className='text-base'>{option.text}</Label>
                    </div>
                ))}
            </RadioGroup>
        ),
    };


    return element.fieldType && components[element.fieldType] ? components[element.fieldType]() : null;

}

export default FormField