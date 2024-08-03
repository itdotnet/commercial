import BlogForm from '@/app/(management)/_components/BlogForm'
import React from 'react'

const Create = () => {
    return (
        <>
            <section className='bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10 px-5'>
                <h3 className='wrapper h3-bold text-center sm:text-left'>Create Topic</h3>
            </section>

            <div className='wrapper my-8'>
                <BlogForm />
            </div>
        </>
    )
}

export default Create