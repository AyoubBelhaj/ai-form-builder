import React from 'react'
import { getUserForms } from '@/app/actions/getUserForms'
import { InferSelectModel } from 'drizzle-orm'
import { forms } from '@/db/schema'
import FormPicker from './FormPicker'
type Props = {}

const page = async (props: Props) => {
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
    <div>Results: <FormPicker options={selectOptions}/> & Table</div>
  )
}

export default page