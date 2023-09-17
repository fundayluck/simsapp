import { createSlice } from "@reduxjs/toolkit"

const authSlice = createSlice({
    name: 'auth',
    initialState: { email: null, token: null },
    reducers: {
        setCredentials: (state, action) => {
            const { email, token } = action.payload
            state.email = email
            state.token = token
            console.log("authslice", token, email);
        },
        logOut: (state, action) => {
            state.email = null
            state.token = null
        }
    },
})

export const { setCredentials, logOut } = authSlice.actions

export default authSlice.reducer

export const selectCurrentEmail = (state) => state.auth.email
export const selectCurrentToken = (state) => state.auth.token