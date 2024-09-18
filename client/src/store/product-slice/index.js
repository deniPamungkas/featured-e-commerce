import { apiBaseUrl } from "@/config/constants";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  product: null,
  image: null,
};

export const addProductThunk = createAsyncThunk(
  "product/add",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${apiBaseUrl}/admin/product`,
        formData,
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

export const imageUploadThunk = createAsyncThunk(
  "product/img-upload",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${apiBaseUrl}/admin/product/image-upload`,
        formData,
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setValue: () => {},
  },
  extraReducers: (builder) => {
    builder
      .addCase(imageUploadThunk.pending, (state) => {
        console.log("pending");
        state.isLoading = true;
      })
      .addCase(imageUploadThunk.fulfilled, (state, action) => {
        console.log("fulfilled");
        state.isLoading = false;
        state.image = action.payload.data;
      })
      .addCase(imageUploadThunk.rejected, (state) => {
        console.log("rejected");
        state.isLoading = false;
      })
      .addCase(addProductThunk.pending, (state) => {
        console.log("pending");
        state.isLoading = true;
      })
      .addCase(addProductThunk.fulfilled, (state, action) => {
        console.log("fulfilled");
        state.isLoading = false;
        state.product = action.payload.data;
      })
      .addCase(addProductThunk.rejected, (state) => {
        console.log("rejected");
        state.isLoading = false;
      });
  },
});

export const { setValue } = productSlice.actions;
export default productSlice.reducer;
