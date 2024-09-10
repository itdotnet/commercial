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
import Image from 'next/image';
import { formatDateTime } from '@/lib/utils';
import Link from 'next/link';
import DeleteConfirmation from '@/components/shared/DeleteConfirmation';
import Search from '@/components/shared/Search';
import { ContentLayout } from '@/app/(management)/_components/content-layout';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Card, CardContent } from '@/components/ui/card';
import { getAllServices } from '@/lib/actions/service.actions';
import { IService } from '@/lib/database/models/service.model';

const ServiceList = async () => {
    const services = await getAllServices() as IService[];
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
                        <BreadcrumbPage>Services</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <Card className="rounded-lg border-none mt-6">
                <CardContent className="p-6">
                    <div className="min-h-[calc(100vh-56px-64px-20px-24px-56px-48px)]">
                        <div className='flex flex-col md:flex-row w-full gap-5 my-2'>
                            <Search />
                        </div>
                        <Table className='mb-10'>
                            <TableCaption>A list of your services.</TableCaption>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Title</TableHead>
                                    <TableHead>Created Date</TableHead>
                                    <TableHead>Edit</TableHead>
                                    <TableHead>Delete</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {services.map((service) => (
                                    <TableRow key={service._id}>
                                        <TableCell className="font-medium">{service.title}</TableCell>
                                        <TableCell className="font-medium">{formatDateTime(service.createdAt).dateOnly}</TableCell>
                                        <TableCell>
                                            <Link href={`/dashboard/service/${service._id}/update`} className="flex gap-2">
                                                <Image src="/assets/icons/edit.svg" alt="edit" width={20} height={20} />
                                            </Link>
                                        </TableCell>
                                        <TableCell>
                                            <DeleteConfirmation id={service._id} type='service'/>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>
        </ContentLayout>
    )
}

export default ServiceList