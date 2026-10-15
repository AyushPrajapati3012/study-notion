import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom'
import { RiEyeCloseFill } from "react-icons/ri";
import { FaEye } from "react-icons/fa";
import { setLoading } from '../slices/authSlice';
import { BiArrowBack } from "react-icons/bi"
import { Link } from 'react-router-dom';
import { resetPassword } from '../services/operations/authApi';

const UpdatePassword = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [showPass, setShowPass] = useState(false);
    const [showConfirmPass, setShowConfirmPass] = useState(false);
    const { loading } = useSelector((state) => state.auth);
    const [formData, setFormData] = useState({
        password: '',
        confirmPassword: '',
    })

    const { password, confirmPassword } = formData;

    const handleOnChange = (e) => {
        setFormData((prevData) => (
            {
                ...prevData,
                [e.target.name]: e.target.value,
            }))
    }

    const handleOnSubmit = (e)=>{
        e.preventDefault();
        const token = location.pathname.split('/').at(-1);
        dispatch(resetPassword(password,confirmPassword,token,navigate));
    }
    return (
        <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
            {
                loading ? (
                    <div className='spinner'></div>
                ) : (
                    <div className="max-w-[500px] p-4 lg:p-8">
                        <h1 className="text-[1.875rem] font-semibold leading-[2.375rem] text-richblack-5">
                            Choose new password
                        </h1>
                        <p className="my-4 text-[1.125rem] leading-[1.625rem] text-richblack-100">
                            Almost done. Enter your new password and youre all set.
                        </p>
                        <form onSubmit={handleOnSubmit}>
                            <label className="relative">
                                <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                                    New Password <sup className="text-pink-200">*</sup> </p>
                                <input type={showPass ? 'text' : 'password'}
                                    required
                                    value={password}
                                    name='password'
                                    onChange={handleOnChange}
                                    placeholder="Enter Password"
                                    style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
              className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] pr-10 text-richblack-5"
                                />
                                <span onClick={() => setShowPass((prev) => !prev)}
                                    className="absolute right-3 top-[38px] z-[10] cursor-pointer"  >
                                    {showPass ? <FaEye fontSize={24} fill="#AFB2BF" /> :
                                        <RiEyeCloseFill fontSize={24} fill="#AFB2BF" />}
                                </span>
                            </label>

                            <label className="relative mt-3 block">
                                <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                                    Confirm New Password <sup className="text-pink-200">*</sup> </p>
                                <input type={showConfirmPass ? 'text' : 'password'}
                                    required
                                    value={confirmPassword}
                                    name='confirmPassword'
                                    onChange={handleOnChange}
                                    placeholder="Confirm Password"
                                    style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
              className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] pr-10 text-richblack-5"
                                />
                                <span onClick={() => setShowConfirmPass((prev) => !prev)}
                                    className="absolute right-3 top-[38px] z-[10] cursor-pointer"  >
                                    {showConfirmPass ? <FaEye fontSize={24} fill="#AFB2BF" /> :
                                        <RiEyeCloseFill fontSize={24} fill="#AFB2BF" />}
                                </span>
                            </label>
                            <button
                                type="submit"
                                className="mt-6 w-full rounded-[8px] bg-yellow-50 py-[12px] px-[12px] font-medium text-richblack-900"
                            >
                                Reset Password
                            </button>
                        </form>
                        <div className="mt-6 flex items-center justify-between">
                            <Link to="/login">
                                <p className="flex items-center gap-x-2 text-richblack-5">
                                    <BiArrowBack /> Back To Login
                                </p>
                            </Link>
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default UpdatePassword
