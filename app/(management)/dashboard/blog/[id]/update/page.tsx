import BlogForm from '@/app/(management)/_components/BlogForm'
import { getTopicById } from '@/lib/actions/topic.actions'
import { auth } from '@clerk/nextjs/server'
import React from 'react'

type UpdateTopicProps={
    params:{
        id:string
    }
}

const UpdateTopic =async ({params:{id}}:UpdateTopicProps) => {
    const topic=await getTopicById(id);

    const {sessionClaims}=auth();

    const userId=sessionClaims?.userId as string;

    return (
        <>
            <section className='bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10 px-5'>
                <h3 className='wrapper h3-bold text-center sm:text-left'>Update Topic</h3>
            </section>

            <div className='wrapper my-8'>
                <BlogForm type='Update' userId={userId} topic={topic} topicId={topic._id}/>
            </div>
        </>
    )
}

export default UpdateTopic