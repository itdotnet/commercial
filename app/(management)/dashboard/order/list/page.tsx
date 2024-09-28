import React from 'react'
import Link from 'next/link';
import { ContentLayout } from '@/app/(management)/_components/content-layout';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Card, CardContent } from '@/components/ui/card';
import { getAllOrders } from '@/lib/actions/order.actions';
import { SearchParamProps } from '@/types';
import CategoryFilter from '@/components/shared/CategoryFilter';
import Pagination from '@/components/shared/Pagination';
import OrdersTable from '@/app/(management)/_components/OrdersTable';

const OrderList = async ({searchParams}:SearchParamProps) => {
    const page=Number(searchParams?.page) || 1;
    const category=(searchParams?.category as string) || '';

    const orders = await getAllOrders({
        limit:3,
        page:page,
        category:category
    });
    const list=orders?.data;
    return (
        <ContentLayout title="All Services">
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
                        <BreadcrumbPage>Orders</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <Card className="rounded-lg border-none mt-6">
                <CardContent className="p-6">
                    <div className="min-h-[calc(100vh-56px-64px-20px-24px-56px-48px)]">
                        <div className='w-96 my-2'>
                            <CategoryFilter type='productCategory'/>
                        </div>
                        <OrdersTable productList={list}/>
                        {orders?.totalPages! > 1 && 
                        <Pagination page={page} totalPages={orders?.totalPages} />
                        }
                    </div>
                </CardContent>
            </Card>
        </ContentLayout>
    )
}

export default OrderList