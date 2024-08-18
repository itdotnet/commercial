// ====== URL QUERY PARAMS
export type UrlQueryParams = {
    params: string
    key: string
    value: string | null
}

export type RemoveUrlQueryParams = {
    params: string
    keysToRemove: string[]
}

export type SearchParamProps = {
    params: { id: string }
    searchParams: { [key: string]: string | string[] | undefined }
}

// ====== CATEGORY PARAMS
export type CreateCategoryParams = {
    categoryName: string
}

// ====== TOPIC PARAMS
export type CreateTopicParams = {
    userId:string
    topic:{
        title:string
        description:string
        imageUrl:string
        metaDescription:string
        categoryId:string
        isActive:boolean
    }
    path:string
}

export type UpdateTopicParams={
    userId:string
    topic:{
        _id:string
        title:string
        description:string
        imageUrl:string
        metaDescription:string
        categoryId:string
        isActive:boolean
    }
    path:string
}