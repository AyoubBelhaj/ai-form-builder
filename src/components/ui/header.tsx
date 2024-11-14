import React from 'react';
import { Button } from './button';
import Link from 'next/link';
import Image from 'next/image';
import { auth, signOut } from '@/auth';
import { redirect } from 'next/navigation';



type Props = {}

function SignOut() {
    return (
        <form action={async () => {
            "use server"
            signOut();
            redirect(process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000");
        }}><Button>Sign Out</Button></form>
    )
}

const Header = async (props: Props) => {

    const session = await auth();

    return (

        <header className='border-b'>
            <nav className='bg-white border-gray-200 px-4 py-2.5'>
                <div className='flex sm:flex-row lg:flex-wrap justify-between items-center max-w-screen-xl w-full'>
                    <h1><Link href="/">AI Form Builder</Link></h1>

                    {
                        session?.user ? (
                            <div className='flex items-center gap-4'><Link href="/view-forms">
                                <Button variant="outline">Dashboard</Button></Link><SignOut />{session.user.name && session.user.image && <Image className='rounded-full' src={session.user.image} alt={session.user.name} width={32} height={32} />}</div>
                        ) : (
                            <Link href={"/api/auth/signin"}><Button>Sign in</Button></Link>
                        )
                    }
                </div>
            </nav>
        </header>

    )
}

export default Header