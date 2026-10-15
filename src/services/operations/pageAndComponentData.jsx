import React from 'react'
import { catalogData } from '../apis'
import { toast } from 'react-hot-toast'
import { apiConnector } from '../apiconnector'
const {
    CATALOGPAGEDATA_API
} = catalogData

export const getCatalogPageData = async (categoryId) => {
    const toastId = toast.loading('Loading...')
    let result = [];
    try {
        const res = await apiConnector('POST', CATALOGPAGEDATA_API,
            {
                categoryId: categoryId,
            }
        );
        if (!res?.data?.success) {
            throw new Error("Could not Fetch Category page data");
        }
        result = res?.data
    } catch (error) {
        console.log("CATALOG PAGE DATA API ERROR....", error);
        toast.error(error.message);
        // result = error.response?.data;
    }
    toast.dismiss(toastId);
    return result;
}


