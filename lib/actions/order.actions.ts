"use server"

import Stripe from 'stripe';
import { CheckoutOrderParams, CreateOrderParams, DeleteOrderParams, GetAllOrdersParams, GetOrdersByProductParams, GetOrdersByUserParams } from "@/types";
import { redirect } from 'next/navigation';
import { handleError } from '../utils';
import { connectToDatabase } from '../database';
import Order from '../database/models/order.model';
import { ObjectId } from 'mongodb';
import Product from '../database/models/product.model';
import User from '../database/models/user.model';
import { getCategoryByName } from './product.actions';
import { revalidatePath } from 'next/cache';

export const checkoutOrder = async (order: CheckoutOrderParams) => {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

    if (!stripe) {
        return;
    }

    const price = Number(order.price) * 100;

    try {
        const session = await stripe.checkout.sessions.create({
            line_items: [
                {
                    price_data: {
                        currency: "usd",
                        unit_amount: price,
                        product_data: {
                            name: order.productTitle
                        }
                    },
                    quantity: 1
                }
            ],
            metadata: {
                productId: order.productId,
                buyerId: order.buyerId
            },
            mode: 'payment',
            success_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/profile`,
            cancel_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/`,
        });

        redirect(session.url!);
    } catch (error) {
        throw error;
    }
}

export const createOrder = async (order: CreateOrderParams) => {
    try {
        await connectToDatabase();

        const newOrder = await Order.create({
            ...order,
            product: order.productId,
            buyer: order.buyerId
        });

        return JSON.parse(JSON.stringify(newOrder));
    } catch (error) {
        handleError(error);
    }
}

//GET ORDERS BY PRODUCT
export const getOrdersByProduct = async ({ productId,limit=3,page }: GetOrdersByProductParams) => {
    try {
        await connectToDatabase();

        const skipAmount = (Number(page) - 1) * limit;

        if (!productId) throw new Error('ProductId Is Required');
        const productObjectId = new ObjectId(productId);

        const orders = await Order.aggregate([
            {
                $lookup: {
                    from: 'users',
                    localField: 'buyer',
                    foreignField: '_id',
                    as: 'buyer',
                },
            },
            {
                $unwind: '$buyer',
            },
            {
                $lookup: {
                    from: 'products',
                    localField: 'product',
                    foreignField: '_id',
                    as: 'product',
                },
            },
            {
                $unwind: '$product',
            },
            {
                $project: {
                    _id: 1,
                    totalAmount: 1,
                    createdAt: 1,
                    productTitle: '$product.title',
                    productId: '$product._id',
                    buyer: {
                        $concat: ['$buyer.firstName',' ' ,{ $ifNull: ['$buyer.lastName', ''] }],
                    },
                },
            },
            {
                $match: {
                    $and: [{ productId: productObjectId }],
                },
            },
            {
                $skip:skipAmount
            },
            {
                $limit:limit
            }

        ]);

        const ordersCount = await Order.distinct('product._id').countDocuments({ productId: productObjectId });

        return { data: JSON.parse(JSON.stringify(orders)), totalPages: Math.ceil(ordersCount / limit) };
    } catch (error) {
        handleError(error);
    }
}

//GET ORDERS BY USER
export const getOrdersByUser = async ({ userId, limit = 3, page }: GetOrdersByUserParams) => {
    try {
        await connectToDatabase();

        const skipAmount = (Number(page) - 1) * limit;
        const conditions = { buyer: userId };

        const orders = await Order.distinct("product._id")
            .find(conditions)
            .sort({ createdAt: 'desc' })
            .skip(skipAmount)
            .limit(limit)
            .populate({
                path: 'product',
                model: Product,
                populate: {
                    path: 'organizer',
                    model: User,
                    select: '_id firstName lastName'
                }
            });

        const ordersCount = await Order.distinct('product._id').countDocuments(conditions);

        return { data: JSON.parse(JSON.stringify(orders)), totalPages: Math.ceil(ordersCount / limit) };
    } catch (error) {
        handleError(error);
    }
}

export const getAllOrders=async({category,limit=3,page}:GetAllOrdersParams)=>{
    try {
        await connectToDatabase();

        const skipAmount = (Number(page) - 1) * limit;
        const categoryCondition=category?await getCategoryByName(category):null;
        const conditions={
            $and:[categoryCondition?{product:{'category._id':new ObjectId('66c454949ef36a6d91bf90fb')}}:{}]
        }

        const orders = await Order.aggregate([
            {
                $lookup: {
                    from: 'users',
                    localField: 'buyer',
                    foreignField: '_id',
                    as: 'buyer',
                },
            },
            {
                $unwind: '$buyer',
            },
            {
                $lookup: {
                    from: 'products',
                    localField: 'product',
                    foreignField: '_id',
                    as: 'product',
                },
            },
            {
                $unwind: '$product',
            },
            {
                $project: {
                    _id: 1,
                    totalAmount: 1,
                    createdAt: 1,
                    productTitle: '$product.title',
                    productId: '$product._id',
                    categoryId:'$product.category',
                    buyer: {
                        $concat: ['$buyer.firstName',' ', { $ifNull: ['$buyer.lastName', ''] }],
                    },
                },
            },
            {
                $match: {
                    $and: [categoryCondition?{ categoryId: categoryCondition._id }:{}],
                },
            },
            {
                $skip:skipAmount,
            },
            {
                $limit:3
            }
        ]);

        const ordersCount = await Order.countDocuments(categoryCondition?{ categoryId: categoryCondition._id }:{});

        return { data: JSON.parse(JSON.stringify(orders)), totalPages: Math.ceil(ordersCount / limit) };
    } catch (error) {
        handleError(error);
    }
}

//DELETE ORDER
export async function deleteOrder({orderId,path}:DeleteOrderParams) {
    try {
        await connectToDatabase();

        const deleteOrder=await Order.findByIdAndDelete(orderId);
        if(deleteOrder) revalidatePath(path);
    } catch (error) {
        handleError(error);
    }
}