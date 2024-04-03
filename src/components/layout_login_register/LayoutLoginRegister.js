import Header from "../Header";
import {Outlet} from "react-router";
import React from "react";
import HeaderLoginRegister from "./HeaderLoginRegister";

const LayoutLoginRegister =() =>{
    return  (
        <>
            <Header/>
            <Outlet/>

        </>
    )
}
export default LayoutLoginRegister;