import HeaderAdmin from "./HeaderAdmin";
import {Outlet} from "react-router";
import FooterAdmin from "./FooterAdmin";
import ChatSocket from "../ChatSocket";
import React from "react";
import Header from "../Header";

const LayoutAdmin =()=>{
    return (
        <>
            <Header/>
            <Outlet/>
            <ChatSocket/>
            <FooterAdmin/>
        </>
    )
}
export default LayoutAdmin;