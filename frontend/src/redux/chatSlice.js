import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
    name: 'chat',
    initialState: {
        selectedChat: null,
    },
    reducers: {
        setSelectedChat: (state, action) => {
            state.selectedChat = action.payload
        },
        clearSelectedChat: (state, action) => {
            state.selectedChat = null
        }
    }
})

export const {setSelectedChat, clearSelectedChat} = chatSlice.actions
export default chatSlice.reducer 