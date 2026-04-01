import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/lib/api";

const initialState = {
  isAuthenticated: false,
  user: null,
  loading: true, // penting
};

export const fetchUser = createAsyncThunk(
  "auth/fetchUser",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/api/me");

      return res;

    } catch (err) {
      return rejectWithValue(err.data);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
        state.loading = false;
      })
      .addCase(fetchUser.rejected, (state) => {
        state.user = null;
        state.isAuthenticated = false;
        state.loading = false; // 🔥 INI YANG SERING LUPA
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
