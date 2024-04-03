import {useDispatch, useSelector} from "react-redux";
import React, {useEffect} from "react";
import {getAllBillByIdCCDV, getAllBillByIdUser} from "../../service/BillsService";
import AllBillByOfCCDV from "./AllBillOfCCDV";
import AllBilOflUser from "./AllBilOflUser";

const Bills =() =>{
    const dispatch = useDispatch();
    let id = JSON.parse(localStorage.getItem("account")).id;
    let role  = JSON.parse(localStorage.getItem("account")).role.nameRole;
    useEffect(() => {
        dispatch(getAllBillByIdCCDV(id));
        dispatch(getAllBillByIdUser(id));
    }, []);
    return (
        <>
            <link rel="stylesheet" href="../resources/css_page.css"/>
            {role && role === "ROLE_CCDV" && <AllBillByOfCCDV/> || role && role === "ROLE_USER" && <AllBilOflUser/> }
        </>
    )
}
export default Bills;