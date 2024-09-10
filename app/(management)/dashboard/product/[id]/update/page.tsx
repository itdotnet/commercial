import { ContentLayout } from '@/app/(management)/_components/content-layout'
import ProductForm from '@/app/(management)/_components/ProductForm'
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from '@/components/ui/breadcrumb'
import { Card, CardContent } from '@/components/ui/card'
import { getProductById } from '@/lib/actions/product.actions'
import { auth } from '@clerk/nextjs/server'
import Link from 'next/link'
import React from 'react'

type UpdateProductProps={
    params:{
        id:string
    }
}

const UpdateProduct =async ({params:{id}}:UpdateProductProps) => {
    const product=await getProductById(id);

    const {sessionClaims}=auth();

    const userId=sessionClaims?.userId as string;

    return (
        <ContentLayout title={`Edit Product: ${product.title}`}>
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
                            <Link href="/dashboard/product/list">Products</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>Edit {product.title}</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <Card className="rounded-lg border-none mt-6">
                <CardContent className="p-6">
                    <div className="min-h-[calc(100vh-56px-64px-20px-24px-56px-48px)]">
                        <div className='my-8'>
                        <ProductForm type='Update' userId={userId} product={product} productId={product._id}/>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </ContentLayout>
    )
}

export default UpdateProduct