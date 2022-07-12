import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = null

const userSlice = createSlice({
    name: "user",
    initialState: {},
    reducers: {
        login: (state, action) => {
            localStorage.setItem("sessionToken", action.payload.token)
            state.value = action.payload.user
        },
        logout: (state) => {
            localStorage.removeItem("sessionToken")
            state.value = initialState
        }
    },
    extraReducers: {}
})

export const { login, logout } = userSlice.actions

export default userSlice.reducer
