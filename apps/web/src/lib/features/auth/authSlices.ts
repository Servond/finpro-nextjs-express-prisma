import { createSlice, Dispatch, PayloadAction } from '@reduxjs/toolkit';
import parseJWT from '@/utils/parseJwt';
import instance from '@/utils/axiosInstance';

type User = {
  username: string;
  email: string;
  roleName: string;
};

type LoginStatus = {
  isLogin: boolean;
};

interface Auth {
  user: User;
  loginStatus: LoginStatus;
}

const initialState: Auth = {
  user: {
    username: '',
    email: '',
    roleName: '',
  },
  loginStatus: {
    isLogin: false,
  },
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginState: (state: Auth, action: PayloadAction<User>) => {
      const user = action.payload;
      state.user = user;
      state.loginStatus.isLogin = true;
    },

    logOutState: (state: Auth) => {
      state.user = initialState.user;
      state.loginStatus = initialState.loginStatus;
    },

    tokenValidState: (state: Auth, action: PayloadAction<User>) => {
      const user = action.payload;
      state.user = user;
      state.loginStatus.isLogin = true;
    },
  },
});

export const register =
  (params: {
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    accountType: number;
    password: string;
    referral: string;
  }) =>
  async (dispacth: Dispatch) => {
    try {
      const {
        username,
        email,
        firstName,
        lastName,
        accountType,
        password,
        referral,
      } = params;

      await instance.post('/auth/register', {
        username,
        email,
        first_name: firstName,
        last_name: lastName,
        role_id: Number(accountType),
        password,
        referral_code: referral,
      });
    } catch (error) {
      throw error;
    }
  };

export const login =
  (params: { username: string; password: string }) =>
  async (dispatch: Dispatch) => {
    try {
      const { username, password } = params;

      const { data } = await instance.post('/auth/login', {
        username,
        password,
      });

      const payload = await parseJWT(data?.data);

      console.log(payload);

      dispatch(
        loginState({
          username: payload?.username,
          email: payload?.email,
          roleName: payload?.role_name,
        }),
      );
      localStorage.setItem('token', String(data?.data));
    } catch (error) {
      throw error;
    }
  };

export const logout = () => async (dispatch: Dispatch) => {
  try {
    dispatch(logOutState());
    localStorage.removeItem('token');
  } catch (error) {
    console.log(error);
  }
};

export const checkToken = (token: string) => async (dispatch: Dispatch) => {
  try {
    const { data } = await instance.get('/auth', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const payload = await parseJWT(data?.data);
    dispatch(
      tokenValidState({
        username: payload?.username,
        email: payload?.email,
        roleName: payload.role_name,
      }),
    );
    localStorage.setItem('token', String(data?.data));
  } catch (error) {
    console.log(error);
  }
};

export const { loginState, logOutState, tokenValidState } = authSlice.actions;

export default authSlice.reducer;