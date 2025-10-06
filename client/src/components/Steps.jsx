import React from 'react'
import { assets } from '../assets/assets'

const Steps = () => {
    return (
        <div className='mx-4 lg:mx-44 py-20 xl:py-40'>
            <h1 className="text-center text-2xl md:text-3xl lg:text-4xl mt-4 font-semibold 
               bg-gradient-to-r from-white via-purple-400 to-purple-700 
               bg-clip-text text-transparent">
                Steps to remove background <br /> image in seconds
            </h1>

            <div className='flex items-start flex-wrap gap-4 mt-16 xl:mt-24 justify-center'>

                <div className='flex items-start gap-4 bg-gradient-to-b from-gray-800 via-black to-purple-900 border border-gray-700 drop-shadow-lg p-7 pb-10 rounded-lg hover:scale-105 transition-all duration-500'>
                    <img className='w-8 h-8' src={assets.upload_icon} />
                    <div>
                        <p className='text-xl font-semibold text-white'>Upload image</p>
                        <p className='text-sm text-gray-300 mt-1'>
                            This is a demo text, will replace it later.<br /> This is a demo...
                        </p>
                    </div>
                </div>

                <div className='flex items-start gap-4 bg-gradient-to-b from-gray-800 via-black to-purple-900 border border-gray-700 drop-shadow-lg p-7 pb-10 rounded-lg hover:scale-105 transition-all duration-500'>
                    <img className='w-8 h-8' src={assets.remove_bg_icon} />
                    <div>
                        <p className='text-xl font-semibold text-white'>Remove background</p>
                        <p className='text-sm text-gray-300 mt-1'>
                            This is a demo text, will replace it later.<br /> This is a demo...
                        </p>
                    </div>
                </div>

                <div className='flex items-start gap-4 bg-gradient-to-b from-gray-800 via-black to-purple-900 border border-gray-700 drop-shadow-lg p-7 pb-10 rounded-lg hover:scale-105 transition-all duration-500'>
                    <img className='w-8 h-8' src={assets.download_icon} />
                    <div>
                        <p className='text-xl font-semibold text-white'>Download image</p>
                        <p className='text-sm text-gray-300 mt-1'>
                            This is a demo text, will replace it later.<br /> This is a demo...
                        </p>
                    </div>
                </div>

            </div>

        </div>
    )
}

export default Steps
