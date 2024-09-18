"use server"

import Stripe from 'stripe';
import { CheckoutOrderParams } from "@/types";
import { redirect } from 'next/navigation';

export const checkoutOrder=async(order:CheckoutOrderParams)=>{
    const stripe=new Stripe(process.env.STRIPE_SECRET_KEY!);

      if (!stripe) {
        return;
      }

      const price=Number(order.price) * 100;

      try {
        const session=await stripe.checkout.sessions.create({
            line_items:[
                {
                    price_data:{
                        currency:"usd",
                        unit_amount:price,
                        product_data:{
                            name:order.productTitle
                        }
                    },
                    quantity:1
                }
            ],
            metadata:{
                productId:order.productId,
                buyerId:order.buyerId
            },
            mode:'payment',
            success_url:`${process.env.NEXT_PUBLIC_SERVER_URL}/profile`,
            cancel_url:`${process.env.NEXT_PUBLIC_SERVER_URL}/`,
        });

        redirect(session.url!);
      } catch (error) {
        
      }
}