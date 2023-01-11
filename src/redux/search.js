import { createSlice } from '@reduxjs/toolkit';

export const searchSlice = createSlice({
    name : "search",
    initialState: { value: {text: ""} },
    reducers: {
        find: (state, action) => {
            state.value = action.payload;
        },
    }
})

export const { find } = searchSlice.actions;

export default searchSlice.reducer; 