'use client'
import React, {useRef} from 'react'
// import { useMenuContext } from '@/context/MenuContext'
import Link from 'next/link'

function Faq() {
    // const { isOpen } = useMenuContext(); 
    const paragraphRefs = useRef([]);
    const listQuestion = ["large items", "assembled", "limitation", "priority", "idea", "environmental issues"];
    const paragraphes = [
        {
            id: '1',
            title: 'WHY AN FAQ RESOURCE?',
            discreption:'Firstly, FAQ pages can bring new visitors to your website via organic search and drive them quickly to related pages – most typically deeper blog pages and service pages closely related to the questions being resolved. Next, one of the most significant opportunities for impactful brand visibility within the search engine result pages (in-SERP) is targeting audience questions, wants, needs, and pain points.'
        },
        {
            id: '2',
            title: 'WIS THERE ANY LIMITATION ON THE QUANTITY OR AMOUNT OF ONLINE PURCHASE?',
            discreption:'No, there is no limit. The quantity that you can buy is depending on the available stock of the online purchase.'
        },
        {
            id: '3',
            title: 'HOW CAN I GET LARGE ITEMS HOME?',
            discreption:'Most Comfy products are flat-packed, making them easy to transport. The Comfy store offers (or will refer you to) a home delivery service if you prefer. Home delivery is not included in the product price.'
        },
        {
            id: '4',
            title: 'WHY ARE ITEMS SOMETIMES OUT OF STOCK?',
            discreption:'Every effort is made to maintain the availability of items shown in the catalogue, but due to popularity and supply issues, some products may not always be available. Generally, Comfy can estimate when a product should be back in stock. Because Comfy products are manufactured throughout the world, there are sometimes circumstances which can cause delivery delays'
        },
        {
            id: '5',
            title: 'WHAT IF I WANT TO HAVE THE PRODUCTS ASSEMBLED?',
            discreption:'Comfy products are generally easy to assemble and require no special tools. If you prefer, most Comfy stores can refer you to a reputable, reasonably priced assembly company that can come to your home to assemble and install our products.'
        },
        {
            id: '6',
            title: 'IS THERE ANY LIMITATION ON THE QUANTITY OR AMOUNT OF ONLINE PURCHASE?',
            discreption:'No, there is no limit. The quantity that you can buy is depending on the available stock of the online purchase.'
        },
        {
            id: '7',
            title: 'WHY FAQ PAGES ARE A PRIORITY',
            discreption:'FAQ pages continue to be a priority area for SEO and digital marketing professionals. An FAQ page is one of the simplest ways to improve your site and help site visitors and users. Your FAQ section should be seen as a constantly expanding source of value provided to your audience. It is a place where their ever-changing and growing requirements are not only met but anticipated and exceeded frequently.'
        },
        {
            id: '8',
            title: 'WHAT IS THE COMFY BUSINESS IDEA?',
            discreption:'The Comfy business idea is: "We shall offer a wide range of well-designed, functional home furnishing products at prices so low that as many people as possible will be able to afford them."'
        },
        {
            id: '9',
            title: 'HOW DOES COMFY APPROACH ENVIRONMENTAL ISSUES?',
            discreption:'We\'re working to create a better environment outdoors as well as indoors.'
        },
    ]

    const handleLinkClick = (e, index) => {    
        e.preventDefault();        
        if (paragraphRefs.current && paragraphRefs.current[index]) {        
            const paragraphRef = paragraphRefs.current[index];            
            paragraphRef.scrollIntoView({ behavior: 'smooth', block: 'start' });            
        }        
    };    

  return (
      <section className=''>
          <div className='bg-bgCoverImage bg-cover h-[50vh]  flex items-center justify-center'>
              <div className='flex flex-col items-center justify-center space-y-3'>
                  <h1 className='font-bold text-5xl'>Faq</h1>
                  <ol className='flex space-x-2'>
                      <li className=''>
                          <Link href="/" className=''>home</Link>
                      </li>
                      <li className=''>
                          / Faq
                      </li>
                  </ol>
              </div>
          </div>
          <div className='grid grid-cols-12 gap-8 my-5 overflow-visible'>
              <div className='col-span-4 xs:col-span-12 space-y-16 px-3'>
                  <h1 className='text-4xl'>FREQUENTLY ASKED QUESTIONS</h1>
                  <p className='text-textColor mr-3 w-fit'>FAQ pages continue to be a priority area for SEO and digital marketing professionals. An FAQ page is one of the simplest ways to improve your site and help site visitors and users. Your FAQ section should be seen as a constantly expanding source of value provided to your audience.</p>
                  <ul className='space-y-2'>
                      {
                          listQuestion.map((item, index) => (
                              <li key={index} className=''>
                                  <Link href="" className='text-linkColor' onClick={(e) => handleLinkClick(e, index)}>
                                      {item}
                                  </Link>
                              </li>
                          ))
                      }
                  </ul>
              </div>
              <div className='col-span-8 xs:col-span-12 space-y-16 px-3'>
                  {
                      paragraphes.map((paragraphe, index) => (
                          <div className='space-y-3' key={paragraphe.id} ref={(el) => (paragraphRefs.current[index] = el)}>
                              <h2 className='font-medium text-lg text-transform: uppercase'>{paragraphe.id}-{paragraphe.title}</h2>
                              <p className='text-textColor mr-3 w-fit'>{paragraphe.discreption}</p>
                          </div>
                      ))
                  }
              </div>
          </div>

    </section>
  )
}

export default Faq