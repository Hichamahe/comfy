'use client'
import React, {useState} from 'react'
import { BiHide, BiShow } from "react-icons/bi"
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Googlebtn from './googlebtn';
import Loading from '../loading/loading';

function LoginForm({ handleAccountClick }) {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [validEmail, setValidEmail] = useState("")
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [authError, setAuthError] = useState("");
  const [showpassword, setShowpassword] = useState(false);

  const router = useRouter()

  const isValidEmail = (email) => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();    
    setLoading(true);    
    if (email === '') {
      setEmailError('please enter your Email address');
    } else {
      setEmailError('');
    }
    
    if (!isValidEmail(email) && !email === '') {
      setValidEmail('please enter a valid Email');
    }else {
      setValidEmail('');
    }

    if (password === '') {
      setPasswordError('please enter a password');
    } else {
      setPasswordError('');
        }
    
        try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
      if (res.error) {
        setAuthError("Incorrect email or password");
        return;
          }
          router.replace("/");
          handleAccountClick()
    } catch (error) {
      console.log(error);
        } finally {
          setLoading(false);          
    }      
  };

  const togglepassword = ()=>{
    setShowpassword(!showpassword)
  }

  return (
    <div className='overflow-y-auto h-[400px] space-y-4 p-1'>
      
      <form className='flex flex-col space-y-4' onSubmit={handleSubmit}>
        {authError && <p className="text-red-500">{authError}</p>}
        <label className='text-slate-500 text-sm'>
          Email
          <span className='text-red-500'>*</span>
        </label>      
      <input
          type="text"
          autoComplete='Email'
          className="rounded-md p-2 border text-sm"
          placeholder='entre your email adress'
          onChange={(e) => setEmail(e.target.value.toLowerCase())}    
      />
        {emailError && <p className="text-red-500">{emailError}</p>}
        {validEmail && <p className="text-red-500">{validEmail}</p>}
        <label className='text-slate-500 text-sm'>
          Password
          <span className='text-red-500'>*</span>
        </label>
        <div className='relative'>
          <input
            type={`${showpassword ? 'text' : 'password'}`}
            autoComplete='Password'
            className="rounded-md p-2 border text-sm w-full"
            placeholder='entre your password' 
            onChange={(e) => setPassword(e.target.value.toLowerCase())}  
          />
          <span
            className='cursor-pointer z-Fifth-Zindex absolute right-0 transform translate-y-[11px] -translate-x-1'
            onClick={togglepassword}>
            {
              showpassword ? 
                <BiShow className='text-slate-500' />
                :
                <BiHide className='text-slate-500' />
            }
          </span>
          {passwordError && <p className="text-red-500">{passwordError}</p>}
        </div>

      <button className='bg-black text-white p-4 xs:p-2'>Login</button>
     </form> 
      <p className='flex items-center space-x-6 mx-2'>
        <span className='bg-slate-400 flex-1 h-[1px]'></span>
        <span className='text-slate-400'>Or</span>
        <span className='bg-slate-400 flex-1 h-[1px]'></span>
      </p>
      <Googlebtn />
      {loading && <Loading />}
    </div>
  )
}

export default LoginForm