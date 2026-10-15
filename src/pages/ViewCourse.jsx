import React, { useEffect, useState } from 'react'
import VideoDetailsSidebar from '../components/core/ViewCourses/VideoDetailsSidebar'
import { Outlet, useParams } from 'react-router-dom'
import CourseReviewModal from '../components/core/ViewCourses/CourseReviewModal'
import { useDispatch, useSelector } from 'react-redux'
import { getFullDetailsOfCourse } from '../services/operations/courseDetailsApi'

import {
  setCourseSectionData,
  setCompletedLectures,
  setEntireCourseData,
  setTotalNoOfLectures,
} from '../slices/viewCourseSlice'


const ViewCourse = () => {

  const {courseId} = useParams()
  const {token} = useSelector((state)=>state.auth)
  const dispatch = useDispatch()
  const [reviewModal,setReviewModal] = useState(false)

  useEffect(()=>{
    const fetchCourseData = async()=>{
      try{
        const courseData = await getFullDetailsOfCourse(courseId,token)
        console.log('courseData',courseData)
        dispatch(setCourseSectionData(courseData.courseDetails.courseContent))
        dispatch(setEntireCourseData(courseData.courseDetails))
        dispatch(setCompletedLectures(courseData.completedVideos))
        let lectures = 0
        courseData?.courseDetails?.courseContent?.forEach((sec)=>{
          lectures += sec.subSection.length
        })
        dispatch(setTotalNoOfLectures(lectures))
      }catch(error){
        console.error(error)
      }
    }
    fetchCourseData()
  },[])

  return (
    <>
      <div className="relative flex min-h-[calc(100vh-3.5rem)]">
        <VideoDetailsSidebar setReviewModal={setReviewModal}></VideoDetailsSidebar>
        <div className="h-[calc(100vh-3.5rem)] flex-1 overflow-auto">
          <div className="mx-6">
            <Outlet />
          </div>  
        </div>
      </div>
      {reviewModal && <CourseReviewModal setReviewModal={setReviewModal} />}
    </>
  )
}

export default ViewCourse
