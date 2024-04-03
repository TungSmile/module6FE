import {createSlice} from "@reduxjs/toolkit";
import {getAllActiveSupplies, setChosenSupplies, updateUserSupply, getSupplyByUserID, getSupplyByUserID2} from "../service/SupplyService";

const initialState = {
    supplies : {
        all : [],
        chosen : [],
        user:[],
        userSupplies: []
    },
}

const SupplySlice = createSlice({
    name : "supplies",
    initialState,
    reducers : {},
    extraReducers: builder => {
        builder.addCase(getAllActiveSupplies.fulfilled, (state, action) => {
            state.supplies.all = action.payload;
        })
        builder.addCase(setChosenSupplies.fulfilled, (state, action) => {
            state.supplies.chosen = action.payload;
        })
        builder.addCase(getSupplyByUserID.fulfilled, (state, action) => {
            state.supplies.user = action.payload;
        })
        builder.addCase(getSupplyByUserID2.fulfilled, (state, action) => {
            state.supplies.userSupplies = action.payload;
        })
        builder.addCase(updateUserSupply.fulfilled, (state, action) => {
            state.supplies.userSupplies = action.payload;
        })
    }
})

export default SupplySlice.reducer;