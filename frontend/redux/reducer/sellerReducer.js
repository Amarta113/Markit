import { createReducer } from '@reduxjs/toolkit'
import { loadSeller, clearErrors } from '../actions/sellerActions.js'

const initialState = {
  isLoading: true
}

export const userReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(loadSeller.pending, (state) => {
      state.isLoading = true
    })
    .addCase(loadSeller.fulfilled, (state, action) => {
      state.isSeller = true
      state.isLoading = false
      state.seller = action.payload
      state.error = null
    })
    .addCase(loadSeller.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.payload
      state.isSeller = false
      state.seller = null
    })
    .addCase(clearErrors, (state) => {
      state.error = null
    })
})
