import { apiBaseUrl } from "@/config/constants";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isAuthenticated: false,
  isLoading: false,
  user: null,
  checkingAuth: false,
};

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${apiBaseUrl}/auth/signUp`, formData, {
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

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${apiBaseUrl}/auth/login`, formData, {
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

export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${apiBaseUrl}/auth/logout`, formData, {
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

export const checkAuth = createAsyncThunk(
  "auth/check-auth",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${apiBaseUrl}/auth/check-auth`, {
        withCredentials: true,
        headers: {
          "cache-control":
            "no-store, no-cache, must-revalidate, proxy-revalidate",
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setValue: () => {},
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        console.log("pending registerUser");
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        console.log("fullfiled registerUser");
        state.isLoading = false;
        state.user = action.payload.user;
        state.isAuthenticated = true;
      })
      .addCase(registerUser.rejected, (state) => {
        console.log("rejected registerUser");
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(loginUser.pending, (state) => {
        console.log("pending loginUser");
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        console.log("fullfiled loginUser");
        state.isLoading = false;
        state.user = action.payload.user;
        state.isAuthenticated = true;
      })
      .addCase(loginUser.rejected, (state) => {
        console.log("rejected loginUser");
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(logoutUser.pending, (state) => {
        console.log("pending logoutUser");
        state.isLoading = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        console.log("fullfiled logoutUser");
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(logoutUser.rejected, (state) => {
        console.log("rejected logoutUser");
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(checkAuth.pending, (state) => {
        console.log("pending checkAuth");
        state.checkingAuth = true;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        console.log("fullfiled checkAuth");
        state.checkingAuth = false;
        state.user = action.payload.user;
        state.isAuthenticated = true;
      })
      .addCase(checkAuth.rejected, (state) => {
        console.log("rejected checkAuth");
        state.checkingAuth = false;
        state.user = null;
        state.isAuthenticated = false;
      });
  },
});

export const { setValue } = authSlice.actions;
export default authSlice.reducer;
