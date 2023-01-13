import { createSlice } from '@reduxjs/toolkit';

export const pickSlice = createSlice({
    name : "pickAnimal",
    initialState: { value: {text: "강아지"} },
    reducers: {
        pickAnimal: (state, action) => {
            state.value = action.payload;
        },
    }
})

export const { pickAnimal } = pickSlice.actions;

export default pickSlice.reducer; 