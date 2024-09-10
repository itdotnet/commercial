import { ContentLayout } from '@/app/(management)/_components/content-layout';
import ProductForm from '@/app/(management)/_components/ProductForm';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Card, CardContent } from '@/components/ui/card';
import { auth } from '@clerk/nextjs/server';
import Link from 'next/link';
import React from 'react'

const Create = () => {
    const { sessionClaims } = auth();

    const userId = sessionClaims?.userId as string;

    return (
        <ContentLayout title="New Product">
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
                            <Link href="/dashboard/order/list">Orders</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>New</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <Card className="rounded-lg border-none mt-6">
                <CardContent className="p-6">
                    <div className="min-h-[calc(100vh-56px-64px-20px-24px-56px-48px)]">
                        <div className='my-8'>
                            <ProductForm type='Create' userId={userId} />
                        </div>
                    </div>
                </CardContent>
            </Card>
        </ContentLayout>
    )
}

export default Create