import {createAsyncThunk} from "@reduxjs/toolkit";
import customAxios from "./api";

export const getAllBill = createAsyncThunk(
    "getAllBill",
    async (idStatus) => {
        const res = await customAxios.get("admin/findBillByIdStatus?idStatus=" + idStatus , {headers: {Authorization: "Bearer " + localStorage.getItem("token")}});
        return res.data;
    }
)

export const getAllUser = createAsyncThunk(
    "getAllUser",
    async () => {
        const res = await customAxios.get("admin/getAllUser/" , {headers: {Authorization: "Bearer " + localStorage.getItem("token")}});
        return res.data;
    }
)

export const blockAccount = createAsyncThunk(
    "blockAccount",
    async (idAccount) => {
        const res = await customAxios.post("admin/blockAccount/" + idAccount , {headers: {Authorization: "Bearer " + localStorage.getItem("token")}});
        return res.data;
    }
)
export const getAllCCDV = createAsyncThunk(
    "getAllCCDV",
    async () => {
        const res = await customAxios.get("admin/getAllCCDV/" , {headers: {Authorization: "Bearer " + localStorage.getItem("token")}});
        return res.data;
    }
)

export const getAccountUserFilter = createAsyncThunk(
    "getAccountUserFilter",
    async (filterUser) => {
        const res = await customAxios.post("admin/getAccountUserFilter/",filterUser , {headers: {Authorization: "Bearer " + localStorage.getItem("token")}});
        return res.data;
    }
)
export const getAccountCCDVFilter = createAsyncThunk(
    "getAccountCCDVFilter",
    async (filterCCDV) => {
        const res = await customAxios.post("admin/getAccountCCDVFilter/",filterCCDV , {headers: {Authorization: "Bearer " + localStorage.getItem("token")}});
        return res.data;
    }
)
export const activeAccount = createAsyncThunk(
    "activeAccount",
    async (usernameCCDV) => {
        const res = await customAxios.post("admin/" + usernameCCDV , {headers: {Authorization: "Bearer " + localStorage.getItem("token")}});
        return res.data;
    }
)
export const getListReport = createAsyncThunk(
    "getListReport",
    async (username) => {
        const res = await customAxios.post("reports/getAccountReceiverReport?usernameParam=" + username , {headers: {Authorization: "Bearer " + localStorage.getItem("token")}});
        console.log(res.data )
        return res.data;
    }
)



