import { createAction, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { backend_url } from '../../src/server'

export const clearErrors = createAction("order/clearErrors");

export const getAllOrdersUser = createAsyncThunk(
    "getAllOrdersUser/load",
    async(userId, thunkAPI) => {
        try{
            const { data } = await axios.get(
                `${backend_url}/order/get-all-orders/${userId}`
            )
            return data.orders
        }catch(error){
            return thunkAPI.rejectWithValue(
                error?.response?.data?.message || "Failed to get all orders for this user!"
            )
        }
    }
)

export const getAllOrdersShop = createAsyncThunk(
    "getAllOrdersShop/load",
    async(shopId, thunkAPI) => {
        try{
            const { data } = await axios.get(
                `${backend_url}/order/get-all-seller-orders/${shopId}`
            )
            return data.orders
        }catch(error){
            return thunkAPI.rejectWithValue(error?.response?.data?.message)
        }
    }
)