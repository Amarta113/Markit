import { createReducer } from "@reduxjs/toolkit";
import { createProduct } from "../actions/productActions";

const initialState = {
    isLoading: true
}

export const productReducer = createReducer(
    initialState, builder => {
        builder
        .addCase(createProduct.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(createProduct.fulfilled, (state, action) => {
            state.isLoading = false;
            state.success = true;
            state.product = action.payload;
        })
        .addCase(createProduct.rejected, (state, action) => {
            state.isLoading = false;
            state.success = false;            
            state.error = action.payload;
        })
    }
)