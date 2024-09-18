export const noImage="/assets/images/no-image.png"

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
        categoryId?:string
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
        categoryId?:string
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
    category?:string
    limit:number
    page:number
}

export type GetRelatedTopicsByCategoryParams = {
    categoryId: string
    topicId: string
    limit?: number
    page: number | string
}

// ====== PRODUCT PARAMS
export type CreateProductParams = {
    userId:string
    product:{
        title:string
        description:string
        imageUrl:string
        createdAt?:Date
        updatedAt?:Date
        metaDescription:string
        categoryId:string
        price:number | null
        count:number
        isActive:boolean
    }
    path:string
}

export type UpdateProductParams={
    userId:string
    product:{
        _id:string
        title:string
        description:string
        imageUrl:string
        createdAt?:Date,
        updatedAt?:Date,
        metaDescription:string
        categoryId:string
        price:number | null
        count:number
        isActive:boolean
    }
    path:string
}

export type DeleteProductParams={
    productId:string
    path:string
}

export type GetAllProductsParams={
    query:string
    category?:string
    limit:number
    page:number
}

export type GetRelatedProductsByCategoryParams = {
    categoryId: string
    productId: string
    limit?: number
    page: number | string
}

// ====== ORDER PARAMS
export type CheckoutOrderParams={
    productTitle:string
    productId: string
    price: string
    buyerId: string
}

export type CreateOrderParams = {
    stripeId: string
    productId: string
    buyerId: string
    totalAmount: string
    createdAt: Date
}

export type GetOrdersByProductParams = {
    productId: string
    searchString: string
}

export type GetOrdersByUserParams = {
    userId: string | null
    limit?: number
    page: string | number | null
}