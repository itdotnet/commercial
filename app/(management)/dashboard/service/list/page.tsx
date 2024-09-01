
import { ITopic } from '@/lib/database/models/topic.model'
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
import { getAllTopics } from '@/lib/actions/topic.actions';
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

const TopicList = async ({ searchParams }: SearchParamProps) => {
    const page = Number(searchParams?.page) || 1;
    const searchText = (searchParams?.query as string) || '';
    const category = (searchParams?.category as string) || '';
    const limit = 3;

    const topics = await getAllTopics({
        query: searchText,
        category,
        page,
        limit: limit
    });
    const list = topics?.data as ITopic[];
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
                        <BreadcrumbPage>Posts</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <Card className="rounded-lg border-none mt-6">
                <CardContent className="p-6">
                    <div className="min-h-[calc(100vh-56px-64px-20px-24px-56px-48px)]">
                            <div className='flex flex-col md:flex-row w-full gap-5 my-2'>
                                <Search />
                                <CategoryFilter />
                            </div>
                            <Table className='mb-10'>
                                <TableCaption>A list of your posts.</TableCaption>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Title</TableHead>
                                        <TableHead>Category</TableHead>
                                        <TableHead>Created Date</TableHead>
                                        <TableHead>Edit</TableHead>
                                        <TableHead>Delete</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {list.map((topic) => (
                                        <TableRow key={topic._id}>
                                            <TableCell className="font-medium">{topic.title}</TableCell>
                                            <TableCell className="font-medium">{topic.category?.name}</TableCell>
                                            <TableCell className="font-medium">{formatDateTime(topic.createdAt).dateOnly}</TableCell>
                                            <TableCell>
                                                <Link href={`/dashboard/blog/${topic._id}/update`} className="flex gap-2">
                                                    <Image src="/assets/icons/edit.svg" alt="edit" width={20} height={20} />
                                                </Link>
                                            </TableCell>
                                            <TableCell>
                                                <DeleteConfirmation topicId={topic._id} />
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>

                            {topics?.totalPages && topics.totalPages > 1 && (
                                <Pagination urlParamName='page' page={page} totalPages={topics.totalPages} />
                            )}
                    </div>
                </CardContent>
            </Card>
        </ContentLayout>
    )
}

export default TopicList