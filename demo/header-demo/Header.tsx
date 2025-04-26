
import { PaperPlaneIcon } from '@radix-ui/react-icons'
import { ModeToggle } from '../theme-demo/ModeToggle'

import React from 'react'
import Link from 'next/link'


const Header = () => {
  return (
    <div className='w-full p-4 bg-blue-600 rounded-b-sm flex flex-row justify-between'>
        <Link href={'/'} className='flex items-center gap-1 text-white'>
            <PaperPlaneIcon className='h-6 w-6'/>
            <p className='font-bold text-xl font-serif'>PicPerfect</p>
        </Link>  

        {/* For applying themes */}
        <ModeToggle />
    </div>
  )
}

export default Header