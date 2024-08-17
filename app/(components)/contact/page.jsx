'use client'
import React, {useState} from 'react'
import Link from 'next/link'
import { FaHeadphones } from "react-icons/fa6";
import { GiPositionMarker } from "react-icons/gi";
import { MdEmail, MdOutlineWatchLater } from "react-icons/md";
import Map from '@/app/elements/map/page';

function Contact() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')

    const sendEmail = async (e) => {
        e.preventDefault();

        const response = await fetch('/api/sendEmail', {                
            method: 'POST',            
            headers: {          
                'content-type': 'application/json'                
            },            
            body: JSON.stringify({          
                name,                
                email,          
                message          
            })                 
        })
        if (response.ok) {
            const form = e.target;
            form.reset();            
        }
    }    

  return (
      <section className={``}>
          <div className='bg-bgCoverImage bg-cover h-[50vh]  flex items-center justify-center'>
              <div className='flex flex-col items-center justify-center space-y-3'>
                  <h1 className='font-bold text-5xl'>Contact</h1>
                  <ol className='flex space-x-2'>
                      <li className=''>
                          <Link href="/" className=''>home</Link>
                      </li>
                      <li className=''>
                          / Contact
                      </li>
                  </ol>
              </div>
          </div> 
          <div className='grid grid-cols-12 gap-4 py-12 px-8'>
              <div className='col-span-8 xs:col-span-full space-y-5'>
                  <h2
                      className="relative py-4 before:content-[''] before:left-0 before:absolute before:h-[2px] before:bottom-[2px] before:bg-slate-300 before:w-full 
                      after:content-[''] after:left-0 after:absolute after:h-[2px] after:bottom-[2px] after:bg-mainbgColor after:w-2/6">
                      Get In Touch
                  </h2>
                  <form className='flex flex-col space-y-3' onSubmit={sendEmail}>
                      <input type='text' className='p-2 bg-slate-50 rounded-sm' placeholder='Name' onChange={(e) => { setName(e.target.value) }} />
                      <input type='email' className='p-2 bg-slate-50 rounded-sm' placeholder='Email' onChange={(e) => { setEmail(e.target.value) }}/>
                      <textarea type='text' className='p-2 bg-slate-50 rounded-sm' placeholder='Message' rows={5} onChange={(e) => { setMessage(e.target.value) }}/>
                      <button type='submit' className='p-2 bg-mainbgColor text-white'>Send Message</button>
                  </form>
              </div>
              <div className='col-span-4 xs:col-span-full space-y-5'>
                  <h2
                      className="relative py-4 before:content-[''] before:left-0 before:absolute before:h-[2px] before:bottom-[2px] before:bg-slate-300 before:w-full 
                      after:content-[''] after:left-0 after:absolute after:h-[2px] after:bottom-[2px] after:bg-mainbgColor after:w-2/6">
                      Contact info
                  </h2>
                  <div className='space-y-5'>
                      <div className='flex space-x-3 border-b py-4'>
                          <div className=''>
                              <GiPositionMarker className='text-4xl' />
                          </div>
                          <div className=''>
                              <h3 className='font-medium text-xl'>Address</h3>
                              <p className=''>20090 maarif casablanca, maroc </p>                              
                          </div>
                      </div>
                      <div className='flex space-x-3 border-b py-4'>
                          <div className=''>
                              <FaHeadphones className='text-4xl' />
                          </div>
                          <div className=''>
                              <h3 className='font-medium text-xl'>Phone</h3>
                              <p className=''>+212 669710265</p>
                          </div>
                      </div>  
                      <div className='flex space-x-3 border-b py-4'>
                          <div className=''>
                              <MdEmail className='text-4xl' />
                          </div>
                          <div className=''>
                              <h3 className='font-medium text-xl'>Email</h3>
                              <p className=''>comfyproject20@gmail.com</p>                              
                          </div>
                      </div>
                      <div className='flex space-x-3 border-b py-4'>
                          <div className=''>
                              <MdOutlineWatchLater className='text-4xl' />
                          </div>
                          <div className=''>
                              <h3 className='font-medium text-xl'>Opening Hours</h3>
                              <p className=''>Sun-Sat: 8.00am - 9.00.pm</p>                              
                          </div>
                      </div>                      
                  </div>
              </div>
              <div className='col-span-12 xs:col-span-full w-[100%] h-[50vh]'>
                  <Map />
              </div>
          </div>          
    </section>
  )
}

export default Contact