import { noImage, SearchParamProps } from '@/types'
import React from 'react'
import Image from 'next/image';
import { formatDateTime } from '@/lib/utils';
import Collection from '@/components/shared/Collection';
import { getProductById, getRelatedProductsByCategory } from '@/lib/actions/product.actions';
import { IProduct } from '@/lib/database/models/product.model';
import CheckoutButton from '@/components/shared/CheckoutButton';

const ProductDetails = async ({ params: { id }, searchParams }: SearchParamProps) => {
    const details = await getProductById(id) as IProduct;
    const relatedProducts = details.category ? await getRelatedProductsByCategory({
        categoryId: details.category._id,
        productId: details._id,
        page: searchParams.page as string
    }) : null;

    return (
        <>
            <section className='flex justify-center bg-primary-50 bg-dotted-pattern bg-contain'>
                <div className='grid grid-cols-1 md:grid-cols-2 2xl:max-w-7xl'>
                    <Image src={details.imageUrl ? details.imageUrl : noImage} alt='hero image' width={1000} height={1000}
                        className='h-full min-h-[300px] object-cover object-center' />

                    <div className='flex w-full flex-col gap-8 p-5 md:p-10'>
                        <div className='flex flex-col gap-6'>
                            <h2 className='h2-bold'>{details.title}</h2>

                            <CheckoutButton product={details}/>

                            <div className='flex flex-col gap-3 sm:flex-row sm:items-center'>
                                {details.category && <p className='p-medium-16 rounded-full bg-grey-500/10 px-4 py-2.5 text-grey-500'>
                                    {details.category.name}
                                </p>}

                                <div className='flex'>
                                    <Image src='/assets/icons/dollar.svg' alt='dollar' width={32} height={32} />
                                    <div className='p-medium-16 lg:p-regular-20 flex flex-col flex-wrap items-center'>
                                        <p>
                                            {details.price}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className='wrapper'>
                <div dangerouslySetInnerHTML={{ __html: details.description }}></div>
            </section>

            {/* posts with the same category */}
            {relatedProducts && relatedProducts?.totalPages > 0 && <section className="wrapper my-8 flex flex-col gap-8 md:gap-12">
                <hr />
                <h2 className='h2-bold'>Related Posts</h2>
                <Collection products={relatedProducts?.data} emptyTitle="No Products Found" emptyStateSubtext="Come back later"
                    limit={3} page={searchParams.page as string} totalPages={relatedProducts?.totalPages} />
            </section>}
        </>
    )
}

export default ProductDetails