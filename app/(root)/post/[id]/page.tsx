import { getRelatedTopicsByCategory, getTopicById } from '@/lib/actions/topic.actions';
import { ITopic } from '@/lib/database/models/topic.model';
import { noImage, SearchParamProps } from '@/types'
import React from 'react'
import Image from 'next/image';
import { formatDateTime } from '@/lib/utils';
import Collection from '@/components/shared/Collection';

const PostDetails = async ({ params: { id }, searchParams }: SearchParamProps) => {
    const details = await getTopicById(id) as ITopic;
    const relatedTopics =details.category? await getRelatedTopicsByCategory({
      categoryId: details.category._id,
      topicId: details._id,
      page: searchParams.page as string
    }):null;
  
    return (
      <>
        <section className='flex justify-center bg-primary-50 bg-dotted-pattern bg-contain'>
          <div className='grid grid-cols-1 md:grid-cols-2 2xl:max-w-7xl'>
            <Image src={details.imageUrl ? details.imageUrl : noImage} alt='hero image' width={1000} height={1000}
              className='h-full min-h-[300px] object-cover object-center' />
  
            <div className='flex w-full flex-col gap-8 p-5 md:p-10'>
              <div className='flex flex-col gap-6'>
                <h2 className='h2-bold'>{details.title}</h2>
  
                <div className='flex flex-col gap-3 sm:flex-row sm:items-center'>
                  {details.category && <p className='p-medium-16 rounded-full bg-grey-500/10 px-4 py-2.5 text-grey-500'>
                    {details.category.name}
                  </p>}
  
                  <p className='p-medium-18 ml-2 mt-2 sm:mt-0'>
                    by{' '}
                    <span className='text-primary-500'>{details.organizer.firstName} {details.organizer.lastName}</span>
                  </p>
                </div>
              </div>
  
              <div className='flex flex-col gap-5'>
                <div className='flex gap-2 md:gap-3'>
                  <Image src='/assets/icons/calendar.svg' alt='calendar' width={32} height={32} />
                  <div className='p-medium-16 lg:p-regular-20 flex flex-col flex-wrap items-center'>
                    <p>
                      {formatDateTime(details.createdAt).dateOnly}
                    </p>
                  </div>
                </div>
  
              </div>
            </div>
          </div>
        </section>
  
        <section className='wrapper'>
          <p dangerouslySetInnerHTML={{ __html: details.description }}></p>
        </section>
  
        {/* posts with the same category */}
        {relatedTopics && relatedTopics?.totalPages>0 && <section className="wrapper my-8 flex flex-col gap-8 md:gap-12">
          <hr />
          <h2 className='h2-bold'>Related Posts</h2>
          <Collection topics={relatedTopics?.data} emptyTitle="No Posts Found" emptyStateSubtext="Come back later"
            limit={3} page={searchParams.page as string} totalPages={relatedTopics?.totalPages} />
        </section>}
      </>
    )
  }
  
  export default PostDetails