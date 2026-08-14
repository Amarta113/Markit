import {createReducer} from '@reduxjs/toolkit'
import {addToCart, addToCartAction, removeFromCartAction} from '../actions/cartActions.js'


const initialState = {
    cart: localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : []
}

export const cartReducer = createReducer(initialState, builder => {
    builder
    .addCase(addToCartAction, (state, action) => {
        const nextCart = Array.isArray(action.payload) ? action.payload : [action.payload]
        return {
            ...state,
            cart: nextCart
        }
    })
    .addCase(removeFromCartAction, (state, action) => {
        return {
            ...state,
            cart: state.cart.filter(i => i._id !== action.payload)
        }
    })
})