import { GitHubLogoIcon, LinkedInLogoIcon } from '@radix-ui/react-icons'
import React from 'react'

const Footer = () => {
  return (
    <div className='flex flex-col items-center gap-2 p-2 bottom-0 text-xs'>
        <div className='flex items-center gap-2'>
            <p className='font-semibold'>Made by Pritam Nandy</p>
            <hr className='border border-gray-500 rounded w-4 rotate-90'/>
            <div className='flex items-center gap-1'>
                <GitHubLogoIcon />
                <LinkedInLogoIcon />
            </div>
        </div>
        <p>&copy; Insta Clone - 2025, All rights reserved. </p>
    </div>
  )
}

export default Footer