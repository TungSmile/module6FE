import {createAsyncThunk} from "@reduxjs/toolkit";
import customAxios from "./api";

export const getAllBillByIdCCDV = createAsyncThunk(
    "getAllBillByIdCCDV",
    async (idCCDV) => {
        const res = await customAxios.get("bills/getAllBilByIdCCdv/" + idCCDV, {headers: {Authorization: "Bearer " + localStorage.getItem("token")}});
        console.log(res)
        return res.data;
    }
)

export const getAllBillByIdUser = createAsyncThunk(
    "getAllBillByIDCCDV",
    async (idUser) => {
        const res = await customAxios.get("bills/getAllBilByIdUser/" + idUser, {headers: {Authorization: "Bearer " + localStorage.getItem("token")}});
        return res.data;
    }
)

export const cancelBill = createAsyncThunk(
    "cancelBill",
    async ({idBill, idAccount, message}) => {
        const res = await customAxios.post(`bills/cancelBill/${idBill}/${idAccount}/${message}`, {Authorization: "Bearer " + localStorage.getItem("token")});
        return res.data
    }
)

export const setCancelBill = createAsyncThunk(
    "setCancelBill",
    async (string) => {
        return string;
    }
)

export const completes = createAsyncThunk(
    "completes",
    async (idBill) => {
        const res = await customAxios.post("bills/completeBill/" + idBill, {Authorization: "Bearer " + localStorage.getItem("token")});
        return res.data;
    }
)

export const receivedBill = createAsyncThunk(
    "receivedBill",
    async (idBill) => {
        const res = await customAxios.post("bills/receivedBill/" + idBill, {Authorization: "Bearer " + localStorage.getItem("token")});
        console.log(res)
        return res.data;
    }
)
export const getAllBillIn7DayByCCDV = createAsyncThunk(
    "getAllBillIn7DayByCCDV",
    async (idCCDV) => {
        const res = await customAxios.get("/bills/getAllBill7DayByIDCCDV?id=" + idCCDV, {Authorization: "Bearer " + localStorage.getItem("token")});
        return res.data
    }
)

export const setFocusBillId = createAsyncThunk(
    "setFocusBillId",
    async (billId) => {
        return billId;
    }
)

