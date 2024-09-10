
import React from 'react'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { SearchParamProps } from '@/types';
import Image from 'next/image';
import { formatDateTime } from '@/lib/utils';
import Link from 'next/link';
import DeleteConfirmation from '@/components/shared/DeleteConfirmation';
import Search from '@/components/shared/Search';
import CategoryFilter from '@/components/shared/CategoryFilter';
import Pagination from '@/components/shared/Pagination';
import { ContentLayout } from '@/app/(management)/_components/content-layout';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Card, CardContent } from '@/components/ui/card';
import { getAllProducts } from '@/lib/actions/product.actions';
import { IProduct } from '@/lib/database/models/product.model';

const ProductList = async ({ searchParams }: SearchParamProps) => {
    const page = Number(searchParams?.page) || 1;
    const searchText = (searchParams?.query as string) || '';
    const category = (searchParams?.category as string) || '';
    const limit = 3;

    const products = await getAllProducts({
        query: searchText,
        category,
        page,
        limit: limit
    });
    const list = products?.data as IProduct[];
    return (
        <ContentLayout title="All Products">
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
                        <BreadcrumbPage>Products</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <Card className="rounded-lg border-none mt-6">
                <CardContent className="p-6">
                    <div className="min-h-[calc(100vh-56px-64px-20px-24px-56px-48px)]">
                            <div className='flex flex-col md:flex-row w-full gap-5 my-2'>
                                <Search />
                                <CategoryFilter type='productCategory'/>
                            </div>
                            <Table className='mb-10'>
                                <TableCaption>A list of your products.</TableCaption>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Title</TableHead>
                                        <TableHead>Category</TableHead>
                                        <TableHead>Price</TableHead>
                                        <TableHead>Count</TableHead>
                                        <TableHead>Created Date</TableHead>
                                        <TableHead>Edit</TableHead>
                                        <TableHead>Delete</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {list.map((product) => (
                                        <TableRow key={product._id}>
                                            <TableCell className="font-medium">{product.title}</TableCell>
                                            <TableCell className="font-medium">{product.category?.name}</TableCell>
                                            <TableCell className="font-medium">{product.price} $</TableCell>
                                            <TableCell className="font-medium">{product.count}</TableCell>
                                            <TableCell className="font-medium">{formatDateTime(product.createdAt).dateOnly}</TableCell>
                                            <TableCell>
                                                <Link href={`/dashboard/product/${product._id}/update`} className="flex gap-2">
                                                    <Image src="/assets/icons/edit.svg" alt="edit" width={20} height={20} />
                                                </Link>
                                            </TableCell>
                                            <TableCell>
                                                <DeleteConfirmation id={product._id} type='product'/>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                            <Pagination urlParamName='page' page={page} totalPages={products?.totalPages} />
                    </div>
                </CardContent>
            </Card>
        </ContentLayout>
    )
}

export default ProductList