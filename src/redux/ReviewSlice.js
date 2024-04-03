import {createSlice} from "@reduxjs/toolkit";
import {getAllReviewsByProviderUsername, isAbleToReview, sendReview} from "../service/ReviewService";

const initialState = {
    reviews: {
        byProviderUsername: [],
        isAble: false
    }
}

const ReviewSlice = createSlice({
    name: "reviews",
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(getAllReviewsByProviderUsername.fulfilled, (state, action) => {
            state.reviews.byProviderUsername = action.payload;
        })
        builder.addCase(isAbleToReview.fulfilled, (state, action) => {
            state.reviews.isAble = action.payload;
        })
        builder.addCase(sendReview.fulfilled, (state, action) => {
            state.reviews.byProviderUsername.unshift(action.payload);
            state.reviews.isAble = false;
        })
    }
})

export default ReviewSlice.reducer;