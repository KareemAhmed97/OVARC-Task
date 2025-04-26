import { configureStore } from "@reduxjs/toolkit";
import totalCarbonEmissionsReducer from "./totalCarbonEmissionsSlice";

export default configureStore({
  reducer: {
    totalCarbonEmissions: totalCarbonEmissionsReducer,
  },
});
