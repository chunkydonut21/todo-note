import { createSlice } from '@reduxjs/toolkit'

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    currentUser: null
  },
  reducers: {
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload
    }
  },
  extraReducers: (builder) => {}
})

export const { setCurrentUser } = authSlice.actions

export const getCurrentUser = (state) => {
  return state.auth.currentUser
}

export default authSlice.reducer
