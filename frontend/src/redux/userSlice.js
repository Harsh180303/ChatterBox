import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        userData: null,
        resetEmail: null //new
    },    
    reducers: {
        setUserData: (state, action) => {
            state.userData = action.payload
        },

        // new action
        setResetEmail: (state, action) => {
            state.resetEmail = action.payload
        },

        clearResetEmail: (state, action) => {
            state.resetEmail = null
        }
    }
})

export const {setUserData, setResetEmail, clearResetEmail} = userSlice.actions
export default userSlice.reducer