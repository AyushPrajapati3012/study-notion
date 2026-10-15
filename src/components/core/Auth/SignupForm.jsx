import React, { useState } from 'react'
import Tab from '../../common/Tab';
import { ACCOUNT_TYPE } from '../../../utils/constants';
import { preconnect } from 'react-dom';
import { RiEyeCloseFill } from "react-icons/ri";
import { FaEye } from "react-icons/fa";
import toast from 'react-hot-toast';
import { setSignupData } from '../../../slices/authSlice';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { sendOtp } from '../../../services/operations/authApi';


const SignupForm = () => {
  
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData,setFormData] = useState({
    firstName:"",
    lastName:"",
    email:"",
    password:"",
    confirmPassword:"",
  })
  const [showPass,setShowPass] = useState(false);
  const [showConfirmPass,setShowConfirmPass] = useState(false);
  const[accountType,setAccountType] = useState(ACCOUNT_TYPE.STUDENT);

  const tabData = [
    {
      id: 1,
      tabName: "Student",
      type: ACCOUNT_TYPE.STUDENT,
    },
    {
      id: 2,
      tabName: "Instructor",
      type: ACCOUNT_TYPE.INSTRUCTOR,
    },
  ]

  const handleOnChange = (e)=>{
    setFormData((prevData)=>(
     { ...prevData,
      [e.target.name]:e.target.value,}
    ))
  }

  const handleOnSubmit = (e)=>{
    e.preventDefault();

    if(formData.password !== formData.confirmPassword){
      toast.error("Passwords Do Not Match")
      return
    }

    const signupData = {
      ...formData,
      accountType
    }

    //set signup data
    dispatch(setSignupData(signupData))

    dispatch(sendOtp(formData.email,navigate))

    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    })
    setAccountType(ACCOUNT_TYPE.STUDENT)
  }
  return (
    <div>
      {/* tab */}
      <Tab tabData={tabData} field = {accountType} setField={setAccountType}></Tab>

      {/* form  */}
      <form onSubmit={handleOnSubmit} 
      className='flex flex-col w-full gap-y-4'>
        {/* firstname last name  */}
        <div className='flex gap-x-4 '>
          <label>
            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
              First Name <sup className="text-pink-200">*</sup></p>
            <input type="text" 
            required
            value={formData.firstName}
            name="firstName"
            onChange={handleOnChange}
            placeholder="Enter first name"
              style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
              className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
            />
          </label>
          <label>
            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
              Last Name <sup className="text-pink-200">*</sup></p>
            <input type="text" 
            required
            value={formData.lastName}
            name="lastName"
            onChange={handleOnChange}
            placeholder="Enter last name"
              style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
              className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
            />
          </label>
        </div>
        
        {/* email  */}
        <label className="w-full">
          <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
            Email Address <sup className="text-pink-200">*</sup>
          </p>
          <input
            required
            type="text"
            name="email"
            value={formData.email}
            onChange={handleOnChange}
            placeholder="Enter email address"
            style={{
              boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
            }}
            className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
          />
        </label>
        {/* pass confPass  */}
          <div className="flex gap-x-4">
            <label className="relative" >
              <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                  Create Password <sup className="text-pink-200">*</sup>
              </p>
              <input type={showPass ? 'text' : 'password'} 
                required
                value={formData.password}
                name='password'
                onChange={handleOnChange}
                placeholder="Enter Password"
              style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
              className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] pr-10 text-richblack-5"
              />
              <span onClick={()=>setShowPass((prev)=>!prev)}
              className="absolute right-3 top-[38px] z-[10] cursor-pointer"  >
                {showPass ? <FaEye fontSize={24} fill="#AFB2BF"/> : 
                                    <RiEyeCloseFill fontSize={24} fill="#AFB2BF"/>}
              </span>
            </label>

            <label className="relative" >
              <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                  Confirm Password <sup className="text-pink-200">*</sup>
              </p>
              <input type={showConfirmPass ? 'text' : 'password'} 
                required
                value={formData.confirmPassword}
                name='confirmPassword'
                onChange={handleOnChange}
                placeholder="Enter Confirm Password"
              style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
              className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] pr-10 text-richblack-5"
              />
              <span onClick={()=>setShowConfirmPass((prev)=>!prev)}
              className="absolute right-3 top-[38px] z-[10] cursor-pointer"  >
                {showConfirmPass ? <FaEye fontSize={24} fill="#AFB2BF"/> : 
                                    <RiEyeCloseFill fontSize={24} fill="#AFB2BF"/>}
              </span>
            </label>
          </div>
          <button type="submit"
          className="mt-6 rounded-[8px] bg-yellow-50 py-[8px] px-[12px] font-medium text-richblack-900">
            Create Account
          </button>
      </form>

    </div>
  )
}

export default SignupForm
