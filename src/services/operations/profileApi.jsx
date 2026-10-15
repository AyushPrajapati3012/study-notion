import { toast } from "react-hot-toast"

import { setLoading, setUser } from "../../slices/profileSlice"
import { apiConnector } from "../apiconnector"
import { profileEndpoints } from "../apis"
import { logout } from "./authApi"

const { GET_USER_DETAILS_API, GET_USER_ENROLLED_COURSES_API } = profileEndpoints

export async function getUserEnrolledCourses(token) {
    const toastId = toast.loading('Loading...')
    let result = []
    try {
        console.log("BEFORE Calling BACKEND API FOR ENROLLED COURSES");
        console.log("Token:", token);
        const response = await apiConnector(
            'GET',
            GET_USER_ENROLLED_COURSES_API,
            null,
            {
                Authorization: `Bearer ${token}`
            }
        )
        console.log("AFTER Calling BACKEND API FOR ENROLLED COURSES")
        if (!response.data.success) {
            throw new Error(response.data.message)
        }
        result = response.data.data
    } catch (error) {
        console.log("GET_USER_ENROLLED_COURSES_API API ERROR............", error)
        toast.error("Could Not Get Enrolled Courses")
    }
    toast.dismiss(toastId)
    return result
}