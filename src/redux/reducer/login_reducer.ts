import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginUser } from "../api_services/login_services";

// You can use this object if needed elsewhere:
interface AuthState {
  token: string;
  loggedInUser: string;
  userRole: string;
  user: string;
  status: string;
  loading: boolean;
  error: string;
  success: boolean;
}

const initialState: AuthState = {
  loggedInUser: "",
  user: "",
  userRole: "",
  token: "",
  status: "",
  loading: false,
  error: "",
  success: true,
};

export const loginUserAsync = createAsyncThunk(
  "user/loginUser",
  async (
    { email, password }: { email: string; password: string },
    { rejectWithValue, fulfillWithValue }
  ) => {
    try {
      const response: any = loginUser({ email, password });
      if (!response.success) {
        return rejectWithValue(response.message || "Login failed");
      }
      return fulfillWithValue(response);
    } catch (err: any) {
      return rejectWithValue(err.message || "An error occurred");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.error = null;
      state.success = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUserAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUserAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(loginUserAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = "";
        state.success = false;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
