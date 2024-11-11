"use client"
import * as React from 'react'
import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    RowSelection,
    useReactTable,
} from '@tanstack/react-table'
import { InferSelectModel } from 'drizzle-orm'
import { answers, fieldOptions, forms, formSubmissions, questions } from '@/db/schema'


type FieldOption = InferSelectModel<typeof fieldOptions>

type Answer = InferSelectModel<typeof answers> & {
    fieldOpion?: FieldOption | null
}
type Question = InferSelectModel<typeof questions> & {
    fieldOptions: FieldOption[]
}

export type Form = InferSelectModel<typeof forms> & {
    questions: Question[]
    submissions: FormSubmission[]
} | undefined

type FormSubmission = InferSelectModel<typeof formSubmissions> & {
    answers: Answer[]
}

interface TableProps {
    data: FormSubmission[],
    columns: Question[]
}

const columnHelper = createColumnHelper<any>()

export function Table(props: TableProps) {
    const { data } = props;

    const columns = [
        columnHelper.accessor('id', {
            cell: info => info.getValue(),
        }),
        ...props.columns.map((question: any, index: number) => {
            return columnHelper.accessor((row) => {
                let answer = row.answers.find((answer: any) => {
                    return answer.questionId === question.id;
                });

                return answer.fieldOption ? answer.fieldOption.text : answer.value;
            }, {
                header: () => question.text,
                id: question.id.toString(),
                cell: info => info.renderValue(),
            })
        })
    ]

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    })

    return (
        <div className="p-2 mt-4">
            <div className='shadow overflow-hidden border border-gray-200 sm:rounded-lg'>
                <table>
                    <thead>
                        {table.getHeaderGroups().map(headerGroup => (
                            <tr key={headerGroup.id} className='border-b'>
                                {headerGroup.headers.map(header => (
                                    <th key={header.id} className='text-left p-3'>
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody className='divide-y divide-gray-200'>
                        {table.getRowModel().rows.map(row => (
                            <tr key={row.id} className='py-2'>
                                {row.getVisibleCells().map(cell => (
                                    <td key={cell.id} className='p-3'>
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                    <tfoot>
                        {table.getFooterGroups().map(footerGroup => (
                            <tr key={footerGroup.id}>
                                {footerGroup.headers.map(header => (
                                    <th key={header.id}>
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                header.column.columnDef.footer,
                                                header.getContext()
                                            )}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </tfoot>
                </table>
                <div className="h-4" />
            </div>
        </div>
    )
}
