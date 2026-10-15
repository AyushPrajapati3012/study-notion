import { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Navbar from './components/common/Navbar'
import Login from './pages/Login'
import Signup from './pages/Signup'
import VerifyEmail from './pages/VerifyEmail'
import ForgotPassword from './pages/ForgotPassword'
import UpdatePassword from './pages/UpdatePassword'
import About from './pages/About'
import Dashboard from './pages/Dashboard'
import MyProfile from './components/core/Dashboard/MyProfile'
import PrivateRoute from './components/core/Auth/PrivateRoute'
import Error from './pages/Error'
import Settings from './components/core/Dashboard/Settings'
import EnrolledCourses from './components/core/Dashboard/EnrolledCourses'
import { useSelector } from 'react-redux'
import { ACCOUNT_TYPE } from './utils/constants'
import Cart from './components/core/Dashboard/Cart'
import AddCourse from './components/core/Dashboard/AddCourse'
// import OpenRoute from './components/core/Auth/OpenRoute' 
import MyCourses from './components/core/Dashboard/MyCourses'
import Catalog from './pages/Catalog'
import CourseDetails from './pages/CourseDetails'
import ViewCourse from './pages/ViewCourse'
import VideoDetails from './components/core/ViewCourses/VideoDetails'

function App() {
  const { user } = useSelector((state) => state.profile)

  return (
    <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter">
      <Navbar></Navbar>
      <Routes>
        <Route path='/' element={<Home></Home>}></Route>
        <Route path='/login' element={<Login></Login>}></Route>
        <Route path='/signup' element={<Signup></Signup>}></Route>
        <Route path='/verify-email' element={<VerifyEmail></VerifyEmail>}></Route>
        <Route path='/forgot-password' element={<ForgotPassword></ForgotPassword>}></Route>
        <Route path='/update-password/:id' element={<UpdatePassword></UpdatePassword>}></Route>
        <Route path='/about' element={<About></About>}></Route>
        <Route path='catalog/:catalogName' element={<Catalog></Catalog>}></Route>
        <Route path='courses/:courseId' element={<CourseDetails></CourseDetails>}></Route>
        <Route element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }>
          <Route path='dashboard/my-profile' element={<MyProfile />}></Route>
          <Route path='dashboard/settings' element={<Settings />}></Route>
          {
            user?.accountType === ACCOUNT_TYPE.STUDENT && (
              <>
                <Route path='dashboard/cart' element={<Cart />} ></Route>
                <Route path="dashboard/enrolled-courses" element={<EnrolledCourses />} />

              </>
            )
          }
          {
            user?.accountType === ACCOUNT_TYPE.INSTRUCTOR && (
              <>
                <Route path='dashboard/add-course' element={<AddCourse />} ></Route>
                <Route path="dashboard/my-courses" element={<MyCourses />} />
              </>
            )
          }
        </Route>
        <Route
          element={
            <PrivateRoute>
              <ViewCourse></ViewCourse>
            </PrivateRoute>
          }
          >
            {
              user?.accountType === ACCOUNT_TYPE.STUDENT && (
                <>
                  <Route
                    path='view-course/:courseId/section/:sectionId/sub-section/:subSectionId' 
                    element={<VideoDetails></VideoDetails>}
                  >
                  </Route>
                </>
              )
            }
        </Route>
        <Route path='*' element={<Error />}></Route>

      </Routes>
    </div>
  )
}

export default App
