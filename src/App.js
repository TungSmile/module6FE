import logo from './logo.svg';
import './App.css';
import {Route, Routes} from "react-router";
import Login from "./pages/login/Login";
import Layout from "./components/Layout";
import Detail from "./pages/profile/Detail";
import Register from "./pages/register/Register";
import RegisterCCDV from "./pages/register/RegisterCCDV";
import RegisterProfile from "./pages/register/RegisterProfile";
import Home from "./pages/home/Home";
import UserInfo from "./pages/information/UserInfo";
import AllBillByOfCCDV from "./pages/information/AllBillOfCCDV";
import Bills from "./pages/information/Bills";
import LayoutAdmin from "./components/layoutAdmin/LayoutAdmin";
import HomeAdmin from "./pages/admin/HomeAdmin";
import HistoryProvider from "./pages/home/HistoryProvider";
import ShowImages from "./pages/profile/ShowImages";
import SidebarInformation from "./components/common/SidebarInformation";
import Information from "./pages/information/Information";
import Test from "./pages/Test";
import ListBill from "./pages/admin/ListBill";
import NewCCDVList from "./pages/admin/NewCCDVList";
import AllUserList from "./pages/admin/AllUserList";
import AllCCDVList from "./pages/admin/AllCCDVList";
import AccountReport from "./pages/admin/AccountReport";
import NewUserList from "./pages/admin/NewUserList";
import AccountSettings from "./pages/home/AccountSettings";
import Album from "./pages/home/Album";
import Revenue from "./pages/profile/Revenue";
import RegisterUserOrCCDV from "./pages/register/RegisterUserOrCCDV";
import RegisterProfileGoogle from "./pages/register/RegisterProfileGoogle";
import EditSuppleAndPrice from "./pages/information/EditSuppleAndPrice";
import RegisterSupply from "./components/common/RegisterSupply";
import SupplyInfo from "./pages/information/SupplyInfo";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {checkToken} from "./service/UserService";
import NotFound from "./components/common/NotFound";

function App() {
    const storeUser = useSelector(state => {
        console.log(state.user.user.current)
        // if (!state.user.user.current) {
        //
        // }
        return state.user.user.current;
    });
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(checkToken());
    }, []);

    return (
        <>
            <Routes>
                {/*<Route path={"/test"} element={<Test/>}></Route>*/}
                <Route path={"/*"} element={<NotFound/>}></Route>

                <Route path={"/"} element={<Layout/>}>
                    {/*Page Login*/}
                    <Route path={"/login"} element={<Login/>}></Route>

                    {/*Page Home*/}
                    <Route path={""} element={<Home/>}></Route>
                    <Route path={"register"} element={<Register/>}></Route>
                    <Route path={"registerCCDV"} element={<RegisterCCDV/>}></Route>
                    <Route path={"registerUserOrCCDV"} element={<RegisterUserOrCCDV/>}></Route>
                    <Route path={"registerProfile"} element={<RegisterProfile/>}></Route>
                    <Route path={"registerProfileGoogle"} element={<RegisterProfileGoogle/>}></Route>

                    {/*Page Profile*/}
                    <Route path={"profile/:username"} element={<Detail/>}></Route>

                    {/*Page Information*/}
                    <Route path={"information"} element={storeUser && (storeUser.account.role.id == 2 || storeUser.account.role.id == 3) ? <Information/> : <NotFound/> }>
                        <Route path={"info"} element={storeUser && (storeUser.account.role.id == 2 || storeUser.account.role.id == 3) ? <UserInfo/> : <NotFound/>}></Route>
                        <Route path={"bills"} element={storeUser && (storeUser.account.role.id == 2 || storeUser.account.role.id == 3) ? <Bills/> : <NotFound/>}></Route>
                        {/*<Route path={"topup"} element={storeUser && (storeUser.account.role.id == 2 || storeUser.account.role.id == 3) ? <UserInfo/> : <Test/>}></Route>*/}
                        <Route path={"summary"} element={storeUser && (storeUser.account.role.id == 3) ? <Revenue/> : <NotFound/>}></Route>
                        <Route path={"supplies"} element={storeUser && (storeUser.account.role.id == 3) ? <RegisterSupply isRegister={false} /> : <NotFound/>}></Route>
                        <Route path={"album"} element={storeUser && (storeUser.account.role.id == 3) ? <Album/> : <NotFound/>}></Route>

                        {/*<Route path={"setSupply"} element={storeUser && (storeUser.account.role.id == 3) ? <RegisterSupply isRegister={false} /> : <Test/>}></Route>*/}
                    </Route>

                </Route>
                {
                    storeUser && storeUser.account.role.id == 1 ?
                        <Route path="/" element={storeUser && storeUser.account.role.id == 1 ? <LayoutAdmin/> : <NotFound/>}>
                            <Route path="/homeAdmin"  element={storeUser && storeUser.account.role.id == 1 ? <HomeAdmin/> : <NotFound/>}>
                                <Route path={"allBills"} element={storeUser && storeUser.account.role.id == 1 ? <ListBill/> : <NotFound/>}></Route>
                                <Route path={"NewUser"} element={storeUser && storeUser.account.role.id == 1 ? <NewUserList/> : <NotFound/>}></Route>
                                <Route path={"allUser"} element={storeUser && storeUser.account.role.id == 1 ? <AllUserList/> : <NotFound/>}></Route>
                                <Route path={"newCCDv"} element={storeUser && storeUser.account.role.id == 1 ? <NewCCDVList/> : <NotFound/>}></Route>
                                <Route path={"allCCDv"} element={storeUser && storeUser.account.role.id == 1 ? <AllCCDVList/> : <NotFound/>}></Route>
                                <Route path={"allListReport"} element={storeUser && storeUser.account.role.id == 1 ? <AccountReport/> : <NotFound/>}></Route>
                            </Route>
                        </Route>
                        : <></>
                }
            </Routes>
        </>
    );
}

export default App;
