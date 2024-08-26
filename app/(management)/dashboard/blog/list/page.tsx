
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

const TopicList = async ({ searchParams }: SearchParamProps) => {
    const page = Number(searchParams?.page) || 1;
    const searchText = (searchParams?.query as string) || '';
    const category = (searchParams?.category as string) || '';

    const topics = await getAllTopics({
        query: searchText,
        category,
        page,
        limit: 10
    });
    const list = topics?.data;
    return (
        <>
            <section className='bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10 px-5'>
                <h3 className='wrapper h3-bold text-center sm:text-left'>Topics List</h3>
            </section>

            <div className='flex flex-col md:flex-row w-full gap-5 my-2'>
                <Search />
                <CategoryFilter />
            </div>
            <Table>
                <TableCaption>A list of your topics.</TableCaption>
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
                    {list.map((topic: ITopic) => (
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
        </>
    )
}

export default TopicList