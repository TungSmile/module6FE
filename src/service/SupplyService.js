import {createAsyncThunk} from "@reduxjs/toolkit";
import customAxios from "./api";

export const getAllActiveSupplies = createAsyncThunk(
    "getAllActiveSupplies",
    async () => {
        const res = await customAxios.get("supplies/getAllActive", {headers: {Authorization: "Bearer " + localStorage.getItem("token")}});
        return res.data;
    }
)

export const setChosenSupplies = createAsyncThunk(
    "setChosenSupplies",
    async (supplies) => {
        return supplies;
    }
)

export const getSupplyByUserID = createAsyncThunk(
    "getSupplyByUserID",
    async (idUser) => {
        const rs = await customAxios.get("supplies/getSupplyByUserID?id=" + idUser,{headers: {Authorization: "Bearer " + localStorage.getItem("token")}});
        return rs.data;
    }
)

export const getSupplyByUserID2 = createAsyncThunk(
    "getSupplyByUserID2",
    async (idUser) => {
        const rs = await customAxios.get("supplies/getSupplyByUserID2?id=" + idUser,{headers: {Authorization: "Bearer " + localStorage.getItem("token")}});
        console.log(rs)
        return rs.data;
    }
)

export const updateUserSupply = createAsyncThunk(
    "updateUserSupply",
    async (supplies) => {
        return supplies;
    }
)