import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    licensePlates: "",
};


const licensePlateSlice = createSlice({
    name: "licensePlate",
    initialState,

    reducers: {
        LicensePlateSearch(state, action) {
            state.licensePlates = action.payload;
        },
    },
})

export const { LicensePlateSearch } = licensePlateSlice.actions;
export default licensePlateSlice.reducer;