import DeleteConfirmation from '@/components/shared/DeleteConfirmation'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { IOrderItem } from '@/lib/database/models/order.model'
import { formatDateTime } from '@/lib/utils'
import React from 'react'

const OrdersTable = ({productList}:{productList:IOrderItem[]}) => {
    return (
        <Table className='mb-10'>
            <TableCaption>A list of your orders.</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead>Order Owner</TableHead>
                    <TableHead>Product Title</TableHead>
                    <TableHead>Product Price</TableHead>
                    <TableHead>Created Date</TableHead>
                    <TableHead>Delete</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {productList.map((order: IOrderItem) => (
                    <TableRow key={order._id}>
                        <TableCell className="font-medium">{order.buyer}</TableCell>
                        <TableCell className="font-medium">{order.productTitle}</TableCell>
                        <TableCell className="font-medium">{order.totalAmount} $</TableCell>
                        <TableCell className="font-medium">{formatDateTime(order.createdAt).dateOnly}</TableCell>
                        <TableCell>
                            <DeleteConfirmation id={order._id} type='order' />
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}

export default OrdersTable