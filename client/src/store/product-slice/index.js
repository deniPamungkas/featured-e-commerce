import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  isSuccess: false,
};

export const uploadImage = {};

const productSlice = createSlice({
  name: "product-slice",
  initialState,
  extraReducers: (builder) => {
    builder.addCase();
  },
});
