import {createAsyncThunk} from "@reduxjs/toolkit";
import customAxios from "./api";

export const getAllReviewsByProviderUsername = createAsyncThunk(
    "getAllReviewsByProviderUsername",
    async (username) => {
        const res = await customAxios.get("reviews/allActiveByCCDV_Username/" + username,{headers: {Authorization: "Bearer " + localStorage.getItem("token")}});
        console.log(res.data);
        return res.data;
    }
)

export const isAbleToReview = createAsyncThunk(
    "isAbleToReview",
    async (ids) => {
        const {ccdvId, userId} = ids;
        const res = await customAxios.get(`reviews/isAbleToReview?ccdvId=${ccdvId}&userId=${userId}`,{headers: {Authorization: "Bearer " + localStorage.getItem("token")}});
        return res.data;
    }
)

export const sendReview = createAsyncThunk(
    "sendReview",
    async (review) => {
        const res = await customAxios.post(`reviews/sendReview`, review,{headers: {Authorization: "Bearer " + localStorage.getItem("token")}});
        return res.data;
    }
)