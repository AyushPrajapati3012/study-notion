import { toast } from "react-hot-toast"
import { apiConnector } from "../apiconnector"
import { settingsEndpoints } from "../apis"
import { setUser } from "../../slices/profileSlice"
const {
    UPDATE_DISPLAY_PICTURE_API,
    UPDATE_PROFILE_API,
    CHANGE_PASSWORD_API,
    DELETE_PROFILE_API,
} = settingsEndpoints

export function updateDisplayPicture(token, formData) {
    return async (dispatch) => {
        const toastId = toast.loading('Loading...')
        try {
            const response = await apiConnector(
                'PUT',
                UPDATE_DISPLAY_PICTURE_API,
                formData, {
                'Content-Type': "multipart/form-data",
                Authorization: `Bearer ${token}`
            }
            )
            console.log(
                "UPDATE_DISPLAY_PICTURE_API API RESPONSE............",
                response
            )
            if (!response.data.success) {
                throw new Error(response.data.message)
            }
            toast.success("Display Picture Updated Successfully")
            dispatch(setUser(response.data.data))
        } catch (error) {
            console.log("UPDATE_DISPLAY_PICTURE_API API ERROR............", error)
            toast.error("Could Not Update Display Picture")
        }
        toast.dismiss(toastId)
    }
}

export function updateProfile(token, formData) {
    return async (dispatch) => {
        const toastId = toast.loading('Loading...')
        try {
            const response = await apiConnector('PUT',
                UPDATE_PROFILE_API,
                formData,
                {
                    Authorization: `Bearer ${token}`,
                }
            )
            console.log("CHANGE_PASSWORD_API API RESPONSE............", response)
            if (!response.data.success) {
                throw new Error(response.data.message)
            }
            toast.success("Password Changed Successfully")
        } catch (error) {
            console.log("CHANGE_PASSWORD_API API ERROR............", error)
            toast.error(error.response.data.message)
        }
        toast.dismiss(toastId)
    }
}

export function changePassword(token, data) {
    return async (dispatch) => {
        const toastId = toast.loading('Loading...')
        try {
            const response = await apiConnector('POST',
                CHANGE_PASSWORD_API,
                data,
                {
                    Authorization: `Bearer ${token}`
                },
            )
            if (!response.data.success) {
                throw new Error(response.data.message)
            }
            toast.success("Password Changed Successfully")
        } catch (error) {
            console.log("CHANGE_PASSWORD_API API ERROR............", error)
            toast.error(error.response.data.message)
        }
        toast.dismiss(toastId)
    }
}

export function deleteProfile(user, navigate) {
    return async (dispatch) => {
        const toastId = toast.loading('Loading...')
        try {
            const response = await apiConnector('DELETE',
                DELETE_PROFILE_API,
                user
            )
            if (!response.data.success) {
                throw new Error(response.data.message)
            }
            toast.success("Profile Deleted Successfully")
            dispatch(logout(navigate))
        } catch (error) {
            console.log("DELETE_PROFILE_API API ERROR............", error)
            toast.error("Could Not Delete Profile")
        }
        toast.dismiss(toastId)
    }
}