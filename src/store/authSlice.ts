import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

interface AuthState {
    user: string | null;
    error: string | null;
}

const initialState: AuthState = {
    user: localStorage.getItem("user") || null,
    error: null,
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action: PayloadAction<{ username: string; password: string }>) => {
            const { username, password } = action.payload;

            if (username === "admin" && password === "password123!") {
                state.user = username;
                state.error = null;
                localStorage.setItem("user", username);
            } else {
                state.error = "Invalid username or password";
            }
        },
        logout: (state) => {
            state.user = null;
            state.error = null;
            localStorage.removeItem("user");
        },
    },
});

export const { login, logout } = authSlice.actions;
export const selectUser = (state: RootState) => state.auth.user;
export const selectAuthError = (state: RootState) => state.auth.error;
export default authSlice.reducer;