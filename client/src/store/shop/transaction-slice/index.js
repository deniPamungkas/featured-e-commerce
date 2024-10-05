import { apiBaseUrl } from "@/config/constants";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoadingTransaction: false,
  transactionDetails: null,
  transactionList: [],
};

export const createTransaction = createAsyncThunk(
  "/transaction/create",
  async (data, { rejectWithValue }) => {
    try {
      const result = await axios.post(`${apiBaseUrl}/transaction`, data, {
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

const transactionSlice = createSlice({
  initialState,
  name: "Transaction",
  reducers: {
    setResetTransactionDetails: (state) => {
      state.transactionDetails = null;
    },
  },
  extraReducers: (build) => {
    build
      .addCase(createTransaction.pending, (state) => {
        console.log("pending, create Transaction");
        state.isLoadingTransaction = true;
      })
      .addCase(createTransaction.fulfilled, (state, action) => {
        console.log("fulfilled, create Transaction");
        state.isLoadingTransaction = false;
        state.TransactionDetails = action.payload.data;
      })
      .addCase(createTransaction.rejected, (state) => {
        console.log("rejected, create Transaction");
        state.isLoadingTransaction = false;
        state.TransactionDetails = null;
      });
  },
});

export const { setResetTransactionDetails } = transactionSlice.actions;
export default transactionSlice.reducer;
