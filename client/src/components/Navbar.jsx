import React, { useContext, useEffect } from 'react'
import { assets } from '../assets/assets'
import { Link, useNavigate } from 'react-router-dom'
import { useClerk, UserButton, useUser } from '@clerk/clerk-react'
import { AppContext } from '../context/AppContext'

const Navbar = () => {

  const { openSignIn } = useClerk();
  const { isSignedIn, user } = useUser();
  const { credit, loadCreditsData } = useContext(AppContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (isSignedIn) {
      loadCreditsData()
    }
  }, [isSignedIn])

  return (
    <div className='flex items-center justify-between mx-4 py-3 lg:mx-44'>
      <Link to="/">
        <div className="flex items-center">
          <img
            className="w-14 sm:w-16 drop-shadow-lg filter brightness-110"
            src={assets.logo_icon2}
            alt="CutOutPro Logo"
          /> 

          <span
            className="relative -ml-2 translate-y-1 text-xl sm:text-2xl font-semibold italic text-gray-900"
            style={{ fontFamily: 'Times New Roman, Times, serif' }}
          >
            CutOutPro
          </span>
        </div>
      </Link>

      {
        isSignedIn
          ?
          <div className='flex items-center gap-2 sm:gap-3'>
            <button
              onClick={()=>navigate('/buy')}
              className='flex items-center gap-2 sm:gap-3 px-5 sm:px-7 py-1.5 rounded-full 
               bg-gradient-to-r from-white via-black to-purple-800 
               shadow-md hover:scale-105 transition-all duration-700'
            >
              <img className='w-5 sm:w-6' src={assets.credit_icon} alt="credits" />
              <p className='text-xs sm:text-sm font-medium text-gray-100'>
                Credits : {credit}
              </p>
            </button>
            <p className='max-sm:hidden font-medium text-gray-200'>
              Hi, {user.fullName}
            </p>
            <UserButton />
          </div>
          :
          <button onClick={() => openSignIn({})}
            className="bg-gradient-to-r from-white via-purple-500 to-purple-900 
                   text-gray-900 flex items-center gap-2 sm:gap-4 px-4 py-2 sm:px-6 sm:py-3 
                   text-sm sm:text-base rounded-full shadow-lg hover:scale-105 transition-all duration-500">
            Get Started
            <img
              src={assets.arrow_icon}
              alt=""
              className="w-4 sm:w-5"
            />
          </button>

      }
    </div>
  )
}

export default Navbar
