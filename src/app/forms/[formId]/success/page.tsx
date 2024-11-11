import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import React from 'react'

type Props = {}

const page = (props: Props) => {
  return (
    <Alert>
    <AlertTitle className='text-green-400'>Success</AlertTitle>
    <AlertDescription>
      Your Submission have been successfully created ! Thanks for sharing your opinions.
    </AlertDescription>
  </Alert>
  )
}

export default page