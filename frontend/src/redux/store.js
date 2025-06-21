import { configureStore } from "@reduxjs/toolkit"
import userSlice from "./userSlice.js"
import loaderSlice from "./loaderSlice.js"

export const store = configureStore({
    reducer: {
        user: userSlice,
        loader: loaderSlice,
    }
})