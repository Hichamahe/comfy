import React from 'react'
import Image from 'next/image';
import image1 from '../../../public/images/axios.png'
import image2 from '../../../public/images/dark-universe.png'
import image3 from '../../../public/images/ra.png'
import image4 from '../../../public/images/tidy.png'
import image5 from '../../../public/images/gitlab.png'

  const images = [
    { src: image1},
    { src: image2},
    { src: image3},
    { src: image4 },
    { src: image5}
];
    
function Brands() {
  return (
    <div className='my-5 flex px-3'>
      <ul className='flex'>
        {
          images.map((image, index) => (
            <li className='w-full' key={index}>
              <Image src={image.src} alt={image} width='auto' height='auto' fill={false} property="true" />
            </li>
          ))
        }
      </ul>
    </div>
  )
}

export default Brands