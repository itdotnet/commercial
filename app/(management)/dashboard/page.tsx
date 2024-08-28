import React from 'react'
import { ContentLayout } from '../_components/admin-panel/content-layout'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb'
import { Card, CardContent } from '@/components/ui/card'
import Link from 'next/link'

const Dashboard = () => {
    return (
        <ContentLayout title="Dashboard">
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link href="/">Home</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>Dashboard</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            {/* <PlaceholderContent /> */}
            <Card className="rounded-lg border-none mt-6">
                <CardContent className="p-6">
                    <div className="flex justify-center items-center min-h-[calc(100vh-56px-64px-20px-24px-56px-48px)]">
                        <div className="flex flex-col relative">

                            <div className="absolute -bottom-8 right-0">

                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </ContentLayout>
    )
}

export default Dashboard