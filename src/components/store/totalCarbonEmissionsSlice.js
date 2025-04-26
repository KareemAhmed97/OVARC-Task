import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  totalCarbonEmissions: 0,
  name: "",
};

const totalCarbonEmissionsSlice = createSlice({
  name: "totalCarbonEmissions",
  initialState,
  reducers: {
    updateTotal(state, action) {
      state.totalCarbonEmissions = action.payload.totalCarbonEmissions;
      state.name = action.payload.name;
    },
  },
});

export const { updateTotal } = totalCarbonEmissionsSlice.actions;

export default totalCarbonEmissionsSlice.reducer;
