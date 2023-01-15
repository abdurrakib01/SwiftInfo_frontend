import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user_name : "",
  email : ""
}

export const userSlice = createSlice({
  name : 'user_info',
  initialState,
  reducers: {
    setUserInfo : (state, action)=>{
        state.user_name = action.payload.user_name
        state.email = action.payload.email
    },
    unSetUserInfo : (state, action)=>{
        state.user_name = action.payload.user_name
        state.email = action.payload.email
    },
  },
})
export const { setUserInfo, unSetUserInfo } = userSlice.actions

export default userSlice.reducer