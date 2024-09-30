import { apiBaseUrl } from "@/config/constants";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoadingAddress: false,
  newAddress: null,
  addressList: [],
};

export const addNewAddress = createAsyncThunk(
  "/address/add",
  async (data, { rejectWithValue }) => {
    try {
      const result = await axios.post(`${apiBaseUrl}/address`, data, {
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

export const fetchAddresses = createAsyncThunk(
  "/address/get",
  async (id, { rejectWithValue }) => {
    try {
      if (id) {
        const result = await axios.get(`${apiBaseUrl}/address/${id}`, {
          withCredentials: true,
        });

        return result?.data;
      }
    } catch (error) {
      console.log(error);
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

export const updateAddress = createAsyncThunk(
  "/address/update",
  async ({ userId, addressId, formData }, { rejectWithValue }) => {
    try {
      console.log({ userId, addressId, formData });
      const result = await axios.put(
        `${apiBaseUrl}/address/${userId}/${addressId}`,
        formData,
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

export const deleteAddress = createAsyncThunk(
  "/address/delete",
  async ({ userId, addressId }, { rejectWithValue }) => {
    try {
      const result = await axios.delete(
        `${apiBaseUrl}/address/${userId}/${addressId}`,
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

const addressSlice = createSlice({
  initialState,
  name: "address",
  reducers: {
    setAddress: (state) => {
      state.newAddress = null;
      state.AddressList = [];
    },
  },
  extraReducers: (build) => {
    build
      .addCase(addNewAddress.pending, (state) => {
        console.log("pending, add address");
        state.isLoadingAddress = true;
      })
      .addCase(addNewAddress.fulfilled, (state, action) => {
        console.log("fulfilled, add address");
        state.isLoadingAddress = false;
        state.newAddress = action.payload.data;
      })
      .addCase(addNewAddress.rejected, (state) => {
        console.log("rejected, add address");
        state.isLoadingAddress = false;
        state.newAddress = null;
      })
      .addCase(fetchAddresses.pending, (state) => {
        console.log("pending, get address items");
        state.isLoadingAddress = true;
      })
      .addCase(fetchAddresses.fulfilled, (state, action) => {
        console.log("fulfilled, get address items");
        state.isLoadingAddress = false;
        state.addressList = action?.payload?.data;
      })
      .addCase(fetchAddresses.rejected, (state) => {
        console.log("rejected, get address items");
        state.isLoadingAddress = false;
        state.addressList = [];
      })
      .addCase(updateAddress.pending, (state) => {
        console.log("pending, update address item");
        state.isLoadingAddress = true;
      })
      .addCase(updateAddress.fulfilled, (state, action) => {
        console.log("fulfilled, update address item");
        state.isLoadingAddress = false;
        state.addressList = action.payload.data;
      })
      .addCase(updateAddress.rejected, (state) => {
        console.log("rejected, update address item");
        state.isLoadingAddress = false;
        state.addressList = [];
      })
      .addCase(deleteAddress.pending, (state) => {
        console.log("pending, delete address item");
        state.isLoadingAddress = true;
      })
      .addCase(deleteAddress.fulfilled, (state, action) => {
        console.log("fulfilled, delete address item");
        state.isLoadingAddress = false;
        state.addressList = action.payload.data;
      })
      .addCase(deleteAddress.rejected, (state) => {
        console.log("rejected, delete address item");
        state.isLoadingAddress = false;
        state.addressList = [];
      });
  },
});

export const { setAddress } = addressSlice.actions;
export default addressSlice.reducer;
