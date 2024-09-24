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
      // console.log(fetchAllFilteredProducts, "fetchAllFilteredProducts");

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

const shopProductSlice = createSlice({
  initialState,
  name: "shop-product",
  reducers: {
    setValue: () => {},
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
      });
  },
});

export const { setValue } = shopProductSlice.actions;
export default shopProductSlice.reducer;
