import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
    return (
        <div className='flex items-center justify-between gap-4 px-4 lg:px-44 py-3 
                bg-gradient-to-r from-gray-200 via-black to-purple-900'>

            {/* Brand section: Logo + Text with proper gap */}
            <div className="flex items-center relative gap-2">
                <img
                    className="w-14 sm:w-16"
                    width={150}
                    src={assets.logo_icon2}
                    alt="CutOutPro Logo"
                />
                <span
                    className="text-xl sm:text-2xl font-semibold italic text-black"
                    style={{ fontFamily: 'Times New Roman, Times, serif' }}
                >
                    CutOutPro
                </span>
            </div>

            {/* Copyright */}
            <p className='flex-1 border-l border-gray-400 pl-4 text-sm text-gray-300 max-sm:hidden'>
                Copyright idhruvbhargav.dev | All rights reserved.
            </p>

            {/* Social icons */}
            <div className='flex gap-1'>
                <img width={40} src={assets.facebook_icon} alt='' className='hover:brightness-125 transition' />
                <img width={40} src={assets.twitter_icon} alt='' className='hover:brightness-125 transition' />
                <img width={40} src={assets.google_plus_icon} alt='' className='hover:brightness-125 transition' />
            </div>
        </div>

    )
}

export default Footer
