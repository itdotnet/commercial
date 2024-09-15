import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Image from 'next/image'
import Collection from '@/components/shared/Collection'
import { getAllTopics } from '@/lib/actions/topic.actions'
import { getAllServices } from '@/lib/actions/service.actions'
import { getAllProducts } from '@/lib/actions/product.actions'
import { SearchParamProps } from '@/types'
import Search from '@/components/shared/Search'
import CategoryFilter from '@/components/shared/CategoryFilter'

const page = async ({ searchParams }: SearchParamProps) => {
  const topicSearchText = (searchParams?.query as string) || '';
  const topicCategory = (searchParams?.category as string) || '';

  const productSearchText = (searchParams?.productQuery as string) || '';
  const productCategory = (searchParams?.productCategory as string) || '';

  const topics = await getAllTopics({
    query: topicSearchText,
    page: 1,
    category: topicCategory,
    limit: 6
  });

  const services = await getAllServices();

  const products = await getAllProducts({
    query: productSearchText,
    page: 1,
    category: productCategory,
    limit: 6
  });

  return (
    <>
      <section className='bg-primary-50 bg-dotted-pattern bg-contain py-5 md:py-10'>
        <div className='wrapper grid grid-cols-1 gap-5 md:grid-cols-2 2xl:gap-0'>
          <div className='flex flex-col justify-center gap-5'>
            <h1 className='h1-bold'>Grow and promote your business with the best approaches</h1>
            <p className='p-regular-20 md:p-regular-24'>Learn how to start your own business, host the products, get +3000 visitors and increase sales</p>
            <Button size="lg" asChild className='button w-full sm:w-fit'>
              <Link href="#services">Explore Now</Link>
            </Button>
          </div>

          <Image src="/assets/images/marketing.png" alt="marketing" width={1000} height={1000} className='max-h-[70vh]
          object-contain object-center 2xl:max-h-[50vh]'/>

        </div>
      </section>

      <section id="services" className="wrapper my-8 flex flex-col gap-8 md:gap-12">
        <h2 className="h2-bold">Services</h2>

        <Collection services={services} emptyTitle="No Services Found" emptyStateSubtext="Come back later"
          collectionType="My_Tickets" limit={6} page={1} totalPages={0} />
      </section>

      <section id="topics" className="wrapper my-8 flex flex-col gap-8 md:gap-12">
        <h2 className="h2-bold">Latest Posts</h2>

        <div className="flex flex-col w-full gap-5 md:flex-row">
          <Search />
          <CategoryFilter type='blogCategory' />
        </div>

        <Collection topics={topics?.data} emptyTitle="No Topics Found" emptyStateSubtext="Come back later"
          collectionType="My_Tickets" limit={6} page={1} totalPages={0} />
        {topics && topics.totalPages>6 && <Button size="lg" asChild variant="outline" className='button m-auto w-full md:w-1/2'>
          <Link href="/blog">See All Topics</Link>
        </Button>}
      </section>

      <section id="products" className="wrapper my-8 flex flex-col gap-8 md:gap-12">
        <h2 className="h2-bold">Latest Products</h2>

        <div className="flex flex-col w-full gap-5 md:flex-row">
          <Search paramKey='productQuery' />
          <CategoryFilter type='productCategory' paramKey="productCategory" />
        </div>

        <Collection products={products?.data} emptyTitle="No Products Found" emptyStateSubtext="Come back later"
          collectionType="All_Events" limit={6} page={1} totalPages={0} />
        {products && products.totalPages>6 && <Button size="lg" asChild variant="outline" className='button m-auto w-full md:w-1/2'>
          <Link href="/products">See All Products</Link>
        </Button>}
      </section>
    </>
  )
}

export default page