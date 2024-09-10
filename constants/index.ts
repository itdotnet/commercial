
export const headerLinks = [
    {
        label: 'Home',
        route: '/'
    },
    {
        label: 'Services',
        route: '/services'
    },
    {
        label: 'Products',
        route: '/products'
    },
    {
        label: 'Blog',
        route: '/blog'
    },
    {
        label: 'About Us',
        route: '/about'
    },
    {
        label: 'Contact Us',
        route: '/contact'
    }
]

export const blogDefaultValues = {
    title: '',
    description: '',
    imageUrl: '',
    createdAt:new Date(),
    updatedAt:new Date(),
    metaDescription: '',
    categoryId: '',
    isActive: true
}

export const productDefaultValues = {
    title: '',
    description: '',
    imageUrl: '',
    createdAt:new Date(),
    updatedAt:new Date(),
    metaDescription: '',
    price:null,
    count:1,
    categoryId: '',
    isActive: true
}