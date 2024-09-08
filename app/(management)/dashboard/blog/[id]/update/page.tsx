import BlogForm from '@/app/(management)/_components/BlogForm'
import { ContentLayout } from '@/app/(management)/_components/content-layout'
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from '@/components/ui/breadcrumb'
import { Card, CardContent } from '@/components/ui/card'
import { getTopicById } from '@/lib/actions/topic.actions'
import { auth } from '@clerk/nextjs/server'
import Link from 'next/link'
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
        <ContentLayout title={`Edit Topic: ${topic.title}`}>
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link href="/">Home</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link href="/dashboard">Dashboard</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link href="/dashboard/blog/list">Posts</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>Edit {topic.title}</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <Card className="rounded-lg border-none mt-6">
                <CardContent className="p-6">
                    <div className="min-h-[calc(100vh-56px-64px-20px-24px-56px-48px)]">
                        <div className='my-8'>
                        <BlogForm type='Update' userId={userId} topic={topic} topicId={topic._id}/>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </ContentLayout>
    )
}

export default UpdateTopic