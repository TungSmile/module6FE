import React, {useEffect, useLayoutEffect, useState} from "react";
import {useNavigate, useParams} from "react-router";
import axios from "axios";
import {Link} from "react-router-dom";

function AccountSettings() {
    const [billDetail, setBillDetail] = useState([]);
    const id = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:8080/bills/findBill/${id.id}`)
            .then(response => {
                setBillDetail(response.data);
                console.log(response.data)
            })
            .catch(error => {
                console.log(error);
            });
    }, []);
    return (
        <>
            <meta httpEquiv="origin-trial"
                  content="Az520Inasey3TAyqLyojQa8MnmCALSEU29yQFW8dePZ7xQTvSt73pHazLFTK5f7SyLUJSo2uKLesEtEa9aUYcgMAAACPeyJvcmlnaW4iOiJodHRwczovL2dvb2dsZS5jb206NDQzIiwiZmVhdHVyZSI6IkRpc2FibGVUaGlyZFBhcnR5U3RvcmFnZVBhcnRpdGlvbmluZyIsImV4cGlyeSI6MTcyNTQwNzk5OSwiaXNTdWJkb21haW4iOnRydWUsImlzVGhpcmRQYXJ0eSI6dHJ1ZX0="/>
            <meta httpEquiv="origin-trial"
                  content="Az520Inasey3TAyqLyojQa8MnmCALSEU29yQFW8dePZ7xQTvSt73pHazLFTK5f7SyLUJSo2uKLesEtEa9aUYcgMAAACPeyJvcmlnaW4iOiJodHRwczovL2dvb2dsZS5jb206NDQzIiwiZmVhdHVyZSI6IkRpc2FibGVUaGlyZFBhcnR5U3RvcmFnZVBhcnRpdGlvbmluZyIsImV4cGlyeSI6MTcyNTQwNzk5OSwiaXNTdWJkb21haW4iOnRydWUsImlzVGhpcmRQYXJ0eSI6dHJ1ZX0="/>
            <meta charSet="UTF-8"/>
            <meta httpEquiv="Pragma" content="no-cache"/>
            <meta httpEquiv="Expires" content={-1}/>
            <meta name="viewport" content="width=device-width,initial-scale=1,shrink-to-fit=no,maximum-scale=1"/>
            <meta name="theme-color" content="#000000"/>
            <meta httpEquiv="X-UA-Compatible" content="ie=edge"/>
            <meta name="description" content="Tham gia cộng đồng game thủ lớn nhất Việt Nam."/>
            <meta name="keywords" content="Tham gia cộng đồng game thủ lớn nhất Việt Nam."/>
            <meta name="google-site-verification" content="KYBoGz-bgnBnLpEUr3USGpSo1rVAvTS9LH44oCeunFw"/>
            <meta name="google" value="notranslate"/>
            <meta name="robots" content="INDEX,FOLLOW"/>
            <meta content="index,follow" name="googlebot"/>
            <meta name="copyright" content=" PlayerDuo 2022"/>
            <meta name="keywords" content="Playerduo, player duo, play dua, thuê gái chơi game"/>
            <meta name="description"
                  content="PlayerDuo Cộng đồng game thủ lớn nhất Việt Nam, Cùng chơi với những game thủ chuyên nghiệp, hot streamer, hot girl và những người nổi tiếng."/>
            <title>Game Community</title>
            <meta content="index,follow" name="googlebot"/>
            <meta name="copyright" content=" PlayerDuo 2022"/>
            <meta name="robots" content="INDEX,FOLLOW"/>
            <meta property="og:type" content="article"/>
            <meta property="og:title" content="Game Community"/>
            <meta property="og:description" content="Tham gia cộng đồng game thủ lớn nhất Việt Nam."/>
            <meta property="og:image" content="https://files.playerduo.net/production/images/thumbs.png"/>
            <meta property="og:video" content/>
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
            <link rel="stylesheet" type="text/css" href="../resources/9.cb7de3a7.chunk.css"/>
            <link rel="stylesheet" href="../resources/css-user-information.css"/>
            <noscript>Bạn cần có cho phép Javascript hoạt động để chạy ứng dụng PlayerDuo.</noscript>
            <div id="root">
                <div className="hidden">
                    <audio src="../resources/raw/notification-sound.805a8904.mp3"/>
                    <audio src="../resources/raw/notification-group-sound.4c7ac55b.mp3"/>
                    <audio src="../resources/raw/unconvinced.1de6c75d.mp3"/>
                </div>
                <div className="notifications-wrapper"/>
                <div className="message__popup  false">
                    <div className="message__popup--icon"><img src="../resources/raw/popup-chat.png" className
                                                               alt="PD"/></div>
                </div>
                <div className="wrapper">
                    <div className="setting__main row">
                        <div className="setting__main--menu col-lg-3 col-md-3 col-sm-12 col-xs-12">
                            <div className="menu">
                                <div className="menu__setting  panel-group">
                                    <div className="menu__setting--main panel panel-default">
                                        <div className="panel-heading">
                                            <div className="panel-title"><a aria-expanded="true" className role="button"
                                                                            href="#">TÀI
                                                KHOẢN <i className="fas fa-chevron-down"/></a></div>
                                        </div>
                                        <div className="panel-collapse collapse in" style={{}}>
                                            <div className="panel-body">
                                                <div className="panel-group">
                                                    <div className="menu__setting--sub panel panel-default">
                                                        <div className="panel-heading">
                                                            <div className=" active panel-title"><i
                                                                className="fas fa-user-tie"/> Thông
                                                                tin cá nhân
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="menu__setting--sub panel panel-default">
                                                        <div className="panel-heading">
                                                            <div className="  panel-title"><i
                                                                className="fas fa-sliders-h"/> Thống kê
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="menu__setting--sub panel panel-default">
                                                        <div className="panel-heading">
                                                            <div className="title-sub  panel-title"><a
                                                                aria-expanded="false" className="collapsed"
                                                                role="button" href="#"><i className="fas fa-cog"/> Cài
                                                                đặt <i className="fas fa-chevron-right"/></a></div>
                                                        </div>
                                                        <div className="panel-collapse collapse">
                                                            <div className="panel-body">
                                                                <div className="panel-group">
                                                                    <div
                                                                        className="menu__setting--last panel panel-default">
                                                                        <div className="panel-heading">
                                                                            <div className="panel-title">Email</div>
                                                                        </div>
                                                                    </div>
                                                                    <div
                                                                        className="menu__setting--last panel panel-default">
                                                                        <div className="panel-heading">
                                                                            <div className="panel-title">Tài khoản và
                                                                                mật khẩu
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div
                                                                        className="menu__setting--last panel panel-default">
                                                                        <div className="panel-heading">
                                                                            <div className="panel-title">Khoá bảo vệ
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div
                                                                        className="menu__setting--last panel panel-default">
                                                                        <div className="panel-heading">
                                                                            <div className="panel-title">Vip</div>
                                                                        </div>
                                                                    </div>
                                                                    <div
                                                                        className="menu__setting--last panel panel-default">
                                                                        <div className="panel-heading">
                                                                            <div className="panel-title">Hiển thị</div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="menu__setting--sub panel panel-default">
                                                        <div className="panel-heading">
                                                            <div className="title-sub  panel-title"><a
                                                                aria-expanded="false" className="collapsed"
                                                                role="button" href="#"><i
                                                                className="fas fa-history"/> Lịch sử giao dịch <i
                                                                className="fas fa-chevron-right"/></a></div>
                                                        </div>
                                                        <div className="panel-collapse collapse">
                                                            <div className="panel-body">
                                                                <div className="panel-group">
                                                                    <div
                                                                        className="menu__setting--last panel panel-default">
                                                                        <div className="panel-heading">
                                                                            <div className="panel-title">Lịch sử
                                                                                donate
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div
                                                                        className="menu__setting--last panel panel-default">
                                                                        <div className="panel-heading">
                                                                            <div className="panel-title">Lịch sử duo
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div
                                                                        className="menu__setting--last panel panel-default">
                                                                        <div className="panel-heading">
                                                                            <div className="panel-title">Lịch sử tạo
                                                                                code
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div
                                                                        className="menu__setting--last panel panel-default">
                                                                        <div className="panel-heading">
                                                                            <div className="panel-title">Biến động số
                                                                                dư
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div
                                                                        className="menu__setting--last panel panel-default">
                                                                        <div className="panel-heading">
                                                                            <div className="panel-title">Lịch sử mua
                                                                                thẻ
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="menu__setting--sub panel panel-default">
                                                        <div className="panel-heading">
                                                            <div className="  panel-title"><i
                                                                className="fas fa-credit-card"/> Thanh toán
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="menu__setting--sub panel panel-default">
                                                        <div className="panel-heading">
                                                            <div className="  panel-title"><i
                                                                className="fas fa-wallet"/> Ví
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="menu__setting--main panel panel-default">
                                        <div className="panel-heading">
                                            <div className="panel-title"><a aria-expanded="true" className role="button"
                                                                            href="#">VÍ ĐIỆN
                                                TỬ <i className="fas fa-chevron-down"/></a></div>
                                        </div>
                                        <div className="panel-collapse collapse in" style={{}}>
                                            <div className="panel-body">
                                                <div className="panel-group">
                                                    <div className="menu__setting--sub panel panel-default">
                                                        <div className="panel-heading">
                                                            <div className="title-sub  panel-title"><a
                                                                aria-expanded="false" className="collapsed"
                                                                role="button" href="#"><i
                                                                className="fas fa-credit-card"/> Cài đặt <i
                                                                className="fas fa-chevron-right"/></a></div>
                                                        </div>
                                                        <div className="panel-collapse collapse">
                                                            <div className="panel-body">
                                                                <div className="panel-group">
                                                                    <div
                                                                        className="menu__setting--last panel panel-default">
                                                                        <div className="panel-heading">
                                                                            <div className="panel-title">Thông tin</div>
                                                                        </div>
                                                                    </div>
                                                                    <div
                                                                        className="menu__setting--last panel panel-default">
                                                                        <div className="panel-heading">
                                                                            <div className="panel-title">Lịch sử</div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="menu__setting--sub panel panel-default">
                                                        <div className="panel-heading">
                                                            <div className="  panel-title"><i
                                                                className="fas fa-link"/> Link Pay
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="menu__setting--main panel panel-default">
                                        <div className="panel-heading">
                                            <div className="panel-title"><a aria-expanded="true" className role="button"
                                                                            href="#">PLAYER
                                                <i className="fas fa-chevron-down"/></a></div>
                                        </div>
                                        <div className="panel-collapse collapse in" style={{}}>
                                            <div className="panel-body">
                                                <div className="panel-group">
                                                    <div className="menu__setting--sub panel panel-default">
                                                        <div className="panel-heading">
                                                            <div className="  panel-title"><i
                                                                className="fas fa-user-tie"/> Tổng quan
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="menu__setting--sub panel panel-default">
                                                        <div className="panel-heading">
                                                            <div className="  panel-title">
                                                                <i className="fas fa-user-friends"/> Khách
                                                                hàng thân thiết
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="menu__setting--sub panel panel-default">
                                                        <Link to={"/album"}>
                                                            <div className="panel-heading">
                                                                <div className="title-sub  panel-title">
                                                                    <a aria-expanded="True" className="collapsed"
                                                                       role="button" href="">
                                                                        <i className="fas fa"/> Album Player <i
                                                                        className="fas fa-chevron-right"/>
                                                                    </a>
                                                                </div>
                                                            </div>
                                                        </Link>
                                                        <div className="panel-collapse collapse">
                                                            <div className="panel-body">
                                                                <div className="panel-group">
                                                                    <div
                                                                        className="menu__setting--last panel panel-default">
                                                                        <div className="panel-heading">
                                                                            <div className="panel-title">Url</div>
                                                                        </div>
                                                                    </div>
                                                                    <div
                                                                        className="menu__setting--last panel panel-default">
                                                                        <div className="panel-heading">
                                                                            <div className="panel-title">Thông tin
                                                                                Player
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div
                                                                        className="menu__setting--last panel panel-default">
                                                                        <div className="panel-heading">
                                                                            <div className="panel-title">Albums Player
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div
                                                                        className="menu__setting--last panel panel-default">
                                                                        <div className="panel-heading">
                                                                            <div className="panel-title">Cài đặt Duo
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div
                                                                        className="menu__setting--last panel panel-default">
                                                                        <div className="panel-heading">
                                                                            <div className="panel-title">Khác</div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="menu__setting--sub panel panel-default">
                                                        <div className="panel-heading">
                                                            <div className="title-sub  panel-title"><a
                                                                aria-expanded="false" className="collapsed"
                                                                role="button" href="#"><i
                                                                className="far fa-calendar-alt"/> Lịch sử nhận Duo,
                                                                Donate <i className="fas fa-chevron-right"/></a></div>
                                                        </div>
                                                        <div className="panel-collapse collapse">
                                                            <div className="panel-body">
                                                                <div className="panel-group">
                                                                    <div
                                                                        className="menu__setting--last panel panel-default">
                                                                        <div className="panel-heading">
                                                                            <div className="panel-title">Lịch sử nhận
                                                                                duo
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div
                                                                        className="menu__setting--last panel panel-default">
                                                                        <div className="panel-heading">
                                                                            <div className="panel-title">Lịch sử nhận
                                                                                donate
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="menu__setting--sub panel panel-default">
                                                        <div className="panel-heading">
                                                            <div className="  panel-title"><i
                                                                className="fas fa-ban"/> Danh sách chặn
                                                                User
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="menu__setting--sub panel panel-default">
                                                        <div className="panel-heading">
                                                            <div className="  panel-title"><i
                                                                className="fas fa-book"/> Hướng Dẫn Player
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="menu__setting--sub panel panel-default">
                                                        <div className="panel-heading">
                                                            <div className="  panel-title"><i
                                                                className="fas fa-link"/> Link Player
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="menu__setting--main panel panel-default">
                                        <div className="panel-heading">
                                            <div className="panel-title"><a aria-expanded="true" className role="button"
                                                                            href="#">DONATE
                                                <i className="fas fa-chevron-down"/></a></div>
                                        </div>
                                        <div className="panel-collapse collapse in" style={{}}>
                                            <div className="panel-body">
                                                <div className="panel-group">
                                                    <div className="menu__setting--sub panel panel-default">
                                                        <div className="panel-heading">
                                                            <div className="  panel-title"><i
                                                                className="fas fa-cog"/> Cài đặt
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="btn-drawer-setting visible-xs"><i className="fas fa-chevron-right"/>
                                </div>
                            </div>
                        </div>

                        {/*body*/}
                        <div className="col-lg-9 col-md-9 col-sm-12 col-xs-12">
                            <div className="aside"><h3>Bill Detail</h3>
                                <div className="playerhistory-table">
                                    <div className="table-responsive">
                                        <table
                                            className="table table-striped table-bordered table-condensed table-hover">
                                            <thead>
                                            <tr>
                                                <th>Tên Người Yêu</th>
                                                <th>Dịch Vụ</th>
                                                <th>Thời Gian Thuê</th>
                                                <th>Ngày Thuê</th>
                                                <th>Tổng Đơn</th>
                                                <th>Trạng Thái</th>
                                                <th>Hành Động</th>
                                                <th>Lý Do</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            <tr>
                                                <td>{billDetail.accountUser && billDetail.accountUser.username}</td>
                                                <td>{billDetail.supplies}</td>
                                                <td>{billDetail.hour} Giờ</td>
                                                <td>{billDetail.dateCreate}</td>
                                                <td>{billDetail.total}</td>
                                                <td>{billDetail.accountUser && billDetail.accountUser.status.nameStatus}</td>
                                                <td>{billDetail.status && billDetail.status.nameStatus}</td>
                                                <td>{billDetail.userMessage}</td>
                                            </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default AccountSettings;