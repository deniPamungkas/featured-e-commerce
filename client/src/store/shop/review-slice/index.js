// import { apiBaseUrl } from "@/config/constants";
import { apiBaseUrl } from "@/config/constants";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  reviews: [],
  review: null,
};

export const addProductReview = createAsyncThunk(
  "/review/add",
  async (data, { rejectWithValue }) => {
    try {
      console.log(data);
      const result = await axios.post(`${apiBaseUrl}/review`, data, {
        withCredentials: true,
      });

      return result?.data;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : error.response.data
      );
    }
  }
);

export const getProductReview = createAsyncThunk(
  "/review/get",
  async (id, { rejectWithValue }) => {
    try {
      const result = await axios.get(`${apiBaseUrl}/review/${id}`);

      return result?.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

const productReviewSlice = createSlice({
  initialState,
  name: "product-review",
  reducers: {
    setReviews: (state) => {
      state.review = null;
      state.reviews = [];
    },
  },
  extraReducers: (build) => {
    build
      .addCase(addProductReview.pending, (state) => {
        console.log("pending, add review product");
        state.isLoading = true;
      })
      .addCase(addProductReview.fulfilled, (state, action) => {
        console.log("fulfilled, add review product");
        state.isLoading = false;
        state.review = action.payload.data;
      })
      .addCase(addProductReview.rejected, (state) => {
        console.log("rejected, add review product");
        state.isLoading = false;
        state.review = null;
      })
      .addCase(getProductReview.pending, (state) => {
        console.log("pending, get product review");
        state.isLoading = true;
      })
      .addCase(getProductReview.fulfilled, (state, action) => {
        console.log("fulfilled, get product review");
        state.isLoading = false;
        state.reviews = action.payload.data;
      })
      .addCase(getProductReview.rejected, (state) => {
        console.log("rejected, get product review");
        state.isLoading = false;
        state.reviews = [];
      });
  },
});

export const { setReviews } = productReviewSlice.actions;
export default productReviewSlice.reducer;
