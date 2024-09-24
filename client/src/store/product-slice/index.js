import { apiBaseUrl } from "@/config/constants";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  product: null,
  image: null,
  productList: [],
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

export const deleteProductThunk = createAsyncThunk(
  "product/delete",
  async (productId, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `${apiBaseUrl}/admin/product/${productId}`,
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

export const editProductThunk = createAsyncThunk(
  "product/edit",
  async ({ productId, formData }, { rejectWithValue }) => {
    try {
      const response = await axios.patch(
        `${apiBaseUrl}/admin/product/${productId}`,
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

export const fetchAllProductThunk = createAsyncThunk(
  "product/fetch-all",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${apiBaseUrl}/admin/product`, {
        withCredentials: true,
      });
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
      })
      .addCase(fetchAllProductThunk.pending, (state) => {
        console.log("pending fetchAllProductThunk");
        state.isLoading = true;
      })
      .addCase(fetchAllProductThunk.fulfilled, (state, action) => {
        console.log("fulfilled fetchAllProductThunk");
        state.isLoading = false;
        state.productList = action.payload.data;
      })
      .addCase(fetchAllProductThunk.rejected, (state) => {
        console.log("rejected fetchAllProductThunk");
        state.isLoading = false;
      })
      .addCase(deleteProductThunk.pending, (state) => {
        console.log("pending");
        state.isLoading = true;
      })
      .addCase(deleteProductThunk.fulfilled, (state, action) => {
        console.log("fulfilled");
        state.isLoading = false;
        state.product = action.payload.data;
      })
      .addCase(deleteProductThunk.rejected, (state) => {
        console.log("rejected");
        state.isLoading = false;
      })
      .addCase(editProductThunk.pending, (state) => {
        console.log("pending");
        state.isLoading = true;
      })
      .addCase(editProductThunk.fulfilled, (state, action) => {
        console.log("fulfilled");
        state.isLoading = false;
        state.product = action.payload.data;
      })
      .addCase(editProductThunk.rejected, (state) => {
        console.log("rejected");
        state.isLoading = false;
      });
  },
});

export const { setValue } = productSlice.actions;
export default productSlice.reducer;
