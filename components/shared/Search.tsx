'use client'

import React, { useEffect, useState } from 'react'
import { Input } from '../ui/input'
import Image from 'next/image'
import { useRouter, useSearchParams } from 'next/navigation';
import { formUrlQuery, removeKeysFromQuery } from '@/lib/utils';

const Search = ({ placeholder = 'Search title...',paramKey="query" }: { placeholder?: string,paramKey?:string }) => {
    const [query, setQuery] = useState('');
    const router = useRouter();
    const searchParams = useSearchParams();

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            let newUrl = '';

            if (query) {
                newUrl = formUrlQuery({
                    params: searchParams.toString(),
                    key: paramKey,
                    value: query
                });
            }
            else {
                newUrl = removeKeysFromQuery({
                    params: searchParams.toString(),
                    keysToRemove: [paramKey]
                });
            }

            router.push(newUrl,{scroll:false});

            return ()=>clearTimeout(delayDebounceFn);
        }, 300);
    }, [query, router, searchParams])


    return (
        <div className='flex-center min-h-[54px] w-full overflow-hidden rounded-full bg-grey-50 px-4 py-2'>
            <Image src="/assets/icons/search.svg" alt="search" width={24} height={24} />
            <Input
                type='text'
                placeholder={placeholder}
                onChange={(e) => setQuery(e.target.value)}
                className='p-regular-16 border-0 bg-gray-50 outline-offset-0 placeholder:text-grey-500
          focus:border-0 focus-visible:ring-0 focus-visible:ring-offset-0'
            />
        </div>
    )
}

export default Search