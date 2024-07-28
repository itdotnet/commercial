import Link from 'next/link'
import Image from 'next/image'
import { UserButton } from '@clerk/nextjs'

const Header = () => {
    return (
        <header className='w-full border-b'>
            <div className='wrapper flex items-center justify-between'>
                <Link className="w-36 mr-3" href="/">
                    <Image src="/assets/images/logo.svg" alt="Commercial logo" width={128} height={38} />
                </Link>

                <UserButton />
            </div>
        </header>
    )
}

export default Header