import React from 'react'

type Props = {}

const FormEditLayout = ({
    children
} : {
    children : React.ReactNode
}) => {
  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>{children}</main>
  )
}

export default FormEditLayout