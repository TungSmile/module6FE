import {createSlice} from "@reduxjs/toolkit";
import {
    activeAccount,
    getAccountCCDVFilter,
    getAccountUserFilter,
    getAllBill,
    getAllCCDV,
    getAllUser, getListReport
} from "../service/AdminService";

const initialState = {
    admin: {
        allBill: [],
        allUser: [],
        allCCDV: [],
        allUserFilter:[],
        allCCDVFilter:[],
        blockAccount: '',
        activeAccount:'',
        listReport:[]
    }
}
const AdminSlice = createSlice({
    name : "admin",
    initialState,
    reducers : {},
    extraReducers: builder => {
        builder.addCase(getAllBill.fulfilled, (state, action) => {
            state.admin.allBill = action.payload;
        })
        builder.addCase(getAllUser.fulfilled, (state, action) => {
            state.admin.allUser = action.payload;
        })
        builder.addCase(getAllCCDV.fulfilled, (state, action) => {
            state.admin.allCCDV = action.payload;
        })
        builder.addCase(getAccountUserFilter.fulfilled, (state, action) => {
            state.admin.allUserFilter = action.payload;
        })
        builder.addCase(getAccountCCDVFilter.fulfilled, (state, action) => {
            state.admin.allCCDVFilter = action.payload;
        })
        builder.addCase(activeAccount.fulfilled, (state, action) => {
            state.admin.activeAccount = action.payload;
        })
        builder.addCase(getListReport.fulfilled, (state, action) => {
            state.admin.listReport = action.payload;
        })
    }
})
export default AdminSlice.reducer;