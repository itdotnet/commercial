'use client'

import React, { useEffect, useState } from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { formUrlQuery, removeKeysFromQuery } from '@/lib/utils';
import { useRouter, useSearchParams } from 'next/navigation';
import { ICategory } from '@/lib/database/models/category.model';
import { getAllCategories } from '@/lib/actions/category.actions';
import { getAllCategories as getAllProductCategories} from '@/lib/actions/productCategory.actions';

type CategoryFilterProps={
    type:"blogCategory" | "productCategory",
    paramKey?:string
}

const CategoryFilter = ({type,paramKey="category"}:CategoryFilterProps) => {
    const [categories,setCategories]=useState<ICategory[]>([]);
    const searchParams=useSearchParams();
    const router=useRouter();

    useEffect(() => {
      const getCategories=async()=>{
        let categoryList;
        if(type==="blogCategory")
            categoryList=await getAllCategories();
        else
            categoryList=await getAllProductCategories();

        categoryList && setCategories(categoryList as ICategory[]);
      }

      getCategories();
    }, [])
    

    const onSelectCategory=(category:string)=>{
        let newUrl='';

        if(category && category!='All'){
            newUrl=formUrlQuery({
                params:searchParams.toString(),
                key:paramKey,
                value:category,
                keysToRemove:['page']
            });
        }
        else{
            newUrl=removeKeysFromQuery({
                params:searchParams.toString(),
                keysToRemove:[paramKey]
            })
        }

        router.push(newUrl,{scroll:false});
    }

    return (
        <Select onValueChange={(value: string) => onSelectCategory(value)}>
            <SelectTrigger className="select-field">
                <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="All" className="select-item p-regular-14">All</SelectItem>
                {categories.map((category) => (
                    <SelectItem key={category._id} value={category.name} className="select-item p-regular-14">{category.name}</SelectItem>
                ))}
            </SelectContent>
        </Select>
    )
}

export default CategoryFilter