import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axios from "../../config/axios";

export const SignIn = createAsyncThunk(
  "/user/signIn",
  async (user, thunkAPI) => {
    try {
      const response = await axios.post("/auth/signin", user);
      // axios.defaults.headers.common = {
      //   Authorization: `bearer ${response.data.token.token}`,
      // };
      return response.data;
    } catch (err) {
      if (err.response && err.response.data) {
        return thunkAPI.rejectWithValue({
          err: err.response.data,
          status: err.response.status,
        });
      } else {
        return thunkAPI.rejectWithValue({
          err: "Network Error",
        });
      }
    }
  }
);

export const NewUser = createAsyncThunk(
  "user/signUp",
  async (user, thunkAPI) => {
    try {
      const response = await axios.post("/auth/signUp", user);
      // axios.defaults.headers.common = {
      //   Authorization: `bearer ${response.data.token.token}`,
      // };
      return response.data;
    } catch (err) {
      if (err.response && err.response.data) {
        return thunkAPI.rejectWithValue({
          err: err.response.data,
          status: err.response.status,
        });
      } else {
        return thunkAPI.rejectWithValue({
          err: "Network Error",
        });
      }
    }
  }
);

export const SendEmail = createAsyncThunk(
  "sendEmail",
  async (email, thunkAPI) => {
    try {
      const response = await axios.post("/auth/forgetpassword", { email });
      return response.data;
    } catch (err) {
      if (err.response && err.response.data) {
        return thunkAPI.rejectWithValue({
          err: err.response.data,
          status: err.response.status,
        });
      } else {
        return thunkAPI.rejectWithValue({
          err: "Network Error",
        });
      }
    }
  }
);

export const ResetPassword = createAsyncThunk(
  "/user/resetpassword",
  async (user, thunkAPI) => {
    try {
      const response = await axios.put(
        "/auth/resetpassword",
        { password: user.password },
        {
          headers: {
            Authorization: `bearer ${user.token}`,
          },
        }
      );
      return response.data;
    } catch (err) {
      if (err.response && err.response.data) {
        return thunkAPI.rejectWithValue({
          err: err.response.data,
          status: err.response.status,
        });
      } else {
        return thunkAPI.rejectWithValue({
          err: "Network Error",
        });
      }
    }
  }
);

//logic removed as we are not using local storage anymore

// export const checkToken = createAsyncThunk(
//   "/checkToken",
//   async (user, thunkAPI) => {
//     try {
//       const response = await axios.get("/test");
//       return response.data;
//     } catch (err) {
//       if (err.response && err.response.data) {
//         return thunkAPI.rejectWithValue({
//           err: err.response.data,
//           status: err.response.status,
//         });
//       } else {
//         return thunkAPI.rejectWithValue({
//           err: "Network Error",
//         });
//       }
//     }
//   }
// );

const auth = createSlice({
  name: "auth",
  initialState: {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    message: "",
    agreePolicy: false,
    loading: false,
    err: "",
    done: false,
    emailSent: null,
    signup: null,
    routeLoading: true,
    isLogged: null,
    token: "",
    userId: "",
  },
  reducers: {
    SetState(state, { payload: { field, value } }) {
      state[field] = value;
    },
    ClearState(state, action) {
      return {
        name: "",
        email: "",
        password: "",
        err: "",
        done: false,
        confirmPassword: "",
        emailSent: null,
        signup: null,
        agreePolicy: false,
      };
    },
    logout(state, action) {
      return {
        name: "",
        email: "",
        userId: "",
        token: "",
        loading: false,
        done: false,
        isLogged: false,
      };
    },
  },
  extraReducers: {
    [SignIn.pending]: (state, action) => {
      return {
        ...state,
        loading: true,
      };
    },
    [SignIn.fulfilled]: (state, action) => {
      return {
        name: action.payload.user.name,
        email: action.payload.user.email,
        userId: action.payload.token.userId,
        token: action.payload.token.token,
        loading: false,
        done: true,
        isLogged: true,
      };
    },
    [SignIn.rejected]: (state, action) => {
      return {
        ...state,
        loading: false,
        err: action.payload.err,
      };
    },
    [NewUser.pending]: (state, action) => {
      return {
        ...state,
        loading: true,
      };
    },
    [NewUser.fulfilled]: (state, action) => {
      return {
        ...state,
        name: action.payload.user.name,
        email: action.payload.user.email,
        userId: action.payload.token.userId,
        token: action.payload.token.token,
        message: action.payload.token,
        loading: false,
        isLogged: true,
        err: "",
        signup: true,
      };
    },
    [NewUser.rejected]: (state, action) => {
      return {
        ...state,
        loading: false,
        err: action.payload.err,
      };
    },
    [SendEmail.pending]: (state, action) => {
      return {
        ...state,
        loading: true,
      };
    },
    [SendEmail.fulfilled]: (state, action) => {
      return {
        ...state,
        loading: false,
        err: "",
        emailSent: true,
        message: action.payload,
      };
    },
    [SendEmail.rejected]: (state, action) => {
      return {
        ...state,
        loading: false,
        err: action.payload.err,
      };
    },
    [ResetPassword.pending]: (state, action) => {
      return {
        ...state,
        loading: true,
      };
    },
    [ResetPassword.fulfilled]: (state, action) => {
      return {
        ...state,
        loading: false,
        err: '',
        done: true,
        message: action.payload
      };
    },
    [ResetPassword.rejected]: (state, action) => {
      return {
        ...state,
        loading: false,
        done: false,
        err: action.payload.err,
      };
    },

    //logic removed as we are not using local storage anymore

    // [checkToken.pending]: (state, action) => {
    //   return {
    //     ...state,
    //     routeLoading: true,
    //   };
    // },
    // [checkToken.fulfilled]: (state, action) => {
    //   return {
    //     ...state,
    //     isLogged: true,
    //     routeLoading: false,
    //   };
    // },
    // [checkToken.rejected]: (state, action) => {
    //   return {
    //     ...state,
    //     isLogged: false,
    //     routeLoading: false,
    //   };
    // },
  },
});

const { reducer, actions } = auth;

export const { SetState, ClearState, logout } = actions;

export default reducer;
