import { apiBaseUrl } from "@/config/constants";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoadingOrder: false,
  orderDetails: null,
  orderList: [],
};

export const createOrder = createAsyncThunk(
  "/order/create",
  async (data, { rejectWithValue }) => {
    try {
      const result = await axios.post(`${apiBaseUrl}/order`, data, {
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

export const capturePayment = createAsyncThunk(
  "/order/capturePayment",
  async (data, { rejectWithValue }) => {
    try {
      const result = await axios.post(
        `${apiBaseUrl}/order/capturePayment`,
        data,
        {
          withCredentials: true,
        }
      );

      return result?.data;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : error.response.data
      );
    }
  }
);

export const failedPayment = createAsyncThunk(
  "/order/failedPayment",
  async (data, { rejectWithValue }) => {
    try {
      const result = await axios.post(
        `${apiBaseUrl}/order/failedPayment`,
        data,
        {
          withCredentials: true,
        }
      );

      return result?.data;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : error.response.data
      );
    }
  }
);

export const getAllOrdersByUser = createAsyncThunk(
  "/order/get",
  async (userId, { rejectWithValue }) => {
    try {
      const result = await axios.get(`${apiBaseUrl}/order/${userId}`, {
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

export const getOrderDetails = createAsyncThunk(
  "/order/getOrderDetails",
  async (id, { rejectWithValue }) => {
    try {
      const result = await axios.get(`${apiBaseUrl}/order/details/${id}`, {
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

// export const fetchCartItems = createAsyncThunk(
//   "/cart/get",
//   async (id, { rejectWithValue }) => {
//     try {
//       if (id) {
//         const result = await axios.get(`${apiBaseUrl}/cart/${id}`, {
//           withCredentials: true,
//         });

//         return result?.data;
//       }
//     } catch (error) {
//       console.log(error);
//       return rejectWithValue(
//         error.response ? error.response.data : error.message
//       );
//     }
//   }
// );

// export const updateCartQuantity = createAsyncThunk(
//   "/cart/update",
//   async (data, { rejectWithValue }) => {
//     try {
//       const result = await axios.put(`${apiBaseUrl}/cart/update-cart`, data, {
//         withCredentials: true,
//       });

//       return result?.data;
//     } catch (error) {
//       console.log(error);
//       return rejectWithValue(
//         error.response ? error.response.data : error.message
//       );
//     }
//   }
// );

// export const deleteCartItem = createAsyncThunk(
//   "/cart/delete",
//   async ({ userId, productId }, { rejectWithValue }) => {
//     try {
//       const result = await axios.delete(
//         `${apiBaseUrl}/cart/${userId}/${productId}`,
//         {
//           withCredentials: true,
//         }
//       );

//       return result?.data;
//     } catch (error) {
//       console.log(error);
//       return rejectWithValue(
//         error.response ? error.response.data : error.message
//       );
//     }
//   }
// );

const orderSlice = createSlice({
  initialState,
  name: "order",
  reducers: {
    setResetOrderDetails: (state) => {
      state.orderDetails = null;
    },
  },
  extraReducers: (build) => {
    build
      .addCase(createOrder.pending, (state) => {
        console.log("pending, create order");
        state.isLoadingOrder = true;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        console.log("fulfilled, create order");
        state.isLoadingOrder = false;
        state.orderDetails = action.payload.data;
      })
      .addCase(createOrder.rejected, (state) => {
        console.log("rejected, create order");
        state.isLoadingOrder = false;
        state.orderDetails = null;
      })
      .addCase(getAllOrdersByUser.pending, (state) => {
        console.log("pending, get all orders");
        state.isLoadingOrder = true;
      })
      .addCase(getAllOrdersByUser.fulfilled, (state, action) => {
        console.log("fulfilled, get all orders");
        state.isLoadingOrder = false;
        state.orderList = action.payload.data;
      })
      .addCase(getAllOrdersByUser.rejected, (state) => {
        console.log("rejected, get all orders");
        state.isLoadingOrder = false;
        state.orderList = [];
      })
      .addCase(getOrderDetails.pending, (state) => {
        console.log("pending, get order details");
        state.isLoadingOrder = true;
      })
      .addCase(getOrderDetails.fulfilled, (state, action) => {
        console.log("fulfilled, get order details");
        state.isLoadingOrder = false;
        state.orderDetails = action.payload.data;
      })
      .addCase(getOrderDetails.rejected, (state) => {
        console.log("rejected, get order details");
        state.isLoadingOrder = false;
        state.orderDetails = [];
      });
  },
});

export const { setResetOrderDetails } = orderSlice.actions;
export default orderSlice.reducer;
