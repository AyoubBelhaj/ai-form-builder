import { SessionProvider } from 'next-auth/react'
import FormGenerator from './form-generator'
import Header from '@/components/ui/header'
import { db } from '@/db'
import FormsList from './forms/formsList';


export default async function Home() {
  const forms = await db.query.forms.findMany();
  console.log(forms);
  
  return (
    <SessionProvider>
    <Header/>
    <main className="flex min-h-screen flex-col items-center p-24">
      <FormGenerator/>
      <FormsList forms={forms}/>
    </main>
    </SessionProvider>
  )
}
