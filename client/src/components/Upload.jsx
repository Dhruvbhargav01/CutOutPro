import React from 'react'
import { assets } from '../assets/assets'

const Upload = () => {
    return (
        <div className='pb-16'>

            {/* Title */}
            <h1 className='text-center text-2xl md:text-3xl lg:text-4xl mt-4 font-semibold 
                 bg-gradient-to-r from-white via-purple-400 to-purple-700 
                 bg-clip-text text-transparent py-6 md:py-16'>
                See the magic. Try now
            </h1>

            <div className='text-center mb-24'>
                <input type='file' id='upload2' hidden />
                <label className='inline-flex items-center gap-3 px-8 py-3.5 rounded-full cursor-pointer 
                       bg-gradient-to-r from-white via-purple-500 to-purple-900 
                       text-gray-900 hover:scale-105 transition-all duration-500 shadow-lg'
                    htmlFor='upload2'>
                    <img width={20} src={assets.upload_btn_icon} />
                    <p className='text-gray-900 text-sm font-medium'>Upload your image</p>
                </label>
            </div>

        </div>


    )
}

export default Upload
