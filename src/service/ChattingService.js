import {createAsyncThunk} from "@reduxjs/toolkit";
import customAxios from "./api";

export const setStompClient = createAsyncThunk(
    "setStompClient",
    async (data) => {
        return data;
    }
)

export const getAllChatReceivers = createAsyncThunk(
    "getAllChatReceivers",
    async (id) => {
        const res = await customAxios.get("accounts/messageReceivers", {headers: {Authorization: "Bearer " + localStorage.getItem("token")}});
        return res.data;
    }
)

export const addChatReceivers = createAsyncThunk(
    "addChatReceivers",
    async (receivers) => {
        return receivers;
    }
)

export const updateChatReceivers = createAsyncThunk(
    "updateChatReceivers",
    async (message) => {
        return message;
    }
)

export const getChatWithReceiver = createAsyncThunk(
    "getChatWithReceiver",
    async (id) => {
        const res = await customAxios.get("message/allBySenderAndReceiver/" + id, {headers: {Authorization: "Bearer " + localStorage.getItem("token")}});
        return res.data;
    }
)

export const setChatWithReceiver = createAsyncThunk(
    "setChatWithReceiver",
    async (chatContent) => {
        return chatContent;
    }
)

export const addChatWithReceiver = createAsyncThunk(
    "addChatWithReceiver",
    async (newMessage) => {
        return newMessage;
    }
)

export const setMsgBoxToggle = createAsyncThunk(
    "setMsgBoxToggle",
    async () => {
        return null;
    }
)

export const setActiveReceiver = createAsyncThunk(
    "setActiveReceiver",
    async (activeReceiver) => {
        return activeReceiver;
    }
)

export const setReadMessageReceiver = createAsyncThunk(
    "setReadMessageReceiver",
    async (receiverId) => {
        return receiverId;
    }
)

// Notification
export const getAllNotifications = createAsyncThunk(
    "getAllNotifications",
    async (userId) => {
        const res = await customAxios.get("message/getAllNotifications/" + userId, {headers: {Authorization: "Bearer " + localStorage.getItem("token")}});
        return res.data;
    }
)

export const addNotification = createAsyncThunk(
    "addNotification",
    async (newNotification) => {
        return newNotification;
    }
)

export const confirmReadNotification = createAsyncThunk(
    "confirmReadNotification",
    async (notificationId) => {
        await customAxios.post("message/confirmReadNotification/" + notificationId, "", {headers: {Authorization: "Bearer " + localStorage.getItem("token")}});
        return notificationId;
    }
)

export const confirmReadAllNotifications = createAsyncThunk(
    "confirmReadAllNotifications",
    async (userId) => {
        await customAxios.post("message/confirmReadAllNotifications/" + userId, "", {headers: {Authorization: "Bearer " + localStorage.getItem("token")}});
        return userId;
    }
)