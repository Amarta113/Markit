import axios from 'axios';
import { createAsyncThunk } from "@reduxjs/toolkit";
import { createAction } from "@reduxjs/toolkit";
import { server } from '../../src/server.js'
import {toast} from 'react-toastify' 

export const clearErrors = createAction("user/clearErrors");
export const loadUser = createAsyncThunk("user/load", async (_, thunkAPI) => {
    try {
        const { data } = await axios.get(`${server}/user/get-user`, {
            withCredentials: true,
        })
        return data.user;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data?.message || error.message || "Failed to load user");
    }
});

export const updateUser = createAsyncThunk(
    "updateUser/load",
    async ({ email, password, name, phoneNumber },
        { rejectWithValue }
    ) => {
        try {
            const { data } = await axios.put(
                `${server}/user/update-user-info`,
                {name, email, password, phoneNumber },
                { withCredentials }
            )
            return data.user
        }
        catch (error) {
            return rejectWithValue(
                error.response.data?.message || "Failed to update user details"
            )
        }
    }
)

export const updateAddresses = createActionThunk(
    "updateAddresses/load",
    async (
        { country, city, zipCode, address1, address2, addressType },
        { rejectWithValue }) => {
        try {
            const { data } = await axios.put(`${server}/user/update-user-addresses`,
                { country, city, zipCode, address1, address2, addressType },
                { withCredentials: true }
            );
            if (data?.success) {
                toast.success("User addresses updated successfully!")
            }
            return data.user
        }
        catch (error) {
            return rejectWithValue(
                error.response.data?.message || "Failed to update addresses"
            )
        }
    }
)

export const deleteAddress = createAsyncThunk(
    "deleteAddress/load",
    async (id, thunkAPI) => {
        try {
            const { data } = await axios.delete(
                `${server}/user/delete-address/${id}`,
                { withCredentials : true }
            )
            if (data?.success){
                toast.success("User deleted successfully!")
            }
            return data.user
        }
        catch (error) {
            return thunkAPI.rejectWithValue(
                error.response.data?.message || "Failed to delete addresses"
            )
        }
    }
)