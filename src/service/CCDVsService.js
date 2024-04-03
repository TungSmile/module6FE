import {createAsyncThunk} from "@reduxjs/toolkit";
import customAxios from "./api";

export const getNewestCCDVs = createAsyncThunk(
    "getNewestCCDVs",
    async (qty) => {
        const res = await customAxios.get("userDetail/newestCCDVs/" + qty, {headers: {Authorization: "Bearer " + localStorage.getItem("token")}});
        return res.data;
    }
)

export const getCCDVsBySupplies = createAsyncThunk(
    "getCCDVsBySupplies",
    async (supplies) => {
        const res = await customAxios.post("userDetail/searchBySupplies", supplies, {headers: {Authorization: "Bearer " + localStorage.getItem("token")}})
        return res.data;
    }
)
export const getTopMale = createAsyncThunk(
    "getTopMale",
    async (qty) => {
        const res = await customAxios.get("userDetail/get4MaleCCDVs/" +  qty,{headers: {Authorization: "Bearer " + localStorage.getItem("token")}});
        return res.data;
    }
)
export const getTopFemale = createAsyncThunk(
    "getTopFemale",
    async (qty) => {
        const res = await customAxios.get("userDetail/get8FemaleCCDVs/" + qty ,{headers: {Authorization: "Bearer " + localStorage.getItem("token")}});
        return res.data;
    }
)

export const getCCDVProperGender = createAsyncThunk(
    "getCCDVProperGender",
    async (idUser) => {
        const rs = await customAxios.get("userDetail/listCCDVHaveProperGender?id=" + idUser,{headers: {Authorization: "Bearer " + localStorage.getItem("token")}});
        return rs.data;
    }
)

export const getCCDVsByTopViews = createAsyncThunk(
    "getCCDVsByTopViews",
    async (qty) => {
        const rs = await customAxios.get("userDetail/topService/" + qty,{headers: {Authorization: "Bearer " + localStorage.getItem("token")}});
        return rs.data;
    }
)

export const searchCCDV = createAsyncThunk(
    "searchCCDV",
    async (filter) => {
        const rs = await customAxios.post("userDetail/filterByCCDv" , filter,{headers: {Authorization: "Bearer " + localStorage.getItem("token")}});
        return rs.data;
    }
)
