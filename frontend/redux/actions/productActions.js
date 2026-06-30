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

export const getAllProductsShop = createAsyncThunk(
    "allProducts/load",
    async (id,  thunkAPI) => {
        try{
            const { data } = await axios.get(
                `${server}/api/v1/product/get-all-products-shop/${id}`
            )
            return data.products
        } catch(error){
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || "Failed to load all products"
            )
        }
    }
)
