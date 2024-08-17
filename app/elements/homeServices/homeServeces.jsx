'use client'
import React from 'react'
import { FaCube } from "react-icons/fa";
import { FaRegCreditCard } from "react-icons/fa";
import { FaArrowsRotate } from "react-icons/fa6";

const serveces = [
    { icon: FaCube, title: 'Free Worldwide Shipping', price: 'On all orders over $75.00' },
    { icon: FaRegCreditCard, title: '100% Payment Secure', price: 'We ensure secure payment with PEV' },
    { icon: FaArrowsRotate, title: '30 Days Return', price: 'Return it within 20 day for an exchange' },    
]
function HomeServeces() {
  return (
      <div className='flex xs:flex-col px-6 my-6'>
          {
              serveces.map((item, index) => (
                  <div className='flex flex-col flex-1 items-center justify-center space-y-3 py-6' key={index}>
                      <item.icon className='text-3xl' />
                      <h3 className='font-bold'>{item.title}</h3>
                      <p className=' text-textColor'>{item.price}</p>
                  </div>
              ))
          }
    </div>
  )
}

export default HomeServeces