import React from 'react'
import { assets, plans } from '../assets/assets'
import { useContext } from 'react'
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@clerk/clerk-react'
import { toast } from 'react-toastify';
import axios from 'axios'


const BuyCredit = () => {

  const { backendUrl, loadCreditsData } = useContext(AppContext);

  const navigate = useNavigate();

  const { getToken } = useAuth();

  // function for initialise the payment
  const initPay = async (order) => {

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: 'Credits Payment',
      description: "Credits Payment",
      order_id: order.id,
      receipt: order.receipt,
      handler: async (response) => {
        console.log(response)

        const token = await getToken()

        try {

          const { data } = await axios.post(backendUrl + '/api/user/verify-razor', response, { headers: { token } })
          if (data.success) {
            loadCreditsData()
            navigate('/')
            toast.success('Credit Added')
          }

        } catch (error) {
          console.log("Error in initPay handler function")
          toast.error(error.message)
        }
      }
    }

    const rzp = new window.Razorpay(options)
    rzp.open()

  }

  const paymentRazorpay = async (planId) => {
    try {

      const token = await getToken();
      const { data } = await axios.post(backendUrl + '/api/user/pay-razor', { planId }, { headers: { token } })
      if (data.success) {
        initPay(data.order);
      }

    } catch (error) {
      console.log("Error in paymentRazorpay of buyCredit.jsx");
      toast.error(error.message);
    }
  }

  return (
    <div className='min-h-[80vh] text-center pt-14 mb-10'>

      {/* Button */}
      <button className='border border-purple-600 px-10 py-2 rounded-full mb-6 
                   text-white bg-gradient-to-r from-purple-600 via-purple-500 to-pink-500 
                   hover:scale-105 transition-all duration-500'>
        Our Plans
      </button>


      {/* Heading */}
      <h1 className='text-center text-2xl md:text-3xl lg:text-4xl mt-4 font-semibold 
                 bg-gradient-to-r from-white via-purple-400 to-purple-700 
                 bg-clip-text text-transparent mb-6 sm:mb-10'>
        Choose the plan that's right for you
      </h1>

      {/* Plan Cards */}
      <div className='flex flex-wrap justify-center gap-6 text-left'>
        {plans.map((item, index) => (
          <div className='bg-gradient-to-b from-gray-200 via-black to-purple-900 
                      drop-shadow-lg border border-gray-400 rounded-lg py-12 px-8 
                      text-gray-100 hover:scale-105 transition-all duration-500' key={index}>

            <img width={40} src={assets.logo_icon2} />
            <p className='mt-3 font-semibold text-white'>{item.id}</p>
            <p className='text-sm text-gray-300'>{item.desc}</p>
            <p className='mt-6'>
              <span className='text-3xl font-medium text-white'>${item.price}</span>/ {item.credits} credits
            </p>
            <button onClick={() => paymentRazorpay(item.id)} className='w-full bg-gradient-to-r from-purple-600 via-purple-500 to-pink-500 
                           text-white mt-8 text-sm rounded-md py-2.5 min-w-52 hover:scale-105 transition-all duration-700'>
              Purchase
            </button>

          </div>
        ))}
      </div>
    </div>

  )
}

export default BuyCredit