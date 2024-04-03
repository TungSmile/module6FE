import {createSlice} from "@reduxjs/toolkit";
import {
    addChatReceivers, addChatWithReceiver, addNotification, confirmReadAllNotifications, confirmReadNotification,
    getAllChatReceivers, getAllNotifications,
    getChatWithReceiver,
    setActiveReceiver,
    setChatWithReceiver,
    setMsgBoxToggle, setReadMessageReceiver, setStompClient, updateChatReceivers
} from "../service/ChattingService";
import customAxios from "../service/api";

const initialState = {
    stompClient: null,
    chatting: {
        receivers: [],
        chatContent: [],
        msgBoxToggle: false,
        activeReceiver: {},
        countUnreadReceivers: 0,
        notifications: [],
        countUnreadNotifications: 0,
    }
}

const ChattingSlice = createSlice({
    name: "chatting",
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(setStompClient.fulfilled, (state, action) => {
            state.stompClient = action.payload;
        })
        builder.addCase(getAllChatReceivers.fulfilled, (state, action) => {
            let count = 0;
            state.chatting.receivers = action.payload.map(item => {
                if (state.chatting.activeReceiver && item.lastMessage && state.chatting.activeReceiver.id == item.id && (item.lastMessage.sender.id == item.id)) {
                    let newLastMessage = {...item.lastMessage, isRead: true};
                    customAxios.post("message/setReadMessage/" + item.lastMessage.id, "", {headers: {Authorization: "Bearer " + localStorage.getItem("token")}}).then(r => {});
                    return {...item, lastMessage: newLastMessage};
                    }
                if (item.lastMessage && !item.lastMessage.isRead && (item.lastMessage.sender.id == item.id)) {
                    count++;
                }
                return item;
            });
            state.chatting.countUnreadReceivers = count;
        })
        builder.addCase(addChatReceivers.fulfilled, (state, action) => {
            let check = false;
            for (let i = 0; i < state.chatting.receivers.length; i++) {
                if (state.chatting.receivers[i].id == action.payload.id) {
                    check = true;
                    break;
                }
            }
            if (!check) {
                state.chatting.receivers = [action.payload, ...state.chatting.receivers];
            }
        })

        // unused, wrong function
        builder.addCase(updateChatReceivers.fulfilled, (state, action) => {
            state.chatting.receivers = state.chatting.receivers.map((item) => {
                if (item.id == action.payload.sender.id || item.id == action.payload.receiver.id) {
                    return {...item, "lastMessage": action.payload};
                } else {
                    return item;
                }
            })
        })
        //

        builder.addCase(getChatWithReceiver.fulfilled, (state, action) => {
            state.chatting.chatContent = action.payload;
        })
        builder.addCase(setChatWithReceiver.fulfilled, (state, action) => {
            state.chatting.chatContent = action.payload;
        })
        builder.addCase(addChatWithReceiver.fulfilled, (state, action) => {
            state.chatting.chatContent.push(action.payload);
        })
        builder.addCase(setMsgBoxToggle.fulfilled, (state, action) => {
            state.chatting.msgBoxToggle = !state.chatting.msgBoxToggle;
        })
        builder.addCase(setActiveReceiver.fulfilled, (state, action) => {
            state.chatting.activeReceiver = action.payload;
            try {
                for (let i = 0; i < state.chatting.receivers.length; i++) {
                    if (state.chatting.receivers[i].id == action.payload.id && state.chatting.receivers[i].lastMessage) {
                        state.chatting.receivers[i].lastMessage.isRead = true;
                    }
                }
            } catch (e) {
            }
        })
        builder.addCase(setReadMessageReceiver.fulfilled, (state, action) => {
            console.log(state)
            state.chatting.receivers = state.chatting.receivers.map((item) => {
                if (item.id == action.payload && item.lastMessage) {
                    item.lastMessage.isRead = true;
                }
            })
        })

        // Notification
        builder.addCase(getAllNotifications.fulfilled, (state, action) => {
            state.chatting.notifications = action.payload;
            let count = 0;
            state.chatting.notifications.map((item) => {
                if (item.isRead == false) {
                    count++;
                }
            })
            state.chatting.countUnreadNotifications = count;
        })
        builder.addCase(addNotification.fulfilled, (state, action) => {
            state.chatting.notifications.unshift(action.payload);
            state.chatting.countUnreadNotifications = state.chatting.countUnreadNotifications + 1;
        })
        builder.addCase(confirmReadNotification.fulfilled, (state, action) => {
            let count = 0;
            state.chatting.notifications = state.chatting.notifications.map((item) => {
                if (item.id == action.payload) {
                    return {...item, isRead: true};
                } else {
                    if (item.isRead == false) {
                        count++;
                    }
                    return item;
                }
            });
            state.chatting.countUnreadNotifications = count;
        })
        builder.addCase(confirmReadAllNotifications.fulfilled, (state, action) => {
            state.chatting.notifications = state.chatting.notifications.map((item) => {
                if (item.isRead == false) {
                    return {...item, isRead: true};
                } else {
                    return item;
                }
            });
            state.chatting.countUnreadNotifications = 0;
        })
    }
})

export default ChattingSlice.reducer;