import {createAsyncThunk} from "@reduxjs/toolkit";
import customAxios from "./api";

export const checkToken = createAsyncThunk(
    "checkToken",
    async () => {
        console.log(1)
        try {
            const res = await customAxios.post("userDetail/checkToken", "", {headers: {Authorization: "Bearer " + localStorage.getItem("token")}})
            console.log(2)
            return res.data;
        } catch (e) {
            return null;
        }

    }
)

export const setUser = createAsyncThunk(
    "setUser",
    async (data) => {
        return data;
    }
)