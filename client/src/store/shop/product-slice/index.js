import { apiBaseUrl } from "@/config/constants";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  productList: [],
  productDetails: null,
};

export const fetchAllFilteredProducts = createAsyncThunk(
  "/products/fetchAllProducts",
  async ({ filterParams, sortParams }, { rejectWithValue }) => {
    try {
      const query = new URLSearchParams({
        ...filterParams,
        sortBy: sortParams,
      });

      const result = await axios.get(
        `${apiBaseUrl}/shop/products/get?${query}`
      );

      return result?.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

export const fetchProductDetails = createAsyncThunk(
  "/products/fetchProductDetails",
  async (id, { rejectWithValue }) => {
    try {
      const result = await axios.get(`${apiBaseUrl}/shop/product/get/${id}`);

      return result?.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

const shopProductSlice = createSlice({
  initialState,
  name: "shop-product",
  reducers: {
    setProductDetails: (state) => {
      state.productDetails = null;
    },
  },
  extraReducers: (build) => {
    build
      .addCase(fetchAllFilteredProducts.pending, (state) => {
        console.log("pending, filtered product");
        state.isLoading = true;
      })
      .addCase(fetchAllFilteredProducts.fulfilled, (state, action) => {
        console.log("fulfilled, filtered product");
        state.isLoading = false;
        state.productList = action.payload.data;
        state.productDetails = null;
      })
      .addCase(fetchAllFilteredProducts.rejected, (state) => {
        console.log("rejected, filtered product");
        state.isLoading = false;
        state.productList = [];
        state.productDetails = null;
      })
      .addCase(fetchProductDetails.pending, (state) => {
        console.log("pending, fetch product detail");
        state.isLoading = true;
      })
      .addCase(fetchProductDetails.fulfilled, (state, action) => {
        console.log("fulfilled, fetch product detail");
        state.isLoading = false;
        state.productDetails = action.payload.data;
      })
      .addCase(fetchProductDetails.rejected, (state) => {
        console.log("rejected, fetch product detail");
        state.isLoading = false;
        state.productDetails = null;
      });
  },
});

export const { setProductDetails } = shopProductSlice.actions;
export default shopProductSlice.reducer;
