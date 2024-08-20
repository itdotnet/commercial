import BlogForm from '@/app/(management)/_components/BlogForm'
import { auth } from '@clerk/nextjs/server';
import React from 'react'

const Create = () => {
    const {sessionClaims}=auth();

    const userId=sessionClaims?.userId as string;
console.log(userId);
    return (
        <>
            <section className='bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10 px-5'>
                <h3 className='h3-bold text-center sm:text-left'>Create Topic</h3>
            </section>

            <div className='my-8'>
                <BlogForm type='Create' userId={userId}/>
            </div>
        </>
    )
}

export default Create