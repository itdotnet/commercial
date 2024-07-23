import Link from 'next/link'
import React from 'react'
import Image from 'next/image'
import NavItems from './NavItems'
import MobileNav from './MobileNav'

const Header = () => {
  return (
    <header className='w-full border-b'>
      <div className='wrapper flex items-center justify-between'>
        <Link className="w-36 mr-3" href="/">
          <Image src="/assets/images/logo.svg" alt="Commercial logo" width={128} height={38}/>
        </Link>

        <nav className='md:flex-between hidden w-full max-w-2xl'>
          <NavItems/>
        </nav>

        <div className='flex justify-end gap-3 w-32'>
          <MobileNav/>
        </div>
      </div>
    </header>
  )
}

export default Header