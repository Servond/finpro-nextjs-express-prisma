import { createSlice, Dispatch, PayloadAction } from '@reduxjs/toolkit';
import parseJWT from '@/util/parseJWT';
import instance from '@/util/axiosInstances';

type User = {
    userId: number;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    referralCode: string;
    pointBalance: number;
    roleId: number;
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
        userId: 0,
        username: '',
        email: '',
        firstName: '',
        lastName: '',
        referralCode: '',
        pointBalance: 0,
        roleId: 0,
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

        updateUserProfile: (state: Auth, action: PayloadAction<Partial<User>>) => {
            state.user = { ...state.user, ...action.payload };
        },
        loadUserFromLocalStorage: (state: Auth, action: PayloadAction<User>) => {
            const user = action.payload;
            if (user) {
                state.user = user;
                state.loginStatus.isLogin = true;
            }
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
                        userId: payload?.userId,
                        username: payload?.username,
                        email: payload?.email,
                        firstName: payload?.first_name,
                        lastName: payload?.last_name,
                        referralCode: payload?.referral_code,
                        pointBalance: payload?.point_balance,
                        roleId: payload?.role_id,
                        roleName: payload?.role_name,
                    }),
                );
                localStorage.setItem('user', JSON.stringify(payload));
                localStorage.setItem('token', String(data?.data));
            } catch (error) {
                throw error;
            }
        };

export const logout = () => async (dispatch: Dispatch) => {
    try {
        dispatch(logOutState());
        localStorage.removeItem('user');
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
                userId: payload?.userId,
                username: payload?.username,
                email: payload?.email,
                firstName: payload?.first_name,
                lastName: payload?.last_name,
                referralCode: payload?.referral_code,
                pointBalance: payload?.point_balance,
                roleId: payload?.role_id,
                roleName: payload.role_name,
            }),
        );
        localStorage.setItem('user', JSON.stringify(payload));
        localStorage.setItem('token', String(data?.data));
    } catch (error) {
        console.log(error);
    }
};

export const updateUser =
    (userId: number, updateData: Partial<User>) => async (dispatch: Dispatch) => {
        try {
            const { data } = await instance.patch(
                `/user/profile/${userId}`,
                updateData,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                },
            );
            dispatch(updateUserProfile(updateData));
        } catch (error) {
            throw error;
        }
    };

export const loadUser = () => (dispatch: Dispatch) => {
    const user = localStorage.getItem('user');
    if (user) {
        dispatch(loadUserFromLocalStorage(JSON.parse(user)));
    }
};

export const {
    loginState,
    logOutState,
    tokenValidState,
    updateUserProfile,
    loadUserFromLocalStorage,
} = authSlice.actions;

export default authSlice.reducer;