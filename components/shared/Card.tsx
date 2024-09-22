import { ITopic } from '@/lib/database/models/topic.model'
import { formatDateTime } from '@/lib/utils'
import { auth } from '@clerk/nextjs/server'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import DeleteConfirmation from './DeleteConfirmation';
import { IService } from '@/lib/database/models/service.model'
import { IProduct } from '@/lib/database/models/product.model'
import { noImage } from '@/types'

type CardProps = {
    topic?: ITopic,
    service?: IService,
    product?: IProduct,
    isAdmin:boolean
}

const Card = ({ topic, service, product, isAdmin }: CardProps) => {
    const entityId = topic != null ? topic._id : service != null ? service._id : product?._id;

    const entity = topic != null ? topic : service != null ? service : product;
    const category = topic != null ? topic.category : product != null ? product.category : null;

    const type = topic != null ? "post" : service != null ? "service" : "product";

    return (
        <>
            {entity && <div className="group relative flex min-h-[380px] w-full max-w-[400px] flex-col overflow-hidden rounded-xl bg-white shadow-md transition-all hover:shadow-lg md:min-h-[438px]">
                <Link
                    href={`/${type}/${entityId}`}
                    style={{ background: `url(${entity.imageUrl != "" ? entity.imageUrl : noImage})`, backgroundSize: `${entity.imageUrl != "" ? "cover" : "contain"}`, backgroundRepeat: "no-repeat", backgroundPosition: "center" }}
                    className="flex-center flex-grow bg-gray-50 bg-cover bg-center text-grey-500"
                />

                {isAdmin && (
                    <div className="absolute right-2 top-2 flex flex-col gap-4 rounded-xl bg-white p-3 shadow-sm transition-all">
                        <Link href={`dashboard/${type}/${entity._id}/update`}>
                            <Image src="/assets/icons/edit.svg" alt="edit" width={20} height={20} />
                        </Link>

                        <DeleteConfirmation id={entity._id} type={topic != null ? 'topic' : service != null ? 'service' : 'product'} />
                    </div>
                )}

                <div
                    className="flex min-h-[230px] flex-col gap-3 p-5 md:gap-4"
                >
                    <div className="flex gap-2">
                        {product && <span className="p-semibold-14 w-min rounded-full bg-green-100 px-4 py-1 text-green-60">
                            {product?.price === 0 ? 'FREE' : `$${product?.price}`}
                        </span>}
                        {category && <p className="p-semibold-14 w-min rounded-full bg-grey-500/10 px-4 py-1 text-grey-500 line-clamp-1">
                            {category.name}
                        </p>}
                    </div>

                    <p className="p-medium-16 p-medium-18 text-grey-500">
                        {formatDateTime(entity.createdAt).dateTime}
                    </p>

                    <Link href={`/${type}/${entity._id}`}>
                        <p className="p-medium-16 md:p-medium-20 line-clamp-2 flex-1 text-black">{entity.title}</p>
                    </Link>

                    <p className="p-regular-16">{entity.metaDescription}</p>

                </div>

                

                <div className="flex-between w-full p-5">
                    <p className="p-medium-14 md:p-medium-16 text-grey-600">
                        {entity.organizer.firstName} {entity.organizer.lastName}
                    </p>

                    {product && isAdmin &&(
                        <Link href={`/orders?productId=${entity._id}`} className="flex gap-2">
                            <p className="text-primary-500">Order Details</p>
                            <Image src="/assets/icons/arrow.svg" alt="search" width={10} height={10} />
                        </Link>
                    )}
                </div>
            </div>
            }
        </>
    )
}

export default Card