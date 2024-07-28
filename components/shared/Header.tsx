import Link from 'next/link'
import React from 'react'
import Image from 'next/image'
import NavItems from './NavItems'
import MobileNav from './MobileNav'
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import { Button } from '../ui/button'

const Header = () => {
  return (
    <header className='w-full border-b'>
      <div className='wrapper flex items-center justify-between'>
        <Link className="w-36 mr-3" href="/">
          <Image src="/assets/images/logo.svg" alt="Commercial logo" width={128} height={38} />
        </Link>

        <nav className='lg:flex-between hidden w-full max-w-2xl mr-5'>
          <NavItems />
        </nav>

        <div className='flex justify-end gap-3 w-42'>
          <SignedIn>
            <Button asChild size="lg" className='rounded-full hidden lg:flex'>
              <Link href="/dashboard">Dashboard</Link>
            </Button>
            <UserButton />
          </SignedIn>
          <MobileNav />
          <SignedOut>
            <Button asChild size="lg" className='rounded-full'>
              <Link href="/sign-in">Login</Link>
            </Button>
          </SignedOut>
        </div>
      </div>
    </header>
  )
}

export default Header