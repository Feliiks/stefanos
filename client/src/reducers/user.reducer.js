import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = null

const userSlice = createSlice({
    name: "user",
    initialState: {},
    reducers: {
        login: (state, action) => {
            localStorage.setItem("refreshToken", action.payload.token)
            state.value = action.payload.user
        },
        logout: (state) => {
            localStorage.removeItem("refreshToken")
            state.value = initialState
        }
    },
    extraReducers: {}
})

export const { login, logout } = userSlice.actions

export default userSlice.reducer
