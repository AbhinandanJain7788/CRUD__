// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import API from "../api/axios";
// import jwtDecode from "jwt-decode";
// // Register
// export const registerUser = createAsyncThunk("auth/register", async (formData, { rejectWithValue }) => {
//   try {
//     const res = await API.post("/auth/register", formData);
//     return res.data;
//   } catch (err) {
//     return rejectWithValue(err.response.data.error || "Registration failed");
//   }
// });

// // Login
// export const loginUser = createAsyncThunk("auth/login", async (formData, { rejectWithValue }) => {
//   try {
//     const res = await API.post("/auth/login", formData);
//     localStorage.setItem("token", res.data.token);
//     return res.data;
//   } catch (err) {
//     return rejectWithValue(err.response.data.error || "Login failed");
//   }
// });

// const authSlice = createSlice({
//   name: "auth",
//   initialState: {
//     token: localStorage.getItem("token") || null,
//     user: null,
//     loading: false,
//     error: null,
//   },
//   reducers: {
//     logout: (state) => {
//       state.token = null;
//       state.user = null;
//       localStorage.removeItem("token");
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(registerUser.pending, (state) => { state.loading = true; state.error = null; })
//       .addCase(registerUser.fulfilled, (state) => { state.loading = false; })
//       .addCase(registerUser.rejected, (state, action) => { state.loading = false; state.error = action.payload; })

//       .addCase(loginUser.pending, (state) => { state.loading = true; state.error = null; })
//       .addCase(loginUser.fulfilled, (state, action) => {
//         state.loading = false;
//         state.token = action.payload.token;
//         // decode role from JWT if needed
//         const decoded = jwtDecode(action.payload.token);
//         state.user = { id: decoded.id, role: decoded.role };
//       })
//       .addCase(loginUser.rejected, (state, action) => { state.loading = false; state.error = action.payload; });
//   },
// });

// export const { logout } = authSlice.actions;
// export default authSlice.reducer;



import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../api/axios";
import {jwtDecode} from "jwt-decode";

// Register
export const registerUser = createAsyncThunk("auth/register", async (formData, { rejectWithValue }) => {
  try {
    const res = await API.post("/auth/register", formData);
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response.data.error || "Registration failed");
  }
});

// Login
export const loginUser = createAsyncThunk("auth/login", async (formData, { rejectWithValue }) => {
  try {
    const res = await API.post("/auth/login", formData);
    localStorage.setItem("token", res.data.token);
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response.data.error || "Login failed");
  }
});

// ✅ Decode token if already in localStorage
const token = localStorage.getItem("token");
let user = null;
if (token) {
  try {
    const decoded = jwtDecode(token);
    user = { id: decoded.id, role: decoded.role };
  } catch (e) {
    console.error("Invalid token in localStorage");
    localStorage.removeItem("token");
  }
}

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: token || null,
    user: user, // 👈 preload user if token exists
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.token = null;
      state.user = null;
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(registerUser.fulfilled, (state) => { state.loading = false; })
      .addCase(registerUser.rejected, (state, action) => { state.loading = false; state.error = action.payload; })

      .addCase(loginUser.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;

        // ✅ decode role + id from JWT after login
        const decoded = jwtDecode(action.payload.token);
        state.user = { id: decoded.id, role: decoded.role };
      })
      .addCase(loginUser.rejected, (state, action) => { state.loading = false; state.error = action.payload; });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
