import React, {useEffect, useState} from 'react';
import Chat from "./common/Chat";
import {useDispatch, useSelector} from "react-redux";
import {checkToken} from "../service/UserService";

const ChatSocket = () => {
    const [msgBoxToggle, setMsgBoxToggle] = useState(false);
    const messageBoxToggle = (e) => {
        setMsgBoxToggle(!msgBoxToggle);
    }
    const dispatch = useDispatch();
    const storeUser = useSelector(state => state.user.user.current);

    useEffect(() => {
        dispatch(checkToken());
    }, [])

    return (
        <>
            {
                storeUser && storeUser.id ?
                    <Chat/>
                    :
                    <></>
            }

        </>
    );
};

export default ChatSocket;