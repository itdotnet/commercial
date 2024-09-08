import { ContentLayout } from '@/app/(management)/_components/content-layout'
import ServiceForm from '@/app/(management)/_components/ServiceForm'
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from '@/components/ui/breadcrumb'
import { Card, CardContent } from '@/components/ui/card'
import { getServiceById } from '@/lib/actions/service.actions'
import { auth } from '@clerk/nextjs/server'
import Link from 'next/link'
import React from 'react'

type UpdateServiceProps={
    params:{
        id:string
    }
}

const UpdateService =async ({params:{id}}:UpdateServiceProps) => {
    const service=await getServiceById(id);

    const {sessionClaims}=auth();

    const userId=sessionClaims?.userId as string;

    return (
        <ContentLayout title={`Edit Service: ${service.title}`}>
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
                            <Link href="/dashboard/blog/list">Services</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>Edit {service.title}</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <Card className="rounded-lg border-none mt-6">
                <CardContent className="p-6">
                    <div className="min-h-[calc(100vh-56px-64px-20px-24px-56px-48px)]">
                        <div className='my-8'>
                        <ServiceForm type='Update' userId={userId} service={service} serviceId={service._id}/>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </ContentLayout>
    )
}

export default UpdateService