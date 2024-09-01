// ====== USER PARAMS
export type CreateUserParams={
    clerkId:string
    firstName:string | null
    lastName:string | null
    userName:string
    email:string
    photo:string
}

export type UpdateUserParams = {
    firstName: string
    lastName: string
    username: string
    photo: string
}

// ====== URL QUERY PARAMS
export type UrlQueryParams = {
    params: string
    key: string
    value: string | null
    keysToRemove?: string[]
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
        createdAt?:Date
        updatedAt?:Date
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
        createdAt?:Date,
        updatedAt?:Date,
        metaDescription:string
        categoryId:string
        isActive:boolean
    }
    path:string
}

export type DeleteTopicParams={
    topicId:string
    path:string
}

export type GetAllTopicsParams={
    query:string
    category:string
    limit:number
    page:number
}