'use client'
import React, { useState } from 'react'
import { BiHide, BiShow } from "react-icons/bi"
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import './inputStyle.css'
import Loading from '../loading/loading'



function RegisterForm({ handleLoginClick }) {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [validEmail, setValidEmail] = useState("")
  const [phone, setPhone] = useState("morocco")
  const [phoneError, setPhoneError] = useState("")
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [showpassword, setShowpassword] = useState(false);
  const [showconfpassword, setShowconfpassword] = useState(false);

  const isValidEmail = (email) => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (name === '') {
    setNameError('please enter your full name');
    } else {
      setNameError('');
    }

    if (email === '') {
    setEmailError('please enter your email adress');
    } else {
      setEmailError('');
    }
    
    if (email !== '' && !isValidEmail(email)) {
      setValidEmail('please enter a valid email');
    }else {
      setValidEmail('');
    }

    if (phone === '') {          
    setPhoneError('please enter your phone number');
    } else {
      setPhoneError('');
    }

    if (password === '') {
      setPasswordError('please enter a password');
    } else {
      setPasswordError('');
    }

    if (confirmPassword === '') {
      setConfirmPasswordError('please confirm a password');
    } else {
      setConfirmPasswordError('');
    }

      if (password !== confirmPassword) {
    setConfirmPasswordError('Password do not match');
  } else {
    setConfirmPasswordError('');
  }

    if (name && email && phone && password && confirmPassword) {

      try {
        const res = await fetch("api/user", {
          method: 'POST',
          body: JSON.stringify({
            name, email, phone, password
          }),
          headers: {
            'Content-Type': 'application/json'
          }  
        });
        console.log(res)
        if (res.status === 409) {
          setEmailError('Email already exists')
        }
        else if (res.ok){
          const form = e.target;
          form.reset();
          handleLoginClick()
        }
      } catch (error) {       
        console.error(error)       
      }  finally {
          setLoading(false);          
    }   
    }
  }

  const togglepassword = ()=>{
    setShowpassword(!showpassword)
  }
  const toggleconfpassword = ()=>{
    setShowconfpassword(!showconfpassword)
  }

  return (
    <div className='overflow-y-auto h-[400px] space-y-4 p-1'>
    <form className='flex flex-col space-y-4' onSubmit={handleSubmit}>      
      <label className='text-slate-500 text-sm'>
        Full Name
        <span className='text-red-500'>*</span>
      </label>      
      <input
          type="text"
          autoComplete='FullName'
          className="rounded-md p-2 border text-sm"
          placeholder='Please entre your FullName'
          onChange={(e) => setName(e.target.value.toLowerCase())}  
      />
        {nameError && <p className="text-red-500">{nameError}</p>}
      <label className='text-slate-500 text-sm'>
        Email
        <span className='text-red-500'>*</span>
      </label>
      <input
          type="text"
          autoComplete='Email'
          className="rounded-md p-2 border text-sm"          
          placeholder='Please entre your email adress'
          onChange={(e) => setEmail(e.target.value.toLowerCase())}   
      />
        {emailError && <p className="text-red-500">{emailError}</p>}
        {validEmail && <p className="text-red-500">{validEmail}</p>}
      <label className='text-slate-500 text-sm'>
        Phone Number
        <span className='text-red-500'>*</span>
      </label>      
        <PhoneInput
          country={phone}          
          autoComplete='Phone Number'
          className="w-full"
          value={phone}
          placeholder='Please entre your phone number'
          onChange={(value) => setPhone(value)}
          countryCodeEditable={false}
        /> 
        {phoneError && <p className="text-red-500">{phoneError}</p>}  
      <label className='text-slate-500 text-sm'>
        Password
        <span className='text-red-500'>*</span>
      </label>
      <div className='relative'>
        <input          
            type={`${showpassword ? 'text' : 'password'}`}  
            autoComplete='Password'  
            className="rounded-md p-2 border text-sm w-full"
            placeholder='Please entre your Password'
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
      <label className='text-slate-500 text-sm'>
        Confirm Password
        <span className='text-red-500'>*</span>
      </label>
      <div className='relative'>
        <input
            type={`${showconfpassword ? 'text' : 'password'}`}
            autoComplete='Password'
            className="rounded-md p-2 border text-sm w-full"
            placeholder='Please Confirm your Password'
            onChange={(e) => setConfirmPassword(e.target.value.toLowerCase())}   
        />
        <span className='cursor-pointer z-Fifth-Zindex absolute right-0 transform translate-y-[11px] -translate-x-1' onClick={toggleconfpassword}>
          {
            showconfpassword ? 
              <BiShow className='text-slate-500' />
              :
              <BiHide className='text-slate-500' />
          }          
        </span>
        {confirmPasswordError && <p className="text-red-500">{confirmPasswordError}</p>}
      </div>
        <button
          className='bg-black text-white p-4 xs:p-2'
        >
          Create New Account
        </button>
    </form>

      <p className='flex items-center space-x-6 mx-2'>
        <span className='bg-slate-400 flex-1 h-[1px]'></span>
        <span className='text-slate-400'>Or</span>
        <span className='bg-slate-400 flex-1 h-[1px]'></span>
      </p>
      <button
        className='p-4 xs:p-2 hover:text-white hover:bg-mainColor transform duration-500 ease-out w-full mb-1'
        onClick={handleLoginClick}
      >
        Login
      </button>
    </div>
  )
}

export default RegisterForm