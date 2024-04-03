 import ShowImages from "../profile/ShowImages";
import React, {useEffect, useState} from "react";
import {addChatReceivers, setActiveReceiver, setMsgBoxToggle} from "../../service/ChattingService";
import {useDispatch, useSelector} from "react-redux";
import axios from "axios";
import {useNavigate, useParams} from "react-router";

const DetailCCDV =(object) =>{
    const [userDetail, setUserDetail] = useState({});
    const [image, setImage] = useState([]);
    const [interest, setInterest] = useState([])
    const [bill, setBill] = useState([])
    const {username} = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch(); const msgBoxToggle = useSelector(state => {
        return state.chatting.chatting.msgBoxToggle;
    });
    let userName = object.data.account.username;
    useEffect(() => {
        axios.get(`http://localhost:8080/userDetail/` + userName,{headers: {Authorization: "Bearer " + localStorage.getItem("token")}})
            .then(response => {
                // console.log(response.data.userProfile);
                // let {birthday} = response.data.userProfile;
                // let newBirthday = convertToFormattedDate(birthday);
                // console.log(newBirthday);
                // let formattedUserProfile = {...response.data.userProfile, [birthday]: newBirthday};
                setUserDetail(response.data.userProfile);
                setImage(response.data.image)
                setInterest(response.data.interests)
                setBill(response.data.bills)
            })
            .catch(error => {
                console.log(error);
            });
    }, []);
    const addNewChat = () => {
        let newReceiver = {
            id: object.data.account.id,
            username: object.data.account.username,
            nickname: object.data.account.nickname,
            avatar: object.data.account.avatar,
            role: {
                id: object.data.account.role.id,
                nameRole: object.data.account.role.nameRole,
            },
            status: {
                id: object.data.account.status.id,
                nameStatus: object.data.account.status.nameStatus,
            },
            isActive: object.data.account.isActive
        }
        dispatch(addChatReceivers(newReceiver));
        dispatch(setActiveReceiver(newReceiver));

        if (!msgBoxToggle) {
            dispatch(setMsgBoxToggle());
        }
    }
    return(
        <>
            <link rel="icon" type="image/png" sizes="192x192" href="../resources/raw/android-icon-192x192.png" />
            <link rel="icon" type="image/png" sizes="32x32" href="../resources/raw/favicon-32x32.png" />
            <link rel="icon" type="image/png" sizes="96x96" href="../resources/raw/favicon-96x96.png" />
            <link rel="icon" type="image/png" sizes="16x16" href="../resources/raw/favicon-16x16.png" />
            <link rel="manifest" href="https://playerduo.net/manifest.json" />
            <meta name="msapplication-TileColor" content="#ffffff" />
            <meta name="msapplication-TileImage" content="/favicons/ms-icon-144x144.png" />
            <meta name="theme-color" content="#ffffff" />
            <link rel="shortcut icon" href="../resources/raw/favicon.ico" />
            <link href="../resources/all.css" rel="stylesheet" />
            <link href="../resources/css.css" rel="stylesheet" />
            <link href="../resources/8.97b85fe3.chunk.css" rel="stylesheet" />
            <link href="../resources/main.3e229f12.chunk.css" rel="stylesheet" />
            <link rel="stylesheet" type="text/css" href="../resources/0.cbdbec7b.chunk.css" />
            <link rel="stylesheet" type="text/css" href="../resources/3.fe7e74cf.chunk.css" />
            <link rel="stylesheet" type="text/css" href="../resources/10.697bc269.chunk.css" />
            <link rel="stylesheet" href="../resources/css-user-profile.css" />
            <div >
                <div className="hidden">
                    <audio src="../resources/raw/notification-sound.805a8904.mp3"/>
                    <audio src="../resources/raw/notification-group-sound.4c7ac55b.mp3"/>
                    <audio src="../resources/raw/unconvinced.1de6c75d.mp3"/>
                </div>
                <div className="notifications-wrapper"/>
                <div className="message__popup  false">
                    <div className="message__popup--icon">
                        <img src="../resources/raw/popup-chat.png" className alt="PD"/></div>
                </div>
                <div className="wrapper">
                    <div className="container player-infomation">
                        <div className="player-profile-left-wrap col-md-3">
                            <div className="avt-player false">
                                <div>
                                    <div className="avt avt-lg">
                                        {
                                            userDetail.account && <img src={userDetail.account.avatar} alt="Avatar"
                                                                       style={{width: "100%", height: "100%"}}/>
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className="member-since">
                                <div>Ngày tham gia:</div>
                                <span>
                                {new Date(userDetail.dateCreate).toLocaleDateString()}
                            </span>
                            </div>
                        </div>
                        <div className="player-profile-right-wrap col-md-3 col-md-push-6">
                            <div className="right-player-profile"><p className="price-player-profile">{userDetail.price} đ/h</p>
                                <div className="rateting-style"><i className="fas fa-star"></i><i
                                    className="fas fa-star"></i><i
                                    className="fas fa-star"></i><i className="fas fa-star"></i><i
                                    className="fas fa-star-half-alt"></i>&nbsp;<span>352 <span>Đánh giá</span></span>
                                </div>
                                <div className="text-center">
                                    <button className="btn-my-style white" onClick={() => {addNewChat()}}>
                                        <i className="fas fa-comment-alt"></i>Chat
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="player-profile-main-wrap col-md-6 col-md-pull-3">
                            <div>
                                <div className="row">
                                    <div className="center-item col-md-12">
                                        <span className="name-player-profile hidden-over-name">{userDetail.account && userDetail.account.nickname}</span>
                                        {/*<button className="btn-follow-player"><i className="fas fa-heart"></i>&nbsp;*/}
                                        {/*    <span className="plus">*/}
                                        {/*        <span>Theo dõi</span>*/}
                                        {/*    </span>*/}
                                        {/*</button>*/}
                                    </div>
                                </div>
                                <div className="nav-player-profile row">
                                    <div className="col-md-3 col-xs-6">
                                        <div className="item-nav-name"><span>Đã được thuê</span></div>
                                        <div className="item-nav-value">{bill.length}&nbsp;<span> lần</span></div>
                                    </div>
                                    <div className="col-md-3 col-xs-6">
                                        <div className="item-nav-name"><span>Số lượt xem</span></div>
                                        <div className="item-nav-value">{userDetail.views} <span> lượt</span></div>
                                    </div>
                                    {/*<div className="col-md-3 col-xs-6">*/}
                                    {/*    <div className="item-nav-name"><span>Tỷ lệ hoàn thành</span></div>*/}
                                    {/*    <div className="item-nav-value">100&nbsp;%</div>*/}
                                    {/*</div>*/}
                                </div>
                                <div>
                                    <div className="game-category row">
                                        <div className="title-player-profile row">
                                            <div className="col-xs-6"><span>Dịch vụ</span></div>
                                        </div>
                                        {userDetail.supplies && userDetail.supplies.length > 0 && userDetail.supplies.map((item, key) => (
                                            <div className="choose-game" style={{background: "url(&quot;715867c6-698f-411a-b4f9-1e9093130b60__2649fa50-37c9-11ed-838c-b120e70abb59__game_backgrounds.jpg&quot;) center center no-repeat"}}>
                                                <p className="overlay" key={key}>{item.nameSupply}</p>

                                            </div>
                                        ))}

                                    </div>
                                    <div>
                                        <div className="title-player-profile row">
                                            <div className="col-xs-6"><span>Thông tin</span></div>
                                        </div>
                                        <div className="content-player-profile">
                                            <div className="album-of-player">
                                                {image.length > 0 && <ShowImages images={image}/>}

                                                {/*<div>*/}
                                                {/*    <a href="https://playerduo.net/api/upload-service/images/029f1f12-4fb8-4b21-8171-ca7bf863e2f8__ae016c20-4679-11ee-a657-a54d6be1d46a__player_album.jpg"*/}
                                                {/*       style={{display: "block"}}>*/}
                                                {/*        {image && image.map(image => (*/}
                                                {/*            <img key={image.id} src={image.img}*/}
                                                {/*                 alt={`Ảnh chân dung ${image.id}`}*/}
                                                {/*                 style={{width: "50px", height: "50px"}}/>))}*/}
                                                {/*    </a>*/}

                                                {/*    <div className="clearfix"></div>*/}
                                                {/*</div>*/}
                                            </div>
                                            <table className={"table table-bordered"}>
                                                <tbody>
                                                <tr>
                                                    <td>Họ tên</td>
                                                    <td>{userDetail.firstName} {userDetail.lastName}</td>
                                                </tr>
                                                <tr>
                                                    <td>Giới tính</td>
                                                    <td>{userDetail.gender}</td>
                                                </tr>
                                                <tr>
                                                    <td>Năm sinh</td>
                                                    <td>{new Date(userDetail.birthday).toLocaleDateString()}</td>
                                                </tr>
                                                <tr>
                                                    <td>Chiều cao</td>
                                                    <td>{userDetail.height}</td>
                                                </tr>
                                                <tr>
                                                    <td>Cân nặng</td>
                                                    <td>{userDetail.weight}</td>
                                                </tr>
                                                <tr>
                                                    <td>Địa chỉ</td>
                                                    <td>{userDetail.address}, {userDetail.country}</td>
                                                </tr>
                                                <tr>
                                                    <td>Mô tả về bản thân</td>
                                                    <td>{userDetail.describes}</td>
                                                </tr>
                                                <tr>
                                                    <td>Yêu cầu với người thuê</td>
                                                    <td>{userDetail.basicRequest}</td>
                                                </tr>
                                                <tr>
                                                    <td>Facebook</td>
                                                    <td><a href={userDetail.facebookLink} target="_blank"
                                                           rel="noopener noreferrer">{userDetail.facebookLink}</a></td>
                                                </tr>
                                                </tbody>
                                            </table>
                                            {/*<p>Tên: {userDetail.firstName} {userDetail.lastName}</p>*/}
                                            {/*<p>Địa Chỉ: {userDetail.address}, {userDetail.country}</p>*/}
                                            {/*<p>Năm Sinh: {userDetail.birthday}</p>*/}
                                            {/*<p>Giới Tính: {userDetail.gender}</p>*/}
                                            {/*<p>Chiều Cao: {userDetail.height}</p>*/}
                                            {/*<p>Cân Nặng: {userDetail.weight}</p>*/}
                                            {/*<p>Mô tả về bản thân: {userDetail.describes}</p>*/}
                                            {/*<p>Yêu cầu với người thuê: {userDetail.basicRequest}</p>*/}
                                        </div>
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
export default DetailCCDV;