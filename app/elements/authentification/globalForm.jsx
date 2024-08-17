'use client'
import {useState} from 'react';
import RegisterForm from './registerForm';
import LoginForm from './loginForm';
import { AiOutlineClose } from 'react-icons/ai';
import { useMenuContext } from '@/context/MenuContext';


function GlobalForm() {
  const [showLoginForm, setShowLoginForm] = useState(true);
  const { isAccountOpen, setIsAccountOpen } = useMenuContext();

  const handleAccountClick = () => {
    setIsAccountOpen(!isAccountOpen)
  }

  const handleLoginClick = () => {
    setShowLoginForm(true);
  };

  const handleRegisterClick = () => {
    setShowLoginForm(false);
  };

  return (
    <div className={`${isAccountOpen ? '' : 'hidden'}`}>
    <div className='flex items-center justify-center h-full w-full overflow-x-hidden overflow-y-auto fixed top-0 outline-0 z-fourth-Zindex bg-bgColor left-0 '>
          <div className='bg-white z-Fifth-Zindex space-y-2 rounded-md p-6 w-[600px] md:w-[500px] sm:w-[450px] xs:w-11/12 max-h-[505px]'>
              <div className='space-y-2'>
                  <div className='flex items-center justify-end '>
                      <AiOutlineClose className='text-xl font-bold cursor-pointer' onClick={handleAccountClick}/>
                  </div>
                  <div className='flex'>          
            <button
              className={`flex-1 flex items-center justify-center font-bold border-b-2 p-2 ${showLoginForm ? 'text-mainColor  border-b-mainColor' : 'border-b-slate-300'}`}
              onClick={handleLoginClick}>
              Login
            </button>
            <button
              className={`flex-1 flex items-center justify-center font-bold border-b-2 p-2 ${!showLoginForm ? 'text-mainColor border-b-mainColor' : 'border-b-slate-300'}`}
              onClick={handleRegisterClick}>
              Register
            </button>
                  </div>
              </div>
        {showLoginForm ? <LoginForm handleAccountClick={handleAccountClick}/> : <RegisterForm handleLoginClick={handleLoginClick} />}
          </div>
      </div>
      </div>
  )
}

export default GlobalForm