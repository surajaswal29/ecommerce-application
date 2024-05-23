import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    theme: "light"
}

const utilitySlice = createSlice({
    name: "utility",
    initialState,
    reducers: {
        setTheme: (state, action) => {
            return {
                ...state,
                theme: action.payload
            }
        }
    }
});


export const { setTheme } = utilitySlice.actions
export default utilitySlice.reducer