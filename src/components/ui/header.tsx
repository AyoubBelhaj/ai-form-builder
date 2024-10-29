import React from 'react';
import { Button } from './button';
import Link from 'next/link';
import Image from 'next/image';
import { auth, signOut } from '@/app/api/auth/[...nextauth]/route';


type Props = {}

function SignOut() {
    return (
        <form action={async () => {
            "use server"
            await signOut();
        }}><Button>Sign Out</Button></form>
    )
}

const Header = async (props: Props) => {
    
    const session = await auth();

    return (
        
            <header className='border bottom-1'>
                <nav className='bg-white border-gray-200 px-4 py-2.5'>
                    <div className='flex flex-wrap justify-between items-center max-w-screen-xl'>
                        <h1>AI Form Builder</h1>
                    
                    {
                        session?.user ? (
                            <div className='flex items-center gap-4'><SignOut/>{session.user.name && session.user.image && <Image className='rounded-full' src={session.user.image} alt={session.user.name} width={32} height={32}/>}</div>
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