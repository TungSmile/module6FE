import React, {useEffect, useState} from 'react';
import {Outlet, useNavigate} from "react-router";
import $ from "jquery";
import {Link} from "react-router-dom";
import LoginService from "../service/custom/login";
import {useDispatch, useSelector} from "react-redux";
import {checkToken, setUser} from "../service/UserService";
import axios from "axios";
import Swal from "sweetalert2";
import {
    addChatReceivers,
    confirmReadAllNotifications,
    confirmReadNotification,
    getAllNotifications, getChatWithReceiver,
    setActiveReceiver, setMsgBoxToggle
} from "../service/ChattingService";
import {setFocusBill, setFocusBillId} from "../service/BillsService";
import customAxios from "../service/api";

const Header = () => {
    const navigate = useNavigate();
    const [isClicked, setIsClicked] = useState(false);
    const [isClicked2, setIsClicked2] = useState(false);
    const [statusCCDV, setStatusCCDV] = useState(true);
    const dispatch = useDispatch();
    const [user, setUser] = useState(() => {
        try {
            return JSON.parse(localStorage.getItem("account"))
        } catch (e) {
            return {};
        }
    });
    const storeUser = useSelector(state => {
        return state.user.user.current;
    });
    const notifications = useSelector(state => {
        return state.chatting.chatting.notifications;
    });
    const countUnreadNotifications = useSelector(state => {
        return state.chatting.chatting.countUnreadNotifications;
    });
    const msgBoxToggle = useSelector(state => {
        return state.chatting.chatting.msgBoxToggle;
    });

    const handleClick = (e) => {
        if (isClicked2) {
            setIsClicked2(!isClicked2)
        }
        setIsClicked(!isClicked);
    };
    const handleClick2 = (e) => {
        if (isClicked) {
            setIsClicked(!isClicked)
        }
        setIsClicked2(!isClicked2);
    };

    const handleReadInformation = (value, value2) => {
        dispatch(confirmReadNotification(value));
        const billId = value2.substring(value2.indexOf("[") + 1, value2.indexOf("]"));
        dispatch(setFocusBillId(billId));
    }

        const addAdminChat = () => {
            const admin = customAxios.get("userDetail/admin")
                .then(r => {
                    if (r.data.account.id != storeUser.account.id) {
                        let newReceiver = {
                            id: r.data.account.id,
                            username: r.data.account.username,
                            nickname: r.data.account.nickname,
                            avatar: r.data.account.avatar,
                            role: {
                                id: r.data.account.role.id,
                                nameRole: r.data.account.role.nameRole,
                            },
                            status: {
                                id: r.data.account.status.id,
                                nameStatus: r.data.account.status.nameStatus,
                            },
                            isActive: r.data.account.isActive
                        }
                        dispatch(addChatReceivers(newReceiver));
                        dispatch(setActiveReceiver(newReceiver));
                        try {
                            dispatch(getChatWithReceiver(newReceiver.id))
                        } catch (e) {
                        }

                        if (!msgBoxToggle) {
                            dispatch(setMsgBoxToggle());
                        }
                    }
                })

        }

    const swapStatusCCDV = () => {
        axios.get("http://localhost:8080/accounts/workOrRest?id=" + user.id).then(
            res => {
                Swal.fire({
                    position: 'center',
                    icon: 'info',
                    title: res.data,
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        ).catch(e => {
            console.log(e)
        })
        setStatusCCDV(!statusCCDV);
    }

    const logout = () => {
        LoginService.logout().then(r => {
            navigate("/login");
        });
        try {
            setUser(JSON.parse(localStorage.getItem("account")));
            dispatch(checkToken());
        } catch (e) {
            setUser({});
            dispatch(checkToken());
        }
    }

    useEffect(() => {
        dispatch(checkToken());
        try {
            dispatch(getAllNotifications(JSON.parse(localStorage.getItem("account")).id))
        } catch (e) {
        }
    }, [])

    useEffect(() => {
        try {
            setUser(JSON.parse(localStorage.getItem("account")));
            storeUser && storeUser.account.role.id === 3 && storeUser.account.status.id === 111 ? setStatusCCDV(false) : setStatusCCDV(true);
        } catch (e) {
            setUser({});
        }
    }, [storeUser])

    return (
        <>
            <title>Game Community</title>
            <link rel="apple-touch-icon" sizes="57x57" href="https://playerduo.net/favicons/apple-icon-57x57.png"/>
            <link rel="apple-touch-icon" sizes="60x60" href="https://playerduo.net/favicons/apple-icon-60x60.png"/>
            <link rel="apple-touch-icon" sizes="72x72" href="https://playerduo.net/favicons/apple-icon-72x72.png"/>
            <link rel="apple-touch-icon" sizes="76x76" href="https://playerduo.net/favicons/apple-icon-76x76.png"/>
            <link rel="apple-touch-icon" sizes="114x114" href="https://playerduo.net/favicons/apple-icon-114x114.png"/>
            <link rel="apple-touch-icon" sizes="120x120" href="https://playerduo.net/favicons/apple-icon-120x120.png"/>
            <link rel="apple-touch-icon" sizes="144x144" href="https://playerduo.net/favicons/apple-icon-144x144.png"/>
            <link rel="apple-touch-icon" sizes="152x152" href="https://playerduo.net/favicons/apple-icon-152x152.png"/>
            <link rel="apple-touch-icon" sizes="180x180" href="https://playerduo.net/favicons/apple-icon-180x180.png"/>
            <link rel="icon" type="image/png" sizes="192x192" href="../resources/raw/android-icon-192x192.png"/>
            <link rel="icon" type="image/png" sizes="32x32" href="../resources/raw/favicon-32x32.png"/>
            <link rel="icon" type="image/png" sizes="96x96" href="../resources/raw/favicon-96x96.png"/>
            <link rel="icon" type="image/png" sizes="16x16" href="../resources/raw/favicon-16x16.png"/>
            <link rel="manifest" href="https://playerduo.net/manifest.json"/>
            <meta name="msapplication-TileColor" content="#ffffff"/>
            <meta name="msapplication-TileImage" content="/favicons/ms-icon-144x144.png"/>
            <meta name="theme-color" content="#ffffff"/>
            <link rel="shortcut icon" href="../resources/raw/favicon.ico"/>
            <link href="../resources/all.css" rel="stylesheet"/>
            <link href="../resources/css.css" rel="stylesheet"/>
            <title>PlayerDuo - Thuê người chơi</title>
            <link href="../resources/8.97b85fe3.chunk.css" rel="stylesheet"/>
            <link href="../resources/main.3e229f12.chunk.css" rel="stylesheet"/>
            <link rel="stylesheet" type="text/css" href="../resources/0.cbdbec7b.chunk.css"/>
            <link rel="stylesheet" type="text/css" href="../resources/4.2ddfb1d3.chunk.css"/>
            <link rel="stylesheet" type="text/css" href="../resources/15.7bac9b00.chunk.css"/>
            <link rel="stylesheet" href="../resources/css-home.css"/>
            <div id="root">
                <header className="menu__header fix-menu" id="header-menu">
                    <div className="navbar-header">
                        <Link to={"/"}>
                            <a href className="logo"><img alt="logo playerduo" src="../resources/raw/logo.png"/></a>
                        </Link>
                    </div>
                    <div className="navbar">
                        <ul className="nav navbar-nav navbar-left">
                            {/*<li className="item-search">*/}
                            {/*    <nav className="Navbar__Item">*/}
                            {/*        <div className="Navbar__Link">*/}
                            {/*            <div className="Group-search visible "><span*/}
                            {/*                className="search input-group"><input placeholder="Nickname/Url ..."*/}
                            {/*                                                      type="text" className="form-control"*/}
                            {/*                                                      defaultValue={""}/><span*/}
                            {/*                className="input-group-addon"><button type="button"*/}
                            {/*                                                      className="btn btn-default"><i*/}
                            {/*                className="fal fa-search" aria-hidden="true"/></button></span></span></div>*/}
                            {/*        </div>*/}
                            {/*    </nav>*/}
                            {/*</li>*/}
                        </ul>
                        <ul className="nav navbar-nav navbar-center">
                            <li className="item-icon">
                                <a className="group-user active" href>
                                    <Link to={"/"}>
                                        <i className="fal fa-home-alt"/>
                                    </Link>
                                </a>
                            </li>
                            {/*<li className="item-icon"><a className="group-user " href="https://playerduo.net/stories"><i*/}
                            {/*    className="fal fa-camera-movie"/></a></li>*/}
                            {/*<li className="item-icon group-fb"><a className="group-user" href="/#"><i*/}
                            {/*    className="fal fa-trophy-alt"/></a></li>*/}
                        </ul>
                        <ul className="nav navbar-nav navbar-right">
                            {
                                user && user.id ?
                                    <>
                                        <li className={isClicked2 ? "item-icon notificate dropdown open" : "item-icon notificate dropdown"}
                                            onClick={(e) => {handleClick2(e)}} style={{display: "flex"}}>
                                            <a id="basic-nav-dropdown" role="button" className="dropdown-toggle"
                                               aria-haspopup="true" aria-expanded="false" href="#">
                                            <div className="item-title"><i className="fal fa-bell"/></div>
                                        </a>
                                            {
                                                countUnreadNotifications && countUnreadNotifications > 0 ?
                                                    <div style={{position: "absolute", marginLeft: "70%", marginTop: "60%"}}>
                                                        <a href="/information/bills" className={"group-user"} style={{marginLeft: "0px", padding: "0px 0px", background: "#F0564A", width: "24px", height: "24px", textSizeAdjust: '100%', WebkitTapHighlightColor: 'transparent', mainColor: '#f0564a', lineHeight: '1.42857', color: 'rgb(51, 51, 51)', WebkitFontSmoothing: 'antialiased', fontWeight: 400, fontSize: 16, boxSizing: 'border-box', listStyle: 'none', position: 'relative', display: 'block', float: 'left'}}>
                                                            <p style={{padding: "0px", color: "white", fontSize: "12px"}}>{countUnreadNotifications}</p></a>
                                                    </div>
                                                    :
                                                    <></>
                                            }
                                            <ul role="menu" className="dropdown-menu"
                                                aria-labelledby="basic-nav-dropdown">
                                                <div className="content">
                                                    <div className="tab-notif-common">
                                                        <h5 style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                                                            <span style={{flex: 1, textAlign: "center"}}>Thông báo</span>
                                                            <span style={{fontSize: "13px"}}><a href="#" onClick={(e) => {
                                                                dispatch(confirmReadAllNotifications(storeUser.account.id));
                                                                e.stopPropagation();
                                                            }}>Đã đọc</a></span>
                                                        </h5>
                                                        {/*<div className="tab-action"><p className="active">*/}
                                                        {/*    <span>Chính</span></p>*/}
                                                        {/*    <p className><span>Khác</span></p>*/}
                                                        {/*    <p className><span>Theo dõi</span></p>*/}
                                                        {/*    <p className><span>Tương tác</span></p></div>*/}
                                                    </div>
                                                    <div>
                                                        <div className="infinite-scroll-component"
                                                             style={{height: '400px', overflow: 'auto'}}>
                                                            <div className={"container"} style={{width: "410px", margin: "10px", padding: "5px"}}>
                                                                {
                                                                    notifications && notifications.map((item, key) => (
                                                                        <div className={"row notif-content"} key={key} style={{paddingBottom: "10px"}}>
                                                                            <div className={"col-md-2 col-centered"}>
                                                                                <ul style={{float: "left", paddingLeft: "0px"}}>
                                                                                    <li className={"item-icon"}>
                                                                                        <a href="/information/bills" className={"group-user"} style={{padding: "12px 0px", textSizeAdjust: '100%', WebkitTapHighlightColor: 'transparent', mainColor: '#f0564a', lineHeight: '1.42857', color: 'rgb(51, 51, 51)', WebkitFontSmoothing: 'antialiased', fontWeight: 400, fontSize: 16, boxSizing: 'border-box', listStyle: 'none', position: 'relative', display: 'block', float: 'left'}}>
                                                                                            {
                                                                                                item.subtype == "wait" ?
                                                                                                    <i className="fal fa-plus"></i>
                                                                                                    :
                                                                                                    item.subtype == "recevied" ?
                                                                                                        <i className="fal fa-check-double"></i>
                                                                                                        :
                                                                                                        item.subtype == "complete" ?
                                                                                                            <i className="fal fa-check-double"></i>
                                                                                                            :
                                                                                                            <i className="fal fa-xmark"></i>
                                                                                            }
                                                                                        </a>
                                                                                    </li>
                                                                                </ul>
                                                                            </div>
                                                                            <Link to={"/information/bills"}>
                                                                                <div className={"col-md-9 col-centered"} onClick={() => {handleReadInformation(item.id, item.message)}}>
                                                                                    <strong style={{margin: "0px", color: item.isRead == false ? "rgba(0,0,0,1)" : "rgba(0,0,0,0.5)"}}>
                                                                                        {
                                                                                            item.subtype == "wait" ?
                                                                                                "Đơn thuê mới"
                                                                                                :
                                                                                                item.subtype == "recevied" ?
                                                                                                    "Đơn thuê được xác nhận"
                                                                                                    :
                                                                                                    item.subtype == "complete" ?
                                                                                                        "Đơn thuê hoàn thành"
                                                                                                        :
                                                                                                        "Đơn thuê bị hủy"
                                                                                        }
                                                                                    </strong>
                                                                                    <p style={{paddingLeft: "10px", fontSize: "13px", color: item.isRead == false ? "rgba(0,0,0,1)" : "rgba(0,0,0,0.5)"}}><b>{item.sender.nickname}</b> {item.message}</p>
                                                                                </div>
                                                                            </Link>
                                                                            <div className={"col-md-1 col-centered"}>
                                                                                <ul style={{float: "left", paddingLeft: "0px"}}>
                                                                                    <li className={"item-icon"}>
                                                                                        {
                                                                                            item.isRead == false ?
                                                                                                <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512">
                                                                                                    {/*! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. */}
                                                                                                    <style dangerouslySetInnerHTML={{ __html: "svg{fill:#2250a0}" }} />
                                                                                                    <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512z" />
                                                                                                </svg>
                                                                                                :
                                                                                                <></>
                                                                                        }
                                                                                    </li>
                                                                                </ul>
                                                                            </div>
                                                                        </div>
                                                                    ))
                                                                }

                                                                {/*<div className={"row notif-content"}>*/}
                                                                {/*    <div className={"col-md-2 col-centered"}>*/}
                                                                {/*        <ul style={{float: "left", paddingLeft: "0px"}}>*/}
                                                                {/*            <li className={"item-icon"}>*/}
                                                                {/*                <a href="#" className={"group-user"} style={{textSizeAdjust: '100%', WebkitTapHighlightColor: 'transparent', mainColor: '#f0564a', lineHeight: '1.42857', color: 'rgb(51, 51, 51)', WebkitFontSmoothing: 'antialiased', fontWeight: 400, fontSize: 16, boxSizing: 'border-box', listStyle: 'none', position: 'relative', display: 'block', float: 'left'}}>*/}
                                                                {/*                    <i className="fal fa-camera-movie"></i>*/}
                                                                {/*                </a>*/}
                                                                {/*            </li>*/}
                                                                {/*        </ul>*/}
                                                                {/*    </div>*/}
                                                                {/*    <div className={"col-md-9 col-centered"}>*/}
                                                                {/*        <strong style={{margin: "0px"}}>Đơn thuê bị hủy</strong>*/}
                                                                {/*        <p>asfaslnlsn à sà aslf aks faskfnlaslkf al snals fns</p>*/}
                                                                {/*    </div>*/}
                                                                {/*</div>*/}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </ul>
                                        </li>
                                        <li className="item-icon balance" style={{marginLeft: "5px", marginRight: "5px"}}>
                                            <a className="money-user">
                                                {storeUser && storeUser.balance.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} đ
                                            </a>
                                        </li>
                                        <li className={isClicked ? "item-icon item-avatar dropdown open" : "item-icon item-avatar dropdown "}
                                            onClick={(e) => {
                                                handleClick(e)
                                            }}>
                                            <a id="header-nav-dropdown" role="button"
                                               className="dropdown-toggle"
                                               aria-haspopup="true" aria-expanded="false"
                                               href="#"><img
                                                src={user.avatar} className="avt-img" alt=""
                                                style={{width: "45px", height: "45px", objectFit: "cover"}}/></a>
                                            <ul role="menu" className="dropdown-menu"
                                                aria-labelledby="header-nav-dropdown">
                                                <li role="presentation" className="page-user">
                                                    <a role="menuitem" tabIndex={-1} href={user.role.id == 3 ? `/profile/${user.username}` : `#`}><img
                                                            src={user.avatar} className="avt-img" alt=""
                                                            style={{width: "55px", height: "55px", objectFit: "cover"}}/>
                                                        <div className="text-logo"><h5>{user.nickName}</h5>
                                                            <p>Username : <span>{user.username}</span></p>
                                                            {/*<p className="label-user-page"><span>Xem trang cá nhân của bạn</span></p>*/}
                                                        </div>
                                                    </a>
                                                </li>
                                                <li role="presentation" className="menu-item hidden-lg hidden-md"><a
                                                    role="menuitem"
                                                    tabIndex={-1}
                                                    href="#"><i
                                                    className="fas fa-plus"/> <span>Số dư</span> : <span
                                                    className="money">
                                                    {storeUser && storeUser.balance.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} đ
                                                </span></a></li>
                                                {/*<li role="presentation" className="menu-item"><a role="menuitem"*/}
                                                {/*                                                 tabIndex={-1}*/}
                                                {/*                                                 href="/information/topup"><i*/}
                                                {/*    className="fas fa-wallet"/> <span>Nạp tiền</span></a></li>*/}
                                                <li role="presentation" className="menu-item"><a role="menuitem"
                                                                                                 tabIndex={-1}
                                                                                                 href="/information/bills"><i
                                                    className="fas fa-clock"/> <span>Lịch sử thuê</span> </a></li>
                                                <li role="presentation" className="menu-item"><a role="menuitem"
                                                                                                 tabIndex={-1}
                                                                                                 href="/information/info"><i
                                                    className="fas fa-cogs"/> <span>Cài đặt tài khoản</span></a></li>
                                                <li role="presentation" className="menu-item" onClick={() => {
                                                    logout()
                                                }}><a role="menuitem" tabIndex={-1}
                                                      href="#"><i
                                                    className="fas fa-power-off"/> <span>Đăng xuất</span></a></li>
                                                <div className="menu-item list-flag">
                                                    <div className="box-item">
                                                        <div className="flag-all active"><img
                                                            src="../resources/raw/2.png"
                                                            className="flag flag-vn" alt="PD"/>
                                                        </div>
                                                        <div className="flag-all false"><img
                                                            src="../resources/raw/1.png"
                                                            className="flag flag-en" alt="PD"/>
                                                        </div>
                                                    </div>
                                                    <div className="box-item" style={{display: "flex", justifyContent: "center"}}>
                                                        {/*<a href="#"*/}
                                                        {/*                         target="_blank"*/}
                                                        {/*                         rel="noopener noreferrer"><span>Group</span></a>*/}
                                                        {
                                                            storeUser && storeUser.account.role.id == 1 ?
                                                                <a href={"/homeAdmin"} rel="noopener noreferrer">
                                                                    <span>Control Panel</span>
                                                                </a>
                                                                :
                                                                <a rel="noopener noreferrer"  onClick={() => {addAdminChat()}}>
                                                                    <span>Chat Admin</span>
                                                                </a>
                                                        }
                                                    </div>
                                                </div>
                                            </ul>
                                        </li>
                                        {user && user.role && user.role.id===3 ? <li className="item-icon mode" onClick={swapStatusCCDV}><a
                                            className="group-user">
                                            {statusCCDV ? <i className="fas fa-sun"/>
                                                : <i className="fas fa-moon"/>
                                            }
                                        </a>
                                        </li> : <></>
                                        }

                                    </>
                                    :
                                    <li className="item-icon authent"><a className="money-user" href={"/login"}><i
                                        className="fal fa-power-off"/><span>Đăng nhập</span></a></li>
                            }
                        </ul>
                    </div>
                    <div className="navbar-mobile hidden">
                        <ul className="navbar-nav">
                            <li className="item-icon notificate dropdown"><a id="basic-nav-dropdown" role="button"
                                                                             className="dropdown-toggle"
                                                                             aria-haspopup="true" aria-expanded="false"
                                                                             href="#">
                                <div className="item-title"><i className="fal fa-bell"/></div>
                            </a>
                                <ul role="menu" className="dropdown-menu" aria-labelledby="basic-nav-dropdown">
                                    <div className="content">
                                        <div className="tab-notif-common"><h5><span>Thông báo</span></h5>
                                            <div className="tab-action"><p className="active"><span>Chính</span></p>
                                                <p className><span>Khác</span></p>
                                                <p className><span>Theo dõi</span></p>
                                                <p className><span>Tương tác</span></p></div>
                                        </div>
                                        <div>
                                            <div className="infinite-scroll-component "
                                                 style={{height: '400px', overflow: 'auto'}}/>
                                        </div>
                                    </div>
                                </ul>
                            </li>
                            <li className={isClicked ? "item-icon item-avatar dropdown " : "item-icon item-avatar dropdown open"}
                                onClick={(e) => {
                                    handleClick(e)
                                }}
                            ><a id="header-nav-dropdown" role="button"
                                className="dropdown-toggle"
                                aria-haspopup="true" aria-expanded="false"
                                href="#"><img
                                src="../resources/raw/avatar6.png" className="avt-img" alt=""/></a>
                                <ul role="menu" className="dropdown-menu" aria-labelledby="header-nav-dropdown">
                                    <li role="presentation" className="page-user"><a role="menuitem" tabIndex={-1}
                                                                                     href="#"><img
                                        src="../resources/raw/avatar6.png" className="avt-img" alt=""/>
                                        <div className="text-logo"><h5>keenlight</h5>
                                            <p>ID : <span>keenlight</span></p>
                                            <p className="label-user-page"><span>Xem trang cá nhân của bạn</span></p>
                                        </div>
                                    </a></li>
                                    <li role="presentation" className="menu-item hidden-lg hidden-md"><a role="menuitem"
                                                                                                         tabIndex={-1}
                                                                                                         href="#"><i
                                        className="fas fa-plus"/> <span>Số dư</span> : <span
                                        className="money">
                                        {storeUser && storeUser.balance.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} đ
                                    </span></a></li>
                                    {/*<li role="presentation" className="menu-item"><a role="menuitem" tabIndex={-1}*/}
                                    {/*                                                 href="/information/topup"><i*/}
                                    {/*    className="fas fa-wallet"/> <span>Nạp tiền</span></a></li>*/}
                                    <li role="presentation" className="menu-item"><a role="menuitem" tabIndex={-1}
                                                                                     href="/information/bills"><i
                                        className="fas fa-clock"/> <span>Lịch sử thuê</span> </a></li>
                                    <li role="presentation" className="menu-item"><a role="menuitem" tabIndex={-1}
                                                                                     href="/information/info"><i
                                        className="fas fa-cogs"/> <span>Cài đặt tài khoản</span></a></li>
                                    <li role="presentation" className="menu-item"><a role="menuitem" tabIndex={-1}
                                                                                     href="#"><i
                                        className="fas fa-power-off"/> <span>Đăng xuất</span></a></li>
                                    <div className="menu-item list-flag">
                                        <div className="box-item">
                                            <div className="flag-all active"><img src="../resources/raw/2.png"
                                                                                  className="flag flag-vn" alt="PD"/>
                                            </div>
                                            <div className="flag-all false"><img src="../resources/raw/1.png"
                                                                                 className="flag flag-en" alt="PD"/>
                                            </div>
                                        </div>
                                        <div className="box-item"><a href="https://www.facebook.com/groups/playerduovn"
                                                                     target="_blank"
                                                                     rel="noopener noreferrer"><span>Group</span></a><a
                                            href="https://www.facebook.com/playerduo" target="_blank"
                                            rel="noopener noreferrer"><span>Fanpage</span></a>
                                        </div>
                                    </div>
                                </ul>
                            </li>
                        </ul>
                        <a className="btn-bars"><i className="fal fa-bars"/></a>
                        <div className="flex-side hidden">
                            <div className="overlay"/>
                            <div className="content">
                                <div className="box-search">
                                    <nav className="Navbar__Item">
                                        <div className="Navbar__Link">
                                            <div className="Group-search visible "><span
                                                className="search input-group"><input
                                                placeholder="Nickname/Url ..." type="text" className="form-control"
                                                defaultValue/><span className="input-group-addon"><button type="button"
                                                                                                          className="btn btn-default"><i
                                                className="fal fa-search" aria-hidden="true"/></button></span></span>
                                            </div>
                                        </div>
                                    </nav>
                                    <a className="btn-close"><i className="fal fa-times fa-2x"/></a></div>
                                <ul className="list-page"><a href>
                                </a>
                                    <li className="item-icon active"><a href/><a className="group-user"><i
                                        className="fal fa-home-alt"/> <span>Trang chủ</span></a>
                                    </li>
                                    <a href="https://playerduo.net/stories">
                                    </a>
                                    <li className="item-icon "><a href="https://playerduo.net/stories"/><a
                                        className="group-user"><i className="fal fa-camera-movie"/> Stories</a>
                                    </li>
                                    <li className="item-icon"><a className="group-user"><i
                                        className="fal fa-trophy-alt"/> <span>Bảng xếp hạng</span></a>
                                    </li>
                                </ul>
                                <div className="list-mode">
                                    <div className="item"><p className="title"><span>Chế độ</span></p><a
                                        className="func mode"><i className="fas fa-moon op"/><i
                                        className="fas fa-sun false"/></a></div>
                                    <div className="item"><p className="title"><span>Cộng đồng</span></p>
                                        <div className="func group"><a
                                            href="https://www.facebook.com/groups/playerduovn" target="_blank"
                                            rel="noopener noreferrer"><i className="fal fa-globe"/></a><a
                                            href="https://www.facebook.com/playerduo" target="_blank"
                                            rel="noopener noreferrer"><i className="fab fa-facebook-f"/></a></div>
                                    </div>
                                    <div className="item"><p className="title"><span>Ngôn ngữ</span></p><a
                                        className="func lang"><img src="../resources/raw/1.png" className="flag op"
                                                                   alt="PD"/><img src="../resources/raw/2.png"
                                                                                  className="flag false" alt="PD"/></a>
                                    </div>
                                    <div className="item"><p className="title"><span>Tải App</span></p>
                                        <div className="func app"><a href="https://testflight.apple.com/join/r6H9YvY4"
                                                                     target="_blank" rel="noopener noreferrer"
                                                                     download>PlayerChat</a></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>
            </div>
        </>
    );
}
;

export default Header;