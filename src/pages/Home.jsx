import React from 'react'
import { FaArrowRight } from "react-icons/fa";
import { Link } from 'react-router-dom';
import HighlightText from '../components/core/HomePage/HighlightText';
import CTAButton from '../components/core/HomePage/Button';
import Banner from '../assets/Images/banner.mp4';
import CodeBlocks from '../components/core/HomePage/CodeBlocks';
import TimelineSection from '../components/core/HomePage/TimelineSection';
import LearningLanguageSection from '../components/core/HomePage/LearningLanguageSection';
import Instructor from '../components/core/HomePage/Instructor'
import ExploreMore from '../components/core/HomePage/ExploreMore';
import Footer from '../components/common/Footer';
import Navbar from '../components/common/Navbar';


const Home = () => {
  return (
    <div>
      {/* section 1 */}

      <div className="relative mx-auto flex flex-col w-11/12 max-w-maxContent text-white
      items-center justify-between ">
        
        <Link to={'/signup'}>
            <div className="group mt-16 p-1 mx-auto rounded-full bg-richblack-800 font-bold text-richblack-200
            transition-all duration-200 hover:scale-95 w-fit ">
                <div className=" flex px-10 py-[5px] items-center gap-2 rounded-full transition-all
                duration-200 group-hover:bg-richblack-900 ">
                    <p>Become an Instructor</p>
                    <FaArrowRight />
                </div>
            </div>
        </Link>

        <div className=' text-center text-4xl font-semibold mt-7 '>
            Empower Your Future with 
            <HighlightText text={'Coding Skills'}></HighlightText> 
        </div>

        <div className=' mt-4 w-[90%] text-center text-lg font-bold text-richblack-300 '>
            With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a wealth of resources, including hands-on projects, quizzes, and personalized feedback from instructors. 
        </div>

        <div className='flex flex-row gap-7 mt-8'>

            <CTAButton active={true} linkto={'/signup'}>
                Learn More    
            </CTAButton>

            <CTAButton active={false} linkto={'/login'}>
                Book a Demo
            </CTAButton>

        </div>

        <div>
            <div className=' mx-3 my-12 shadow-[10px_-5px_50px_-5px] shadow-blue-200 '>
            <video className='shadow-[20px_20px]' 
            muted loop autoPlay>
                <source src={Banner} type="video/mp4"/>
            </video>
            </div>
        </div>

        {/* section 1 */}
        <div>
            <CodeBlocks 
                position={"lg:flex-row"}
                heading = {
                    <div className='text-4xl font-semibold '>
                        Unlock your
                        <HighlightText text={'coding potential'}></HighlightText>
                        with our online course
                    </div>
                }
                subheading={
                    <div>
                        Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you.
                    </div>
                }
                ctabtn1={{
                    btnText: 'try it yourself',
                    link: '/signup',
                    active: true,
                }}
                ctabtn2={{
                    btnText: 'learn more',
                    link: '/login',
                    active: false,
                }}
                codeblock={`<!DOCTYPE html>\n<html>\nhead><title>Example</title>\n<linkrel="stylesheet"href="styles.css"></div>`}
                codeColor={'text-yellow-25'}
            ></CodeBlocks>
        </div>
        {/* section 2 */}
        <div>
            <CodeBlocks 
                position={"lg:flex-row-reverse"}
                heading = {
                    <div className='text-4xl font-semibold '>
                        Start
                        <HighlightText text={'coding in seconds'}></HighlightText>
                        
                    </div>
                }
                subheading={
                    <div>
                        Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson.
                    </div>
                }
                ctabtn1={{
                    btnText: 'Continue Lesson',
                    link: '/signup',
                    active: true,
                }}
                ctabtn2={{
                    btnText: 'learn more',
                    link: '/login',
                    active: false,
                }}
                codeblock={`<!DOCTYPE html>\n<html>\nhead><title>Example</title>\n<linkrel="stylesheet"href="styles.css"></div>`}
                codeColor={'text-yellow-25'}
            ></CodeBlocks>
        </div>

        <ExploreMore></ExploreMore>
        
      </div>

      {/* section 2 */}
        <div className='bg-pure-greys-5 text-richblack-700 '>
                <div className='homepage_bg h-[310px]'>
                    
                    <div className='w-11/12 max-w-maxContent flex flex-col items-center justify-center gap-5 mx-auto '>
                    <div className='h-[150px]'></div>
                        <div className='flex gap-7 items-center justify-center'>
                            <CTAButton active={true} linkto={'/signup'}>
                                <div className='flex items-center gap-2'>
                                    Explore Full Catalog
                                    <FaArrowRight></FaArrowRight>
                                </div>
                            </CTAButton>
                            <CTAButton active={false} linkto={'/signup'}>
                                <div className='text-white'>Learn More</div>
                            </CTAButton>
                        </div>
                    </div> 

                </div>

                <div className='mx-auto w-11/12 max-w-maxContent flex flex-col items-center justify-between gap-7'>

                    <div className=' flex flex-row gap-5 mb-10 mt-[95px] '>
                        <div className='text-4xl font-semibold w-[45%] '>
                            Get the Skills you need for a 
                            <HighlightText text={'Job that is in demand'}></HighlightText>
                        </div>

                        <div className='flex flex-col gap-10 w-[40%] items-start '>
                            <div className='text-[16px] '>
                                The modern StudyNotion is the dictates its own terms. Today, to be a competitive specialist requires more than professional skills.
                            </div>
                            <CTAButton active={true} linkto={'/signup'}>
                                Learn More
                            </CTAButton>
                        </div>

                    </div>


                    <TimelineSection></TimelineSection>
                    <LearningLanguageSection></LearningLanguageSection>

                </div>


        </div>

      {/* section 3 */}
            
        <div className='w-11/12 mx-auto max-w-maxContent flex-col items-center justify-between gap-8 first-letter bg-richblack-900 text-white'>

            <Instructor></Instructor>
            
            <h2 className=' text-3xl text-center mx-auto font-semibold mt-10'>Review from other learners</h2>
            {/* Review Slider here */}

        </div>

      {/* footer */}
        <Footer></Footer>
    </div>
  )
}

export default Home
