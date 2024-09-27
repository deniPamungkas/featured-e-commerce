import { apiBaseUrl } from "@/config/constants";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoadingCart: false,
  addedItem: null,
  currentCart: [],
};

export const addToCart = createAsyncThunk(
  "/cart/add",
  async (data, { rejectWithValue }) => {
    try {
      const result = await axios.post(`${apiBaseUrl}/cart`, data, {
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

export const fetchCartItems = createAsyncThunk(
  "/cart/get",
  async (id, { rejectWithValue }) => {
    console.log(id);
    try {
      const result = await axios.get(`${apiBaseUrl}/cart/${id}`, {
        withCredentials: true,
      });

      return result?.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

export const updateCartQuantity = createAsyncThunk(
  "/cart/update",
  async (data, { rejectWithValue }) => {
    console.log(data);
    try {
      const result = await axios.put(`${apiBaseUrl}/cart/update-cart`, data, {
        withCredentials: true,
      });

      return result?.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

export const deleteCartItem = createAsyncThunk(
  "/cart/delete",
  async ({ userId, productId }, { rejectWithValue }) => {
    try {
      const result = await axios.delete(
        `${apiBaseUrl}/cart/${userId}/${productId}`,
        {
          withCredentials: true,
        }
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

const cartSlice = createSlice({
  initialState,
  name: "cart",
  reducers: {
    setCarts: (state) => {
      state.addedItem = null;
      state.currentCart = [];
    },
  },
  extraReducers: (build) => {
    build
      .addCase(addToCart.pending, (state) => {
        console.log("pending, add cart");
        state.isLoadingCart = true;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        console.log("fulfilled, add cart");
        state.isLoadingCart = false;
        state.addedItem = action.payload.data;
      })
      .addCase(addToCart.rejected, (state) => {
        console.log("rejected, add cart");
        state.isLoadingCart = false;
        state.addedItem = null;
      })
      .addCase(fetchCartItems.pending, (state) => {
        console.log("pending, get cart items");
        state.isLoadingCart = true;
      })
      .addCase(fetchCartItems.fulfilled, (state, action) => {
        console.log("fulfilled, get cart items");
        state.isLoadingCart = false;
        state.currentCart = action.payload.data;
      })
      .addCase(fetchCartItems.rejected, (state) => {
        console.log("rejected, get cart items");
        state.isLoadingCart = false;
        state.currentCart = [];
      })
      .addCase(updateCartQuantity.pending, (state) => {
        console.log("pending, update cart item");
        state.isLoadingCart = true;
      })
      .addCase(updateCartQuantity.fulfilled, (state, action) => {
        console.log("fulfilled, update cart item");
        state.isLoadingCart = false;
        state.currentCart = action.payload.data;
      })
      .addCase(updateCartQuantity.rejected, (state) => {
        console.log("rejected, update cart item");
        state.isLoadingCart = false;
        state.currentCart = [];
      })
      .addCase(deleteCartItem.pending, (state) => {
        console.log("pending, update cart item");
        state.isLoadingCart = true;
      })
      .addCase(deleteCartItem.fulfilled, (state, action) => {
        console.log("fulfilled, update cart item");
        state.isLoadingCart = false;
        state.currentCart = action.payload.data;
      })
      .addCase(deleteCartItem.rejected, (state) => {
        console.log("rejected, update cart item");
        state.isLoadingCart = false;
        state.currentCart = [];
      });
  },
});

export const { setCarts } = cartSlice.actions;
export default cartSlice.reducer;
