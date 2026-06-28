import axios from 'axios';
import { createAsyncThunk } from "@reduxjs/toolkit";
import {createAction} from "@reduxjs/toolkit";
import {server} from '../../src/server.js'

export const clearErrors = createAction("product/clearErrors");
export const createProduct = createAsyncThunk("product/load", 
    async (newForm, thunkAPI) => {
    try{
        const config = {headers: {'Content-Type': "multipart/form-data"}}
        const {data} = await axios.post(
            `${server}/product/create-product`,
            newForm,
            config
        )
        return data.product;
    } catch(error){
        return thunkAPI.rejectWithValue(
            error.response?.data?.message 
            || error.message 
            || "Failed to create product");
    }
});