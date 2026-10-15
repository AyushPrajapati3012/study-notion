import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const initialState = {
    cart: localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart"))
    : [],
    total: localStorage.getItem("total")
    ? JSON.parse(localStorage.getItem("total"))
    : 0,
    totalItems: localStorage.getItem('totalItems') ? JSON.parse(localStorage.getItem('totalItems')) : 0,
}
const cartSlice = createSlice({
    name:'cart',
    initialState,
    reducers:{
        addToCart: (state,value)=>{
            const course = value.payload
            const index = state.cart.findIndex((item)=>item._id === course._id)

            if(index >= 0){
                //course is already present
                toast.error('course already present')
                return 
            }
            //if not present add this into state cart
            state.cart.push(course)
            //update the total items
            state.totalItems++
            state.total += course.price

            localStorage.setItem('cart',JSON.stringify(state.cart))
            localStorage.setItem('totalItems',JSON.stringify(state.totalItems))
            localStorage.setItem('total',JSON.stringify(state.total))
            toast.success('course added to cart')
        },
        removeFromCart: (state,value)=>{
            const course = value.payload
            const index = state.cart.findIndex((item)=>item._id === course._id)
            if(index >= 0){
                state.totalItems--
                state.total -= state.cart[index].price
                state.cart.splice(index, 1)
                // Update to localstorage
                localStorage.setItem("cart", JSON.stringify(state.cart))
                localStorage.setItem("total", JSON.stringify(state.total))
                localStorage.setItem("totalItems", JSON.stringify(state.totalItems))
                // show toast
                toast.success("Course removed from cart")
            }
        },
        //reset cart
        resetCart: (state)=>{
            state.totalItems = 0
            state.cart = []
            state.total = 0
            
            localStorage.removeItem("cart")
            localStorage.removeItem("total")
            localStorage.removeItem("totalItems")
        }
    },
});

export const {addToCart,removeFromCart,resetCart} = cartSlice.actions;
export default cartSlice.reducer; 