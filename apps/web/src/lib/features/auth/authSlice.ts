import { createSlice, Dispatch, PayloadAction } from "@reduxjs/toolkit";
import { IUsers } from "@/interface/user.interface";
import parseJWT from "@/utils/parseJwt";
import instance from "@/utils/axiosInstance";
import { getCookie } from "cookies-next";

type User = {
  email: string;
  isVerified: boolean;
  avatar?: string;
};

type Status = {
  isLogin: boolean;
};

interface Auth {
  user: User;
  status: Status;
}

const initialState: Auth = {
  user: {
    email: "",
    isVerified: false,
    avatar: "",
  },
  status: {
    isLogin: false,
  },
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginState: (state: Auth, action: PayloadAction<User>) => {
      const user = action.payload;
      state.user = user;
      state.status.isLogin = true;
    },
    logoutState: (state: Auth) => {
      state.user = initialState.user;
      state.status = initialState.status;
    },
  },
});

export const { loginState, logoutState } = authSlice.actions;

export default authSlice.reducer;
