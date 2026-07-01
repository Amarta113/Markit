import { createReducer } from "@reduxjs/toolkit";
import { createEvent } from "../actions/eventActions.js";

const initialState = {
    isLoading: true
}

export const eventReducer = eventReducer(
    initialState, builder => {
        builder
        .addCase(createEvent.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(createEvent.fulfilled, (state, action) => {
            state.isLoading = false;
            state.success = true;
            state.product = action.payload;
        })
        .addCase(createEvent.rejected, (state, action) => {
            state.isLoading = false;
            state.success = false;            
            state.error = action.payload;
        })
        // Get All the Events for Specific Shop
        .addCase(getAllEventShop.pending, (state, action)=> {
            state.isLoading = true;
        })
        .addCase(getAllEventShop.fulfilled, (state, action) => {
            state.isLoading = false;
            state.product = action.payload
        })
        .addCase(getAllEventShop.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        })
        // Delete the event
        .addCase(deleteEvent.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(deleteEvent.fulfilled, (state, action) => {
            state.isLoading = false;
            state.message = action.payload
        })
        .addCase(deleteEvent.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        })
    }
)

