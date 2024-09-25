'use client'

import { startTransition, useState, useTransition } from 'react'
import { usePathname } from 'next/navigation'
import Image from 'next/image'

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { deleteTopic } from '@/lib/actions/topic.actions'
import { deleteProduct } from '@/lib/actions/product.actions'
import { deleteService } from '@/lib/actions/service.actions'
import { deleteOrder } from '@/lib/actions/order.actions'

const DeleteConfirmation = ({id,type}:{id:string,type:"topic" | "product" | "service" | "order"}) => {
    const pathname=usePathname();
    let [isPending,startTransition]=useTransition();

    return (
        <AlertDialog>
            <AlertDialogTrigger>
                <Image src="/assets/icons/delete.svg" alt="edit" width={20} height={20} />
            </AlertDialogTrigger>

            <AlertDialogContent className="bg-white">
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure you want to delete?</AlertDialogTitle>
                    <AlertDialogDescription className="p-regular-16 text-grey-600">
                        This will permanently delete this {type}
                    </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>

                    <AlertDialogAction
                        onClick={() =>
                            startTransition(async () => {
                                if(type==="topic")
                                    await deleteTopic({ topicId:id, path: pathname })
                                else if(type==="product")
                                    await deleteProduct({ productId:id, path: pathname })
                                else if(type==="service")
                                    await deleteService({ topicId:id, path: pathname })
                                else
                                    await deleteOrder({ orderId:id, path: pathname })
                            })
                        }>
                        {isPending ? 'Deleting...' : 'Delete'}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default DeleteConfirmation