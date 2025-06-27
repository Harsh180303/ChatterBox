import { configureStore } from "@reduxjs/toolkit"
import userSlice from "./userSlice.js"
import loaderSlice from "./loaderSlice.js"
import chatSlice from './chatSlice'

export const store = configureStore({
    reducer: {
        user: userSlice,
        loader: loaderSlice,
        chat: chatSlice,
    }
})

export default store