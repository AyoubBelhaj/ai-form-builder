import React from 'react'
import Image from 'next/image'
import FormGenerator from '../form-generator'

type Props = {}

const LandingPage = (props: Props) => {
    return (
        <>
            <section className='flex flex-col items-center justify-center space-y-4 pt-4 sm:pt-24 w-full bg-[url(/grid.svg)]' id='hero'>
                <h1 className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-center tracking-tighter leading-tight sm:leading-snug md:leading-normal'>
                    Create your own forms <br /> in seconds, not hours
                </h1>
                <p className='max-w-[600px] my-4 text-center text-gray-500 text-base sm:text-lg md:text-xl lg:text-2xl'>
                    Generate, publish and share your form right away with AI. Dive into insightful results, charts, and analytics
                </p>
                <FormGenerator />
                <div className="w-full bg-gradient-to-b from-transparent to-white h-24"></div>
            </section>

            <section className='flex flex-col items-center justify-center space-y-4 mt-12 pb-20' id='features'>
                <h2 className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-center tracking-tighter leading-tight sm:leading-snug md:leading-normal'>
                    How it works
                </h2>
                <ul className='grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full max-w-5xl text-center'>
                    <li className='flex flex-col items-center space-y-4 relative'>
                        <Image
                            src="/images/app/demo1.png"
                            width="250"
                            height="250"
                            alt='update the form'
                            className='bg-white p-4 shadow-sm border rounded-md'
                        />
                        <Image
                            src="/blackArrow.svg"
                            alt='arrow'
                            width="125"
                            height="125"
                            className="absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2 md:block hidden"
                        />
                        <p className='text-base sm:text-lg md:text-xl'>
                            1. Add a prompt and describe the requirements for your form.
                        </p>
                    </li>
                    <li className='flex flex-col items-center space-y-4 relative'>
                        <Image
                            src="/images/app/demo2.png"
                            width="250"
                            height="250"
                            alt='update the form'
                            className='bg-white p-4 shadow-sm border rounded-md'
                        />
                        <Image
                            src="/blackArrow.svg"
                            alt='arrow'
                            width="125"
                            height="125"
                            className="absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2 scale-x-[-1] rotate-180 md:block hidden"
                        />
                        <p className='text-base sm:text-lg md:text-xl'>
                            2. Generate the form.
                        </p>
                    </li>
                    <li className='flex flex-col items-center space-y-4 relative'>
                        <Image
                            src="/images/app/demo3.png"
                            width="250"
                            height="250"
                            alt='update the form'
                            className='bg-white p-4 shadow-sm border rounded-md'
                        />
                        <p className='text-base sm:text-lg md:text-xl'>
                            3. Check results, analytics, and more.
                        </p>
                    </li>
                </ul>
            </section>
        </>
    )
}

export default LandingPage