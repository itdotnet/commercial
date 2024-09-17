import { ITopic } from '@/lib/database/models/topic.model';
import { noImage, SearchParamProps } from '@/types'
import React from 'react'
import Image from 'next/image';
import { getServiceById } from '@/lib/actions/service.actions';

const ServiceDetails = async ({ params: { id } }: SearchParamProps) => {
    const details = await getServiceById(id) as ITopic;

    return (
        <>
            <section className='flex justify-center bg-primary-50 bg-dotted-pattern bg-contain'>
                <div className='grid grid-cols-1 md:grid-cols-2 2xl:max-w-7xl'>
                    <Image src={details.imageUrl ? details.imageUrl : noImage} alt='hero image' width={1000} height={1000}
                        className='h-full min-h-[300px] object-cover object-center' />

                    <div className='flex w-full flex-col gap-8 p-5 md:p-10'>
                        <h2 className='h2-bold'>{details.title}</h2>
                        <p dangerouslySetInnerHTML={{ __html: details.description }}></p>
                    </div>
                </div>
            </section>
        </>
    )
}

export default ServiceDetails