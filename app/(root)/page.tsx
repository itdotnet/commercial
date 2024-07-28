import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Image from 'next/image'

const page = () => {
  return (
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
  )
}

export default page