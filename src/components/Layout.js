import React from 'react';
import Header from "./Header";
import {Outlet} from "react-router";
import Footer from "./Footer";
import ChatSocket from "./ChatSocket";

const Layout = () => {
    return (
        <>
            <Header/>
            <Outlet/>
            <ChatSocket/>
            <Footer/>
        </>
    );
};

export default Layout;