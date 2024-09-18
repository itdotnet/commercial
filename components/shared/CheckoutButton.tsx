import { IProduct } from '@/lib/database/models/product.model'
import { SignedOut, SignedIn, useUser } from '@clerk/nextjs'
import React from 'react'
import { Button } from '../ui/button';
import Link from 'next/link';
import Checkout from './Checkout';

const CheckoutButton = ({ product }: { product: IProduct }) => {
    const { user } = useUser();
    const userId = user?.publicMetadata.userId as string;

    return (
        <div>
            {product.count === 0 ? (<p>
                sorry, the product is out of stock.
            </p>) :
                <>
                    <SignedOut>
                        <Button asChild className='button rounded-full' size="lg">
                            <Link href="/sign-in">Get Product</Link>
                        </Button>
                    </SignedOut>

                    <SignedIn>
                        <Checkout product={product} userId={userId}/>
                    </SignedIn>
                </>
            }
        </div>
    )
}

export default CheckoutButton