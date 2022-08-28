import { createSlice } from '@reduxjs/toolkit'

const initialState = null

const userSlice = createSlice({
    name: "user",
    initialState: {},
    reducers: {
        login: (state, action) => {
            state.value = action.payload.user
        },
        logout: (state) => {
            state.value = initialState
        }
    },
    extraReducers: {}
})

export const { login, logout } = userSlice.actions

export default userSlice.reducer
