import React from 'react'
import { getUserForms } from '@/app/actions/getUserForms'
import { InferSelectModel } from 'drizzle-orm'
import { forms } from '@/db/schema'
import FormPicker from './FormPicker'
import ResultsDisplay from './ResultsDisplay'
type Props = {}

const page = async ({searchParams}:{
  searchParams: {
    [key: string ] : string | string[] | undefined
  }
}) => {
  const userForms : Array<InferSelectModel<typeof forms>> = await getUserForms();
  if (!userForms?.length || userForms.length === 0) {
    return (<div>No Form found</div>)
  }

  const selectOptions = userForms.map((userForm) => {
    return {
      label: userForm.name,
      value: userForm.id
    }
  })
  return (
    <div>Results: <FormPicker options={selectOptions}/><ResultsDisplay formId={searchParams?.id ? parseInt(searchParams.id as string) : userForms[0].id}/></div>
  )
}

export default page