import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {
    getCCDVProperGender, getCCDVsByTopViews,
    getNewestCCDVs,
    getTopFemale,
    getTopMale, searchCCDV
} from "../../service/CCDVsService";
import NewCcdVs from "./NewCCDVs";
import SidebarSupplies from "./SidebarSupplies";
import {getAllActiveSupplies, getSupplyByUserID} from "../../service/SupplyService";
import TopServiceCCDV from "./TopServiceCCDV";
import TopMaleAndFemale from "./TopMaleAndFemale";
import CcdVsByChosenSupplies from "./CCDVsByChosenSupplies";
import CCDVProperGender from "./CCDVProperGender";
import SearchCCDV from "./SearchCCDV";
import {checkToken} from "../../service/UserService";

const Home = () => {
    const dispatch = useDispatch();
    const iduser = () => {
        if (localStorage.getItem("account") == "") {
            return null
        } else {
            try {
                return JSON.parse(localStorage.getItem("account")).id;
            } catch (e) {
                return null;
            }
        }
    }


    const chosenSupplies = useSelector(state => {
        return state.supplies.supplies.chosen;
    })

    const CCDVsByChosenSupplies = useSelector(state => {
        return state.CCDVs.CCDVs.byChosenSupplies;
    })

    useEffect(() => {
        dispatch(getNewestCCDVs(10));
        dispatch(getAllActiveSupplies());
        dispatch(getTopMale(5));
        dispatch(getTopFemale(5));
        dispatch(getSupplyByUserID(iduser()));
        dispatch(getCCDVProperGender(iduser()));
        dispatch(getCCDVsByTopViews(5));
        dispatch(checkToken());
    }, [])

    const [filter, setFilter] = useState({
        nickname: '',
        zone: '',
        gender: '',
        year: null,
        minPrice: null,
        maxPrice: null
    });
    const searchCCdv = () => {
        // Lấy giá trị từ các thẻ HTML bằng cách sử dụng document.getElementById()
        const gender = document.getElementById('gender').value;
        const zone = document.getElementById('zone').value;
        const minPrice = document.getElementById('minPrice').value;
        const maxPrice = document.getElementById('maxPrice').value;
        const nickname = document.getElementById('nickname').value;

        // Cập nhật trạng thái filter bằng các giá trị đã lấy được
        setFilter({
            gender,
            zone,
            minPrice: parseFloat(minPrice) || null, // Chuyển đổi minPrice thành số hoặc null nếu không hợp lệ
            maxPrice: parseFloat(maxPrice) || null, // Chuyển đổi maxPrice thành số hoặc null nếu không hợp lệ
            nickname,
            year: null
        });
        let asdafs = {
            gender,
            zone,
            minPrice: parseFloat(minPrice) || null, // Chuyển đổi minPrice thành số hoặc null nếu không hợp lệ
            maxPrice: parseFloat(maxPrice) || null, // Chuyển đổi maxPrice thành số hoặc null nếu không hợp lệ
            nickname,
            year: null
        }
        dispatch(searchCCDV(asdafs));

    };

    return (
        <>
            <title>Trang Chủ</title>
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
            <noscript>Bạn cần có cho phép Javascript hoạt động để chạy ứng dụng PlayerDuo.</noscript>
            <div id="root">
                <div className="hidden">
                    <audio src="../resources/raw/notification-sound.805a8904.mp3"/>
                    <audio src="../resources/raw/notification-group-sound.4c7ac55b.mp3"/>
                    <audio src="../resources/raw/unconvinced.1de6c75d.mp3"/>
                </div>
                <div className="notifications-wrapper"/>
                <div className="message__popup  false">
                    <div className="message__popup--icon">
                        <img src="../resources/raw/popup-chat.png" className alt="PD"/>
                    </div>
                </div>
                <div className="wrapper">
                    <div className="home-flex">

                        <SidebarSupplies/>

                        <div className="home-flex-content">
                            {/*<p className="btn-chat-global false"><span>Trò Chuyện</span></p>*/}
                            {/*<div className="hided">*/}
                            {/*    <div className="slide extend-box">*/}
                            {/*        <div className="global-chat">*/}
                            {/*            <div id="global-chat" className="global-chat-display">*/}
                            {/*                <div>*/}
                            {/*                    <div className="text-center"><i className="fa fa-spinner fa-spin" /></div>*/}
                            {/*                    <div className="global_message__item media">*/}
                            {/*                        <div className="media-left"><a target="_blank" href="https://playerduo.net/cheneiiiv">*/}
                            {/*                            <div className="avt-rank avt-sm"><img src="../resources/raw/91d31b69-d5d7-451a-8a66-d7acfea3afe0__59c39300-3454-11ed-838c-b120e70abb59__page_avatar.jpg" className="avt-1-15 avt-img" alt="PD" /><img src="../resources/raw/7.png" className="rank-1-15 rank-img" alt="PlayerDuo" /></div>*/}
                            {/*                        </a></div>*/}
                            {/*                        <div className="media-body"><p className="chat-name"><strong className="name-player-review color-vip-6"><span className="cursor-pointer">VyVy </span> </strong> : </p>*/}
                            {/*                            <p className="mess-global">ướt đc rent</p></div>*/}
                            {/*                    </div>*/}
                            {/*                    <div className="global_message__item media">*/}
                            {/*                        <div className="media-left"><a target="_blank" href="https://playerduo.net/betiss">*/}
                            {/*                            <div className="avt-rank avt-sm"><img src="../resources/raw/05a9716a-d354-4818-aefa-47093bfe1cc5__d6e85150-27b4-11ee-a657-a54d6be1d46a__page_avatar.jpg" className="avt-1-15 avt-img" alt="PD" /><img src="../resources/raw/9.png" className="rank-1-15 rank-img" alt="PlayerDuo" /></div>*/}
                            {/*                        </a></div>*/}
                            {/*                        <div className="media-body"><p className="chat-name"><strong className="name-player-review color-vip-6"><span className="cursor-pointer">Baby Tis </span>*/}
                            {/*                        </strong><i className="fas fa-check-circle" /> : </p>*/}
                            {/*                            <p className="mess-global"><a target="_blank" href="https://playerduo.net/betis" className="link">betis</a> nhận duo liên quân , pubgmb*/}
                            {/*                                ,tốc chiến , tft , hát , NHẬN NẠP RÚT PLD SLL ) ,</p></div>*/}
                            {/*                    </div>*/}

                            {/*                    <div className="global_message__item media">*/}
                            {/*                        <div className="media-left"><a target="_blank" href="https://playerduo.net/janny259">*/}
                            {/*                            <div className="avt-rank avt-sm"><img src="../resources/raw/f3b23cf6-54a1-4756-b465-93cb4ab77536__3ef82970-44be-11ee-a657-a54d6be1d46a__page_avatar.jpg" className="avt-1-15 avt-img" alt="PD" /><img src="../resources/raw/10.png" className="rank-1-15 rank-img" alt="PlayerDuo" /></div>*/}
                            {/*                        </a></div>*/}
                            {/*                        <div className="media-body"><p className="chat-name"><strong className="name-player-review color-vip-10"><span className="cursor-pointer">Janny trader - ng chơi hệ LHD ✨ </span>*/}
                            {/*                        </strong><i className="fas fa-check-circle" /> : </p>*/}
                            {/*                            <p className="mess-global">trade pld, bán steamcode sll ib là onl</p></div>*/}
                            {/*                    </div>*/}
                            {/*                    <div />*/}
                            {/*                </div>*/}
                            {/*            </div>*/}
                            {/*            <div className="form-group"><span className="input-group"><input placeholder="Enter để gửi tin nhắn!" maxLength={255} type="text" id="formChatText" className="form-control" defaultValue /><p className="send-chat"><i className="fas fa-paper-plane" /></p><span className="scope-icon input-group-addon" /></span></div>*/}
                            {/*        </div>*/}
                            {/*    </div>*/}
                            {/*</div>*/}
                            <div className="slide banner carousel slide">
                                <div className="carousel-inner">
                                    <div className="item active"><a href="src/pages/home/Home" target="_blank"
                                                                    rel="noopener noreferrer"><img
                                        src="../resources/raw/banner1.png"
                                        className="img-responsive" alt="banner"/></a></div>
                                    <div className="item"><a href="https://www.facebook.com/groups/playerduovn"
                                                             target="_blank" rel="noopener noreferrer"><img
                                        src="../resources/raw/715867c6-698f-411a-b4f9-1e9093130b60__ff5aee00-79ee-11ed-a19f-23a3b10d190e__admin_banner.jpg"
                                        className="img-responsive" alt="banner"/></a></div>
                                </div>
                                <a className="carousel-control left" role="button" href="src/pages/home/Home#"><span
                                    className="glyphicon glyphicon-chevron-left"/><span
                                    className="sr-only">Previous</span></a><a className="carousel-control right"
                                                                              role="button" href="src/pages/home/Home#"><span
                                className="glyphicon glyphicon-chevron-right"/><span className="sr-only">Next</span></a>
                            </div>
                            <br/>
                            <div className="mobile-cate">
                                <div className="label-cate"><p><span>Danh mục game</span></p>
                                    <button type="button" className="btn btn-default"><i className="fal fa-search"/>
                                    </button>
                                </div>
                                <div className="list-group">
                                    <ul className="scrolls">
                                        <li className="list-item"><img alt="avatar game"
                                                                       src="../resources/raw/715867c6-698f-411a-b4f9-1e9093130b60__0ba80060-2b58-11ee-a657-a54d6be1d46a__game_avatars.jpg"/>
                                        </li>
                                        <li className="list-item"><img alt="avatar game"
                                                                       src="../resources/raw/715867c6-698f-411a-b4f9-1e9093130b60__f364f2e0-34ce-11ed-838c-b120e70abb59__game_avatars.jpg"/>
                                        </li>
                                        <li className="list-item"><img alt="avatar game"
                                                                       src="../resources/raw/715867c6-698f-411a-b4f9-1e9093130b60__a844a8e0-34cf-11ed-838c-b120e70abb59__game_avatars.jpg"/>
                                        </li>
                                        <li className="list-item"><img alt="avatar game"
                                                                       src="../resources/raw/715867c6-698f-411a-b4f9-1e9093130b60__c5802ad0-33e2-11ed-838c-b120e70abb59__game_avatars.jpg"/>
                                        </li>
                                        <li className="list-item"><img alt="avatar game"
                                                                       src="../resources/raw/715867c6-698f-411a-b4f9-1e9093130b60__53121480-33e3-11ed-838c-b120e70abb59__game_avatars.jpg"/>
                                        </li>
                                        <li className="list-item"><img alt="avatar game"
                                                                       src="../resources/raw/715867c6-698f-411a-b4f9-1e9093130b60__3b5dac30-34d0-11ed-838c-b120e70abb59__game_avatars.jpg"/>
                                        </li>
                                        <li className="list-item"><img alt="avatar game"
                                                                       src="../resources/raw/715867c6-698f-411a-b4f9-1e9093130b60__99a18050-34d5-11ed-838c-b120e70abb59__game_avatars.jpg"/>
                                        </li>
                                        <li className="list-item"><img alt="avatar game"
                                                                       src="../resources/raw/715867c6-698f-411a-b4f9-1e9093130b60__39932230-34cc-11ed-838c-b120e70abb59__game_avatars.jpg"/>
                                        </li>
                                        <li className="list-item"><img alt="avatar game"
                                                                       src="../resources/raw/715867c6-698f-411a-b4f9-1e9093130b60__5dd9f670-34d4-11ed-838c-b120e70abb59__game_avatars.jpg"/>
                                        </li>
                                        <li className="list-item"><img alt="avatar game"
                                                                       src="../resources/raw/715867c6-698f-411a-b4f9-1e9093130b60__f79153d0-33e4-11ed-838c-b120e70abb59__game_avatars.jpg"/>
                                        </li>
                                        <li className="list-item"><img alt="avatar game"
                                                                       src="../resources/raw/715867c6-698f-411a-b4f9-1e9093130b60__40daec90-33e5-11ed-838c-b120e70abb59__game_avatars.jpg"/>
                                        </li>
                                        <li className="list-item"><img alt="avatar game"
                                                                       src="../resources/raw/715867c6-698f-411a-b4f9-1e9093130b60__e671c440-34d4-11ed-838c-b120e70abb59__game_avatars.jpg"/>
                                        </li>
                                        <li className="list-item"><img alt="avatar game"
                                                                       src="../resources/raw/715867c6-698f-411a-b4f9-1e9093130b60__38084d60-34d5-11ed-838c-b120e70abb59__game_avatars.jpg"/>
                                        </li>
                                        <li className="list-item"><img alt="avatar game"
                                                                       src="../resources/raw/715867c6-698f-411a-b4f9-1e9093130b60__62295df0-34d5-11ed-838c-b120e70abb59__game_avatars.jpg"/>
                                        </li>
                                        <li className="list-item"><img alt="avatar game"
                                                                       src="../resources/raw/715867c6-698f-411a-b4f9-1e9093130b60__4bb638e0-33f9-11ed-838c-b120e70abb59__game_avatars.jpg"/>
                                        </li>
                                        <li className="list-item"><img alt="avatar game"
                                                                       src="../resources/raw/715867c6-698f-411a-b4f9-1e9093130b60__95575640-37c4-11ed-838c-b120e70abb59__game_avatars.jpg"/>
                                        </li>
                                        <li className="list-item"><img alt="avatar game"
                                                                       src="../resources/raw/715867c6-698f-411a-b4f9-1e9093130b60__d8d57300-37bc-11ed-838c-b120e70abb59__game_avatars.jpg"/>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="filter-player hidden">
                                <select className="form-control gender" id="gender">
                                    <option value="" selected="selected">Giới tính</option>
                                    <option value="nữ">Nữ</option>
                                    <option value="nam">Nam</option>
                                </select>
                                <select className="form-control type" id="zone">
                                    <option value="" selected="selected">Khu vực</option>
                                    <option value="Miền Bắc">Miền Bắc</option>
                                    <option value="Miền Trung">Miền Trung</option>
                                    <option value="Miền Nam">Miền Nam</option>
                                </select>
                                <input type="text" className="form-control price false btn btn-default"
                                       placeholder="Giá thấp nhất" style={{fontWeight: 'bold'}} id="minPrice"/>
                                <input type="text" className="form-control price false btn btn-default"
                                       placeholder="Giá cao nhất" style={{fontWeight: 'bold'}} id="maxPrice"/>
                                <input type="text" className="form-control price false btn btn-default" style={{width: '500px'}}
                                       placeholder="Nhập nick name" id="nickname"/>
                                <button type="button" className="form-control btn-filter btn btn-default"
                                        onClick={searchCCdv}>
                                    <i className="fa fa-search"/> Tìm kiếm
                                </button>
                            </div>

                            <div className="list-player">
                                {(filter.nickname != '' || filter.zone != '' || filter.gender != '' || filter.year != '' && filter.year != null) &&
                                    <SearchCCDV />}
                                {chosenSupplies.length > 0 ? <CcdVsByChosenSupplies/> : <div></div>}

                                <TopServiceCCDV/>
                                <NewCcdVs/>
                                <TopMaleAndFemale/>
                                {localStorage.getItem("account") != null && localStorage.getItem("account") != "" ?
                                    <CCDVProperGender/> : <div></div>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div style={{
                backgroundColor: 'rgb(255, 255, 255)',
                border: '1px solid rgb(204, 204, 204)',
                boxShadow: 'rgba(0, 0, 0, 0.2) 2px 2px 3px',
                position: 'absolute',
                transition: 'visibility 0s linear 0.3s, opacity 0.3s linear 0s',
                opacity: 0,
                visibility: 'hidden',
                zIndex: 2000000000,
                left: '0px',
                top: '-10000px'
            }}>
                <div style={{
                    width: '100%',
                    height: '100%',
                    position: 'fixed',
                    top: '0px',
                    left: '0px',
                    zIndex: 2000000000,
                    backgroundColor: 'rgb(255, 255, 255)',
                    opacity: '0.05'
                }}/>
                <div className="g-recaptcha-bubble-arrow" style={{
                    border: '11px solid transparent',
                    width: '0px',
                    height: '0px',
                    position: 'absolute',
                    pointerEvents: 'none',
                    marginTop: '-11px',
                    zIndex: 2000000000
                }}/>
                <div className="g-recaptcha-bubble-arrow" style={{
                    border: '10px solid transparent',
                    width: '0px',
                    height: '0px',
                    position: 'absolute',
                    pointerEvents: 'none',
                    marginTop: '-10px',
                    zIndex: 2000000000
                }}/>
                <div style={{zIndex: 2000000000, position: 'relative'}}>
                    <iframe title="hình ảnh xác thực reCAPTCHA sẽ hết hạn sau 2 phút nữa" src="index_1.html"
                            name="c-jfcpck8j42i6" frameBorder={0} scrolling="no"
                            sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-top-navigation allow-modals allow-popups-to-escape-sandbox"
                            style={{width: '100%', height: '100%'}}/>
                </div>
            </div>
            <div style={{
                backgroundColor: 'rgb(255, 255, 255)',
                border: '1px solid rgb(204, 204, 204)',
                boxShadow: 'rgba(0, 0, 0, 0.2) 2px 2px 3px',
                position: 'absolute',
                transition: 'visibility 0s linear 0.3s, opacity 0.3s linear 0s',
                opacity: 0,
                visibility: 'hidden',
                zIndex: 2000000000,
                left: '0px',
                top: '-10000px'
            }}>
                <div style={{
                    width: '100%',
                    height: '100%',
                    position: 'fixed',
                    top: '0px',
                    left: '0px',
                    zIndex: 2000000000,
                    backgroundColor: 'rgb(255, 255, 255)',
                    opacity: '0.05'
                }}/>
                <div className="g-recaptcha-bubble-arrow" style={{
                    border: '11px solid transparent',
                    width: '0px',
                    height: '0px',
                    position: 'absolute',
                    pointerEvents: 'none',
                    marginTop: '-11px',
                    zIndex: 2000000000
                }}/>
                <div className="g-recaptcha-bubble-arrow" style={{
                    border: '10px solid transparent',
                    width: '0px',
                    height: '0px',
                    position: 'absolute',
                    pointerEvents: 'none',
                    marginTop: '-10px',
                    zIndex: 2000000000
                }}/>
                <div style={{zIndex: 2000000000, position: 'relative'}}>
                    <iframe title="hình ảnh xác thực reCAPTCHA sẽ hết hạn sau 2 phút nữa" src="index_2.html"
                            name="c-837utcd6rzwu" frameBorder={0} scrolling="no"
                            sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-top-navigation allow-modals allow-popups-to-escape-sandbox"
                            style={{width: '100%', height: '100%'}}/>
                </div>
            </div>
            <div style={{
                backgroundColor: 'rgb(255, 255, 255)',
                border: '1px solid rgb(204, 204, 204)',
                boxShadow: 'rgba(0, 0, 0, 0.2) 2px 2px 3px',
                position: 'absolute',
                transition: 'visibility 0s linear 0.3s, opacity 0.3s linear 0s',
                opacity: 0,
                visibility: 'hidden',
                zIndex: 2000000000,
                left: '0px',
                top: '-10000px'
            }}>
                <div style={{
                    width: '100%',
                    height: '100%',
                    position: 'fixed',
                    top: '0px',
                    left: '0px',
                    zIndex: 2000000000,
                    backgroundColor: 'rgb(255, 255, 255)',
                    opacity: '0.05'
                }}/>
                <div className="g-recaptcha-bubble-arrow" style={{
                    border: '11px solid transparent',
                    width: '0px',
                    height: '0px',
                    position: 'absolute',
                    pointerEvents: 'none',
                    marginTop: '-11px',
                    zIndex: 2000000000
                }}/>
                <div className="g-recaptcha-bubble-arrow" style={{
                    border: '10px solid transparent',
                    width: '0px',
                    height: '0px',
                    position: 'absolute',
                    pointerEvents: 'none',
                    marginTop: '-10px',
                    zIndex: 2000000000
                }}/>
                <div style={{zIndex: 2000000000, position: 'relative'}}>
                    <iframe title="hình ảnh xác thực reCAPTCHA sẽ hết hạn sau 2 phút nữa" src="index_3.html"
                            name="c-xoyknwz7mz5" frameBorder={0} scrolling="no"
                            sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-top-navigation allow-modals allow-popups-to-escape-sandbox"
                            style={{width: '100%', height: '100%'}}/>
                </div>
            </div>
            <div style={{
                backgroundColor: 'rgb(255, 255, 255)',
                border: '1px solid rgb(204, 204, 204)',
                boxShadow: 'rgba(0, 0, 0, 0.2) 2px 2px 3px',
                position: 'absolute',
                transition: 'visibility 0s linear 0.3s, opacity 0.3s linear 0s',
                opacity: 0,
                visibility: 'hidden',
                zIndex: 2000000000,
                left: '0px',
                top: '-10000px'
            }}>
                <div style={{
                    width: '100%',
                    height: '100%',
                    position: 'fixed',
                    top: '0px',
                    left: '0px',
                    zIndex: 2000000000,
                    backgroundColor: 'rgb(255, 255, 255)',
                    opacity: '0.05'
                }}/>
                <div className="g-recaptcha-bubble-arrow" style={{
                    border: '11px solid transparent',
                    width: '0px',
                    height: '0px',
                    position: 'absolute',
                    pointerEvents: 'none',
                    marginTop: '-11px',
                    zIndex: 2000000000
                }}/>
                <div className="g-recaptcha-bubble-arrow" style={{
                    border: '10px solid transparent',
                    width: '0px',
                    height: '0px',
                    position: 'absolute',
                    pointerEvents: 'none',
                    marginTop: '-10px',
                    zIndex: 2000000000
                }}/>
                <div style={{zIndex: 2000000000, position: 'relative'}}>
                    <iframe title="hình ảnh xác thực reCAPTCHA sẽ hết hạn sau 2 phút nữa" src="index_4.html"
                            name="c-9s3rhxajcuwj" frameBorder={0} scrolling="no"
                            sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-top-navigation allow-modals allow-popups-to-escape-sandbox"
                            style={{width: '100%', height: '100%'}}/>
                </div>
            </div>
        </>
    );
};

export default Home;