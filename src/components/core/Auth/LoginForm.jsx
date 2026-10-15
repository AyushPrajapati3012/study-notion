import React, { useState } from 'react'
import { RiEyeCloseFill } from "react-icons/ri";
import { FaEye } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../../../services/operations/authApi'

const LoginForm = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [formData,setFormData] = useState({
        email:"",
        password:"",
    });

    const [showPassword,setShowPassword] = useState(false);

    const changeHandler = (e) =>{
        setFormData((prevData) => ({
            ...prevData,
            [e.target.name]: e.target.value,
        }))
    }
    const submitHandler = (e)=>{
        e.preventDefault();
        console.log('form data ',formData)
        dispatch(login(formData.email,formData.password,navigate));
    }

  return (
    <form 
    onSubmit={submitHandler}
    className='mt-6 flex w-full flex-col gap-y-4 '
    >
        <label className='w-full'>
            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                Email Address <sup className='text-pink-400'>*</sup></p>
            <input
            required
            type="text" 
            name="email"
            value={formData.email}
            onChange={changeHandler}
            placeholder="Enter email address"
            style={{
            boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
          }}
          className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
            />
        </label>
        <label className='relative'>
            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                Password <sup className='text-pink-400'>*</sup></p>
            <input
            required
            type= {showPassword ? 'text' : 'password'}
            name="password"
            value={formData.password}
            onChange={changeHandler}
            placeholder="Enter password"
            style={{
            boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
          }}
          className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] pr-12 text-richblack-5"
            />
            <span
                onClick={() => setShowPassword(prev => !prev)}
                className='absolute right-3 top-[38px] z-[10] cursor-pointer '
            >
                {
                    showPassword ? <FaEye fontSize={24} fill="#AFB2BF"/> : 
                    <RiEyeCloseFill fontSize={24} fill="#AFB2BF"/>
                }
            </span>
            <Link to='/forgot-password'>
                <p className='mt-1 ml-auto text-blue-100 text-xs max-w-max'>
                    Forgot Password
                </p>
            </Link>
        </label>
        <button
        type="submit"
        className="mt-6 rounded-[8px] bg-yellow-50 py-[8px] px-[12px] font-medium text-richblack-900"
      >
        Sign In
      </button>
    </form>
  )
}

export default LoginForm
