import React from 'react'
import Instructopng from '../../../assets/Images/Instructor.png'
import HighlightText from './HighlightText'
import CTAButton from './Button'
import { FaArrowRight } from 'react-icons/fa'
const Instructor = () => {
  return (
    <div className='mt-16'>
        <div className='flex fext-row gap-20 items-center '>
            <div className='w-[50%] '>
            <img src={Instructopng} alt="" className='shadow-white'/>
            </div>
            <div className='flex flex-col gap-10 w-[50%] '>
                <div className='text-4xl font-semibold text-white w-[50%]'>
                    <p>Become an</p>
                    <HighlightText text={'Instructor'}></HighlightText>
                </div>
                <div className='font-medium text-[16px] w-[80%] text-richblack-300'>
                    Instructors from around the world teach millions of students on StudyNotion. We provide the tools and skills to teach what you love.
                </div>
                
                <div className='w-fit'>
                    <CTAButton active={true} linkto={'/signup'}>
                        <div className='flex gap-2 items-center'>
                            <p>Start Teaching Today</p>
                            <FaArrowRight></FaArrowRight>
                        </div>
                    </CTAButton>
                    </div>
            </div>
        </div>
    </div>
  )
}

export default Instructor
