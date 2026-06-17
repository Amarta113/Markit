import axios from 'axios';
import { createAsyncThunk } from "@reduxjs/toolkit";
import {createAction} from "@reduxjs/toolkit";
import {server} from '../../src/server.js'

export const clearErrors = createAction("seller/clearErrors");
export const loadSeller = createAsyncThunk("seller/load", 
    async (_, thunkAPI) => {
    try{
        const {data} = await axios.get(`${server}/seller/get-seller`,{
            withCredentials: true,
        })
        return data.seller;
    } catch(error){
        return thunkAPI.rejectWithValue(error.response?.data?.message || error.message || "Failed to load user");
    }
});