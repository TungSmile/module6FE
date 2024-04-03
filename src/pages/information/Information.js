import React, {useEffect} from 'react';
import SidebarInformation from "../../components/common/SidebarInformation";
import {Outlet, useLocation} from "react-router";
import {useState} from "react";

const Information = () => {
    const location = useLocation();
    const [currentPathname, setCurrentPathname] = useState(location.pathname);
    useEffect(() => {
        setCurrentPathname(location.pathname);
    }, [])
    return (
        <>
            <div id="root">
                <div className="notifications-wrapper" />
                <div className="message__popup  false">
                    <div className="message__popup--icon"><img src="../resources/raw/popup-chat.png" className alt="PD" /></div>
                </div>
                <div className="wrapper">
                    <div className="setting__main row">
                        <div className="setting__main--menu col-lg-2 col-md-2 col-sm-12 col-xs-12">
                            <SidebarInformation/>
                        </div>
                        <div className="col-lg-10 col-md-10 col-sm-12 col-xs-12">
                            <div className="aside">

                                {/*Outlet*/}
                                <Outlet/>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Information;