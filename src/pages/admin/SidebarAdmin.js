import {useLocation} from "react-router";
import React, {useEffect} from "react";
import {Link} from "react-router-dom";

const SidebarAdmin  = () => {
    const location = useLocation();
    useEffect(() => {
        let elements = document.querySelectorAll(".panel-title");
        for (let i = 0; i < elements.length; i++) {
            try {
                elements[i].classList.remove("active");
            } catch (e){}
        }
        let element;
        switch (location.pathname) {
            case "/information/info":
                element = document.querySelector("#id1-1");
                element.classList.add("active");
                break;
            case "/information/bills":
                element = document.querySelector("#id1-2");
                element.classList.add("active");
                break;
            case "/information/topup":
                element = document.querySelector("#id1-3");
                element.classList.add("active");
                break;
            case "/information/summary":
                element = document.querySelector("#id1-4");
                element.classList.add("active");
                break;
            case "/information/supplies":
                element = document.querySelector("#id1-5");
                element.classList.add("active");
                break;
            case "/information/album":
                element = document.querySelector("#id1-6");
                element.classList.add("active");
                break;
        }
    }, [location.pathname])
    return(
        <>
            <link rel="stylesheet" href="/template_admin/css/css_sidebar_1.css"/>
            <div className="home-flex-category">
                <nav className="sidebar_1">
                    <ul id="sidebar_1_menu">
                        <li className="">
                            <a className="has-arrow" href="#" aria-expanded="false">
                                <div className="nav_icon_small">
                                    <img src="/template_admin/img/menu-icon/7.svg" alt=""/>
                                </div>
                                <div className="nav_title">
                                    <span> Đơn hàng  </span>
                                </div>
                            </a>

                            <ul className="mm-collapse">

                                <li>
                                    <Link to={"/homeAdmin/allBills"}>
                                    <div href="" id={"id1-1"}>Tất cả các đơn</div>
                                    </Link>
                                </li>
                            </ul>
                        </li>
                        <li className="mm-active">
                            <a className="has-arrow" href="#" aria-expanded="false">
                                <div className="nav_icon_small">
                                    <img src="/template_admin/img/menu-icon/5.svg" alt=""/>
                                </div>
                                <div className="nav_title">
                                    <span>Tài khoản người dùng </span>
                                </div>
                            </a>
                            <ul className="mm-collapse mm-show">
                                <li>
                                    <Link to={"/homeAdmin/NewUser"}>
                                    <a href="" id={"id1-2"}>Người dùng mới nhất</a>
                                    </Link>
                                </li>
                                <li>
                                    <Link to={"/homeAdmin/allUser"}>
                                    <a href="" id={"id1-3"}>Danh sách người dùng</a>
                                    </Link>
                                </li>
                            </ul>
                        </li>
                        <li className="">
                            <a className="has-arrow" href="#" aria-expanded="false">
                                <div className="nav_icon_small">
                                    <img src="/template_admin/img/menu-icon/5.svg" alt=""/>
                                </div>
                                <div className="nav_title">
                                    <span>Tài khoản người CCDV</span>
                                </div>
                            </a>
                            <ul className="mm-collapse">
                                <li>
                                    <Link to={"/homeAdmin/newCCDv"}>
                                    <a href="" id={"id1-4"}>Người CCDV mới nhất </a>
                                    </Link>
                                </li>
                                <li>
                                    <Link to={"/homeAdmin/allCCDv"}>
                                    <a href="" id={"id1-5"}>Danh sách người CCDV </a>
                                    </Link>
                                </li>
                            </ul>
                        </li>
                        <li className="">
                            <a className="has-arrow" href="#" aria-expanded="false">
                                <div className="nav_icon_small">
                                    <img src="/template_adminimg/menu-icon/11.svg" alt=""/>
                                </div>
                                <div className="nav_title">
                                    <span>Tài khoản bị tố cáo</span>
                                </div>
                            </a>
                            <ul className="mm-collapse">
                                <li>
                                    <Link to={"/homeAdmin/allListReport"}>
                                    <a href="" id={"id1-6"}>Tất cả các tố cáo</a>
                                    </Link>
                                </li>
                            </ul>
                        </li>
                        {/*<li className="">*/}
                        {/*    <a className="has-arrow" href="#" aria-expanded="false">*/}
                        {/*        <div className="nav_icon_small">*/}
                        {/*            <img src="/template_adminimg/menu-icon/11.svg" alt=""/>*/}
                        {/*        </div>*/}
                        {/*        <div className="nav_title">*/}
                        {/*            <span>Vai trò</span>*/}
                        {/*        </div>*/}
                        {/*    </a>*/}
                        {/*    <ul className="mm-collapse">*/}
                        {/*        <li>*/}
                        {/*            <a href="" id={"id1-8"}>Cài đặt vai trò</a>*/}
                        {/*        </li>*/}
                        {/*    </ul>*/}
                        {/*</li>*/}
                        {/*<li className="">*/}
                        {/*    <a href="" aria-expanded="false">*/}
                        {/*        <div className="nav_icon_small">*/}
                        {/*            <img src="img/menu-icon/10.svg" alt=""/>*/}
                        {/*        </div>*/}
                        {/*        <div className="nav_title">*/}
                        {/*            <span>Top doanh thu tuần</span>*/}
                        {/*        </div>*/}
                        {/*    </a>*/}
                        {/*</li>*/}
                    </ul>
                </nav>
            </div>
        </>
    )
}
export default SidebarAdmin;