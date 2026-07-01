import axios from 'axios';
import { createAsyncThunk } from "@reduxjs/toolkit";
import {createAction} from "@reduxjs/toolkit";
import {server} from '../../src/server.js'

export const clearErrors = createAction("event/clearErrors");
export const createEvent = createAsyncThunk("event/load", 
    async (newForm, thunkAPI) => {
    try{
        const config = {headers: {'Content-Type': "multipart/form-data"}}
        const {data} = await axios.post(
            `${server}/event/create-event`,
            newForm,
            config
        )
        return data.event;
    } catch(error){
        return thunkAPI.rejectWithValue(
            error.response?.data?.message 
            || error.message 
            || "Failed to create event");
    }
});

export const getAllEventShop = createAsyncThunk(
    "allEvents/load",
    async (id,  thunkAPI) => {
        try{
            const { data } = await axios.get(
                `${server}/event/get-all-events-shop/${id}`
            )
            return data.events
        } catch(error){
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || "Failed to load all events"
            )
        }
    }
)

export const deleteEvent = createAsyncThunk(
    "deleteEvent/load",
    async (id, thunkAPI) => {
        try {
            const { data } = await axios.delete(
                `${server}/event/delete-shop-event/${id}`,
                {
                    withCredentials: true
                }
            )
            return data.message;
        } catch (error){
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || "Failed to delete the event"
            )
        }
    }
)

export const getAllEvents = createAsyncThunk(
    "getAllEvents/load",
    async(_, thunkAPI) => {
        try {
            const {data} = await axios.get(
                `${server}/event/get-all-events`
            )
            return data.events;
        } catch (error) {
            return thunkAPI.rejectWithValue(
               error.response?.data?.message || "Failed to load all events"
            )
        }
    }
)
