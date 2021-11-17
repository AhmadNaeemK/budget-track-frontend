import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    user_props: {},
    isLoggedIn: false,
  },
  reducers: {
    logout: (state) => {
        state.user_props = {}
        state.isLoggedIn = false
    },
    login: (state, action) => {
      state.user_props = action.payload
      state.isLoggedIn = true
    },
    update: (state, action) => {
        state.user_props = action.payload
    }
  }
})

// Action creators are generated for each case reducer function
export const { login, logout } = userSlice.actions

export default userSlice.reducer
