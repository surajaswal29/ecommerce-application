import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

export const registerUser = createAsyncThunk(
    "user/register",
    async (user, { rejectWithValue }) => {
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                },
                data: JSON.stringify(user),
                method: "POST",
            }

            const { data } = await axios(
                `${import.meta.env.VITE_API_URI}/user/register`,
                config
            )

            console.log(data)
            return data.message
        } catch (error) {
            console.log(error)
            return rejectWithValue(error.response.data.error)
        }
    }
)

export const verifyOtp = createAsyncThunk(
    "user/verifyOtp",
    async (body, { rejectWithValue }) => {
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                },
                data: JSON.stringify(body),
                method: "POST",
            }

            const { data } = await axios(
                `${import.meta.env.VITE_API_URI}/user/verify_email`,
                config
            )

            console.log(data)
            return data.message
        } catch (error) {
            console.log(error)
            return rejectWithValue(error.response.data.error)
        }
    }
)

export const resendOtp = createAsyncThunk(
    "user/resendOtp",
    async (body, { rejectWithValue }) => {
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                },
                data: JSON.stringify(body),
                method: "POST",
            }

            const { data } = await axios(
                `${import.meta.env.VITE_API_URI}/user/resend_verification_otp`,
                config
            )

            console.log(data)
            return data.message
        } catch (error) {
            console.log(error)
            return rejectWithValue(error.response.data.error)
        }
    }
)

export const loginUser = createAsyncThunk(
    "user/login",
    async (body, { rejectWithValue }) => {
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                },
                data: JSON.stringify(body),
                method: "POST",
                credentials: "include",
                withCredentials: true,
            }

            const { data } = await axios(
                `${import.meta.env.VITE_API_URI}/user/login`,
                config
            )

            console.log(data)
            return data.message
        } catch (error) {
            console.log(error)
            return rejectWithValue(error.response.data.error)
        }
    }
)

export const getUserInfo = createAsyncThunk(
    "user/getUserInfo",
    async (_, { rejectWithValue }) => {
        try {
            const config = {
                method: "GET",
                credentials: "include",
                withCredentials: true,
            }

            const { data } = await axios(
                `${import.meta.env.VITE_API_URI}/user/user_info`,
                config
            )


            return data.user
        } catch (error) {
            console.log(error)
            return rejectWithValue(error.response.data.error)
        }
    }
)

export const logoutUser = createAsyncThunk(
    "user/logout",
    async (_, { rejectWithValue }) => {
        try {
            const config = {
                method: "GET",
                credentials: "include",
                withCredentials: true,
            }

            const { data } = await axios(
                `${import.meta.env.VITE_API_URI}/user/logout`,
                config
            )

            return data.message
        } catch (error) {
            console.log(error)
            return rejectWithValue(error.response.data.error)
        }
    }
)

export const addUserAddress = createAsyncThunk(
    "user/addUserAddress",
    async (body, { rejectWithValue }) => {
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                },
                data: JSON.stringify(body),
                method: "POST",
                credentials: "include",
                withCredentials: true,
            }

            const { data } = await axios(
                `${import.meta.env.VITE_API_URI}/user/add_user_address`,
                config
            )

            return data.message
        } catch (error) {
            console.log(error)
            return rejectWithValue(error.response.data.error)
        }
    }
)

export const deleteUserAddress = createAsyncThunk(
    "user/deleteUserAddress",
    async (id, { rejectWithValue }) => {
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                },
                method: "DELETE",
                credentials: "include",
                withCredentials: true,
            }

            const { data } = await axios(
                `${import.meta.env.VITE_API_URI}/user/delete_user_address/${id}`,
                config
            )

            return data.message
        } catch (error) {
            console.log(error)
            return rejectWithValue(error.response.data.error)
        }
    }
)