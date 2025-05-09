import { createSlice } from "@reduxjs/toolkit";

type MenuState = {
    isSelected: boolean
}

const initialState: MenuState = {
    isSelected: false,
}

const menuSlice = createSlice({
    name: "menu",
    initialState,
    reducers: {
        setIsSelected: (state, action) => {
            state.isSelected = action.payload
        }
    }
})

export const { setIsSelected } = menuSlice.actions
export default menuSlice.reducer
