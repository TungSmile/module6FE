import {createSlice} from "@reduxjs/toolkit";
import {checkToken, setUser} from "../service/UserService";

const initialState = {
    user: {
        current: null
    }
}

const UserSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(checkToken.fulfilled, (state, action) => {
            try {
                state.user.current = action.payload;
                if (action.payload) {
                    let updatedUser = {
                        avatar: action.payload.account.avatar,
                        balance: action.payload.balance,
                        id: action.payload.account.id,
                        isActive: action.payload.account.isActive,
                        nickName: action.payload.account.nickname,
                        role: action.payload.account.role,
                        status: action.payload.account.status,
                        token: JSON.parse(localStorage.getItem("account")).token,
                        username: action.payload.account.username
                    }
                    localStorage.setItem("account", JSON.stringify(updatedUser));
                }
            } catch (e) {}
        })
        builder.addCase(setUser.fulfilled, (state, action) => {
            state.user.current = action.payload;
        })
    }
})

export default UserSlice.reducer;