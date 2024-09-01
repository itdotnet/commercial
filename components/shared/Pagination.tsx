'use client'

import React from 'react'
import { Button } from '../ui/button'
import { useRouter, useSearchParams } from 'next/navigation'
import { formUrlQuery } from '@/lib/utils'

type PaginationProps = {
    page: number | string
    totalPages?: number
    urlParamName: string
}

const Pagination = ({ page, totalPages, urlParamName }: PaginationProps) => {
    const router = useRouter();
    const searchParams = useSearchParams();
    
    if(!totalPages) return;

    const onClick = (btnType: string) => {
        const pageValue = btnType === 'next' ? Number(page) + 1 : Number(page) - 1;

        const newUrl = formUrlQuery({
            params: searchParams.toString(),
            key: urlParamName || 'page',
            value:pageValue.toString()
        })

        router.push(newUrl,{scroll:false});
    }

    return (
        <div className="flex gap-2 items-center justify-center">
            <Button size="lg" className="w-28" variant="outline" onClick={() => onClick("prev")}
                disabled={Number(page) <= 1}>Previous</Button>
            <Button size="lg" className="w-28" variant="outline" onClick={() => onClick("next")}
                disabled={Number(page) >= totalPages}>Next</Button>
        </div>
    )
}

export default Pagination