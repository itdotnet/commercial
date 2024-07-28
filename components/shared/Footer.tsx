import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Footer = () => {
  return (
    <footer className='border-t'>
      <div className='flex-between wrapper flex-col gap-5 md:flex-row p-5 text-center'>
        <Link href="/">
          <Image src="/assets/images/logo.svg" alt="logo" width={128} height={38} />
        </Link>

        <p>2024 Commercial. All Rights reserved.</p>
      </div>
    </footer>
  )
}

export default Footer