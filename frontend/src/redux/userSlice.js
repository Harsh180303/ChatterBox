import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        userData: null,
        resetEmail: null,
        userLoading: true,
    },    
    reducers: {
        setUserData: (state, action) => {
            state.userData = action.payload
        },

        setUserLoading: (state, action) => {
            state.userLoading = action.payload
        },

        setResetEmail: (state, action) => {
            state.resetEmail = action.payload
        },

        clearResetEmail: (state, action) => {
            state.resetEmail = null
        }
    }
})

export const {setUserData, setResetEmail, clearResetEmail, setUserLoading} = userSlice.actions
export default userSlice.reducer