"use client"
import Image  from 'next/image'
import React, {useState, useEffect} from 'react'
// import { useMenuContext } from '@/context/MenuContext'
import image from '../../../public/images/main-about.jpg'
import Link from 'next/link'

function ElementWithText({ text, onClick }) {
  return <div onClick={onClick}>{text}</div>;
}

function About() {
    // const { isOpen } = useMenuContext();    
    const [selectedElement, setSelectedElement] = useState(null);    
    const [selectedCategory, setSelectedCategory] = useState(null);    

    const elements = [  
        {          
            id: 1,            
            category: 'History',
            text: 'Our company was founded in 2019 by a group of young designers who were passionate about creating modern, affordable furniture. They started out with a small line of minimalist furniture, including tables, chairs, and sofas, that quickly gained popularity among design enthusiasts.\n\nIn 2020, we launched an online store and began shipping our furniture all over the world. We also expanded our product line to include home decor items, such as wall art and lighting, which helped to attract a wider audience.\n\nToday, our company continues to grow and thrive, thanks to our commitment to innovation, affordability, and sustainability. We remain dedicated to providing our customers with beautiful, functional furniture that enhances their homes and lives, while also making a positive impact on the environment.'
        },
        {
            id: 2,
            category: 'Mission',
            text: 'Our mission is to combine beautiful design with high-quality craftsmanship, while also minimizing our impact on the environment. To achieve this, we embrace the following core values: \n\nInnovation: We are constantly pushing the boundaries of design and manufacturing, using technology and creativity to create furniture that is both functional and beautiful.\n\nAffordability: We believe that high-quality, stylish furniture should be accessible to everyone. That\'s why we strive to keep our prices affordable, without compromising on quality or design.\n\nCustomer Focus: We prioritize the needs and preferences of our customers, and strive to create furniture that is tailored to their unique style and needs.'
        },
        {
            id: 3,
            category: 'Design',
            text: 'At our company, we believe that great design should be both beautiful and functional. Our approach to furniture design is centered around the following principles: \n\nSimplicity: We believe that furniture should be simple and uncluttered, with clean lines and minimal ornamentation. We strive to create furniture that is both timeless and contemporary, so that it can fit seamlessly into any home or office environment. \n\nFunctionality: We design furniture with the user in mind, prioritizing functionality and comfort. We believe that furniture should not only look great, but also serve a purpose and make people\'s lives easier and more comfortable. \n\nCustomization: We understand that every person\'s taste and style is unique, and we offer customization options to allow our customers to create furniture that truly reflects their individual preferences and needs.'
        }
    ];

    useEffect(() => {
        setSelectedCategory('History');
    }, []);

    const handleClick = (elementId) => {      
        setSelectedElement(elementId === selectedElement ? null : elementId);        
    };    

    const handleCategoryClick = (category) => {      
        setSelectedCategory(category === selectedCategory ? null : category);        
        setSelectedElement(null);         
    };    
    
    const renderSections = (text) => {    
  if (!text) return null; 
        const parts = text.split('\n\n');        
        return parts.map((part, index) => (      
            <div key={index} className=' '>                
                <ElementWithText                    
                    text={part}                    
                    onClick={() => handleClick(index + 1)}               
                />                
            </div>            
        ));        
    };    
    
  return (
      <section className={``}>
          <div className='bg-bgCoverImage bg-cover h-[50vh]  flex items-center justify-center'>
              <div className='flex flex-col items-center justify-center space-y-3'>
                  <h1 className='font-bold text-5xl'>About</h1>
                  <ol className='flex space-x-2'>
                      <li className=''>
                          <Link href="/" className=''>home</Link>
                      </li>
                      <li className=''>
                          / About
                      </li>
                  </ol>
              </div>
          </div>

          <div className='flex gap-4 p-8 sm:flex-col xs:flex-col'>
              <div className='flex-1'>
                  <Image src={image} alt={image} priority={true} className='w-full h-auto'/>
              </div>
              <div className='flex-1'>                  
                  {elements.map(element => (          
                      <button                          
                          key={element.category}                          
                          onClick={() => handleCategoryClick(element.category)}
                          className={`w-[33%] p-2 bg-m rounded-t-md border-b mb-3 ${selectedCategory === element.category ? 'bg-mainbgColor text-white' : ''}`}
                      >                          
                          {element.category}                          
                      </button>                      
                  ))}                  

                  {selectedCategory === null                      
                      ? elements.map(element => (      
                          <div key={element.category}>                              
                              {renderSections(element.text)}                              
                          </div>                          
                      ))                      
                      : elements                          
                          .filter(element => element.category === selectedCategory)                          
                          .map(element => (          
                              <div key={element.category} className='space-y-2'>                                  
                                  {renderSections(element.text)}                                  
                              </div>                              
                          ))                      
                  }                  
               
                  {selectedElement !== null && (                      
                      <div>Texte affiché : {elements.find(element => element.id === selectedElement).text}</div>                      
                  )}                  
              </div>                
          </div>
          
          <div className='bg-zinc-100 flex flex-col items-center justify-center p-10 space-y-10'>
              <div className=''>
                  <h1 className='font-medium text-4xl text-center'>WHAT THEY&apos;RE SAYING</h1>
              </div>
              <div className=''>
                  <p className='text-center'>
                      &rdquo;I recently purchased a sectional sofa from Comfy, and I couldn&apos;t be happier with my experience. The process of ordering online was so easy and stress-free, and the customer service team was incredibly helpful when I had some questions about delivery. When the sofa arrived, I was blown away by how comfortable it was. The cushions were so plush and cozy, and the fabric was soft to the touch. It&apos;s now become my favorite spot to relax and unwind at the end of the day. I highly recommend Comfy to anyone looking for stylish and comfortable furniture&rdquo;
                  </p>
              </div>
              <div className='flex flex-col items-center justify-center'>
                  <span className='font-medium'>HICHAM AHANDAM</span>
                  <span className='font-medium'>Analyst</span>
              </div>
          </div>
      </section>        
  )
}

export default About