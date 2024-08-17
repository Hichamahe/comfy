"use client"
import Link from 'next/link'

import { useMenuContext } from '@/context/MenuContext';

function Menu({ listItems }) {
  const { isOpen, setIsOpen } = useMenuContext();

  const closeMenu = () => {
    setIsOpen(false);
  }

  return (              
            <div className={`overflow-hidden transition-all duration-700 ${isOpen ? 'max-h-96' : 'max-h-0'}`}>
              <ul className='space-y-4 my-2 w-full h-full flex flex-col pl-4'>
              {
                listItems.map((item, index) => (
                  <li
                    key={index}
                    className='w-full flex'
                  >
                    <Link
                      href={item === 'home' ? '/' : `/${item}`}
                      onClick={closeMenu}
                      className='w-full text-primaryColor hover:text-mainColor focus:text-mainColor capitalize font-medium'>
                      {item}
                    </Link>
                  </li>
                ))
              }
              </ul>     
            </div>        
  )
}

export default Menu