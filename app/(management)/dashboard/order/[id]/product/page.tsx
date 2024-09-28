'use client'

import { ContentLayout } from '@/app/(management)/_components/content-layout';
import OrdersTable from '@/app/(management)/_components/OrdersTable';
import Pagination from '@/components/shared/Pagination';
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from '@/components/ui/breadcrumb';
import { Card, CardContent } from '@/components/ui/card';
import { getOrdersByProduct } from '@/lib/actions/order.actions';
import { getProductById } from '@/lib/actions/product.actions';
import { IOrderItem } from '@/lib/database/models/order.model';
import { SearchParamProps } from '@/types';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const ProductOrders = ({ searchParams, params: { id } }: SearchParamProps) => {
    const router=useRouter();
    const page = Number(searchParams?.page) || 1;
    const [productTitle, setProductTitle] = useState('');
    const [data, setData] = useState<IOrderItem[]>([]);
    const [totalPage, setTotalPage] = useState(0);

    useEffect(() => {
        const getProductTitle = async () => {
            const product = await getProductById(id);
            // if(!product)
            //     router.back();

            setProductTitle(product.title);
        }

        const getData=async()=>{
            const orders = await getOrdersByProduct({
                productId:id,
                limit: 3,
                page: page
            });

            setData(orders?.data);
            setTotalPage(orders?.totalPages!);
        }

        getProductTitle();

        getData();
    }, [])


    
    //const list = orders?.data;
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
                        <BreadcrumbLink asChild>
                            <Link href="/dashboard/order/list">Orders</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>For Product {productTitle}</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <Card className="rounded-lg border-none mt-6">
                <CardContent className="p-6">
                    <div className="min-h-[calc(100vh-56px-64px-20px-24px-56px-48px)]">
                        <OrdersTable productList={data} />
                        {totalPage > 1 &&
                            <Pagination page={page} totalPages={totalPage} />
                        }
                    </div>
                </CardContent>
            </Card>
        </ContentLayout>
    )
}

export default ProductOrders