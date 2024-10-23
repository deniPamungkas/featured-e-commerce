import { apiBaseUrl } from "@/config/constants";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoadingAdminOrder: false,
  orderDetails: null,
  orderList: [],
};

export const getOrdersFromAllUsers = createAsyncThunk(
  "/admin-order/get",
  async (data, { rejectWithValue }) => {
    try {
      const result = await axios.get(`${apiBaseUrl}/admin/order`, {
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

export const getAllOrdersByUser = createAsyncThunk(
  "/admin-order/get",
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

export const getOrderDetailsForAdmin = createAsyncThunk(
  "/admin-order/getOrderDetails",
  async (id, { rejectWithValue }) => {
    try {
      const result = await axios.get(
        `${apiBaseUrl}/admin/order/details/${id}`,
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

export const updateOrderStatus = createAsyncThunk(
  "/admin-order/updateOrderStatus",
  async ({ id, orderStatus }, { rejectWithValue }) => {
    console.log({ id, orderStatus });
    try {
      const result = await axios.patch(
        `${apiBaseUrl}/admin/order/details/update/${id}`,
        { orderStatus },
        {
          withCredentials: true,
        }
      );

      console.log(result.data);

      return result?.data;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : error.response.data
      );
    }
  }
);

const adminOrderSlice = createSlice({
  initialState,
  name: "admin-order",
  reducers: {
    setResetOrderDetails: (state) => {
      state.orderDetails = null;
    },
  },
  extraReducers: (build) => {
    build
      .addCase(getOrdersFromAllUsers.pending, (state) => {
        console.log("pending, getOrdersFromAllUsers");
        state.isLoadingOrder = true;
      })
      .addCase(getOrdersFromAllUsers.fulfilled, (state, action) => {
        console.log("fulfilled, getOrdersFromAllUsers");
        state.isLoadingOrder = false;
        state.orderList = action.payload.data;
      })
      .addCase(getOrdersFromAllUsers.rejected, (state) => {
        console.log("rejected, getOrdersFromAllUsers");
        state.isLoadingOrder = false;
        state.orderList = null;
      })
      .addCase(getOrderDetailsForAdmin.pending, (state) => {
        console.log("pending, getOrderDetailsForAdmin");
        state.isLoadingOrder = true;
      })
      .addCase(getOrderDetailsForAdmin.fulfilled, (state, action) => {
        console.log("fulfilled, getOrderDetailsForAdmin");
        state.isLoadingOrder = false;
        state.orderDetails = action.payload.data;
      })
      .addCase(getOrderDetailsForAdmin.rejected, (state) => {
        console.log("rejected, getOrderDetailsForAdmin");
        state.isLoadingOrder = false;
        state.orderDetails = null;
      })
      .addCase(updateOrderStatus.pending, (state) => {
        console.log("pending, updateOrderStatus");
        state.isLoadingOrder = true;
      })
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        console.log("fulfilled, updateOrderStatus");
        state.isLoadingOrder = false;
        state.orderDetails = action.payload.data;
      })
      .addCase(updateOrderStatus.rejected, (state) => {
        console.log("rejected, updateOrderStatus");
        state.isLoadingOrder = false;
        state.orderDetails = null;
      });
  },
});

export const { setResetOrderDetails } = adminOrderSlice.actions;
export default adminOrderSlice.reducer;
