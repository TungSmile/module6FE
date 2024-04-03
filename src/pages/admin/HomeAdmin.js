import React, {useEffect, useState} from "react";
import NewUserList from "./NewUserList";
import {useDispatch} from "react-redux";
import {
    getAccountCCDVFilter,
    getAccountUserFilter,
    getAllBill,
    getAllCCDV,
    getAllUser, getListReport
} from "../../service/AdminService";
import AllUserList from "./AllUserList";
import AllCCDVList from "./AllCCDVList";
import NewCCDVList from "./NewCCDVList";
import ListBill from "./ListBill";
import SidebarAdmin from "./SidebarAdmin";
import {Outlet} from "react-router";

const HomeAdmin = () => {
    const dispatch = useDispatch();
    const [filter,setFilter] =useState({
        username: "",
        status: ""
    })
    const [userParam, setUserParam] = useState('');
    const [idStatus, setIdStatus] = useState("null");

    useEffect(() =>{
        dispatch(getAllUser());
        dispatch(getAllCCDV());
        dispatch(getAccountUserFilter(filter));
        dispatch(getAccountCCDVFilter(filter));
        dispatch(getAllBill(idStatus));
        dispatch(getListReport(userParam))
    },[])
    return (
        <>
            <link rel="stylesheet" href="/template_admin/css/css_sidebar.css"/>
            <link rel="stylesheet" href="/template_admin/vendors/themefy_icon/themify-icons.css"/>
            <div className="wrapper">
                <div className="home-flex">
                    <SidebarAdmin/>
                    <div className="home-flex-content">
                       <Outlet/>
                    </div>
                </div>
            </div>
        </>
    )
}
export default HomeAdmin;