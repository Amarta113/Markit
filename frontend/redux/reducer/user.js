import { createReducer } from '@reduxjs/toolkit'
import { loadUser, clearErrors } from '../actions/user.js'

const initialState = {
  isAuthenticated: false,
  loading: false,
  user: null,
  error: null,
}

export const userReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(loadUser.pending, (state) => {
      state.loading = true
    })
    .addCase(loadUser.fulfilled, (state, action) => {
      state.isAuthenticated = true
      state.loading = false
      state.user = action.payload
      state.error = null
    })
    .addCase(loadUser.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload
      state.isAuthenticated = false
      state.user = null
    })
    // update user data
    .addCase(updateUser.pending, state => {
      state.loading = true;
    })
    .addCase(updateUser.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload
    })
    .addCase(updateUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload
    })
    .addCase(updateAddresses.pending, state => {
      state.addressloading = true;
    })
    .addCase(updateAddresses.fulfilled, (state, action) => {
      state.addressloading = false;
      state.user = action.payload
    })
    .addCase(updateAddresses.rejected, (state, action) => {
      state.addressloading = false;
      state.error = action.payload
    })
    .addCase(deleteAddress.pending, state => {
      state.deletingAddress = true;
    })
    .addCase(deleteAddress.fulfilled, (state, action) => {
      state.deletingAddress = false;
      state.user = action.payload
    })
    .addCase(deleteAddress.rejected, (state, action) => {
      state.deletingAddress = false;
      state.error = action.payload
    })
    .addCase(clearErrors, (state) => {
      state.error = null
    })
})
