import SidebarSupplies from "../home/SidebarSupplies";
import TopServiceCCDV from "../home/TopServiceCCDV";
import NewCcdVs from "../home/NewCCDVs";
import React, {useEffect, useLayoutEffect, useState} from "react";
import {useNavigate, useParams} from "react-router";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {addChatReceivers, getChatWithReceiver, setActiveReceiver, setMsgBoxToggle} from "../../service/ChattingService";
import ShowImages from "./ShowImages";
import {convertToFormattedDate} from "../../service/custom/general.function";
import {getAllReviewsByProviderUsername, isAbleToReview, sendReview} from "../../service/ReviewService";
import useModal from "./UseModal";
import ModalCreateBill from "./ModalCreateBill";

// Start Pagination
// import
import {useMemo} from "react";
import Pagination from "../../components/common/Pagination";
import {checkToken} from "../../service/UserService";

// Số phần tử 1 trang
let PageSize = 5;

// End Pagination

function Detail() {
    const [userDetail, setUserDetail] = useState(null);
    const [image, setImage] = useState([]);
    const [interest, setInterest] = useState([])
    const [bill, setBill] = useState([])
    const [star, setStar] = useState(5);
    const [avgStar, setAvgStar] = useState(0);
    const {username} = useParams();
    const navigate = useNavigate();
    const {isShowing, toggle} = useModal();
    const dispatch = useDispatch();
    const msgBoxToggle = useSelector(state => {
        return state.chatting.chatting.msgBoxToggle;
    })
    const reviews = useSelector(state => {
        return state.reviews.reviews.byProviderUsername;
    })
    const storeUser = useSelector(state => {
        return state.user.user.current;
    })
    const isAbleReview = useSelector(state => {
        return state.reviews.reviews.isAble;
    })

    // Start Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const currentTableData = useMemo(() => {
        const firstPageIndex = (currentPage - 1) * PageSize;
        const lastPageIndex = firstPageIndex + PageSize;
        // reviews là mảng gốc các phần tử thật
        return reviews.slice(firstPageIndex, lastPageIndex);
    }, [currentPage, reviews]);
    // End Pagination

    // test function
    const handleStarClicking = (e, star) => {
        setStar(star);
        for (let i = 1; i <= 5; i++) {
            const input = document.querySelector(`#star${i}`);

            if (i <= star) {
                if (!input.classList.contains("fa-star-active")) {
                    input.classList.toggle("fa-star-active");
                }
            } else {
                if (input.classList.contains("fa-star-active")) {
                    input.classList.toggle("fa-star-active");
                }
            }
        }
    }

    const sendReviewFunction = () => {
        const reviewContent = document.querySelector("#reviewContent").value;
        const review = {
            accountCCDV: {
                id: userDetail.account.id
            },
            accountUser: {
                id: storeUser.account.id
            },
            rating : star,
            content: reviewContent
        }
        dispatch(sendReview(review)).then((data) => {
            dispatch(getAllReviewsByProviderUsername(userDetail.account.username));
        });
        // dispatch(sendReview(review));
    }

    useEffect(() => {
        axios.get(`http://localhost:8080/userDetail/` + username, {headers: {Authorization: "Bearer " + localStorage.getItem("token")}})
            .then(response => {
                // console.log(response.data.userProfile);
                // let {birthday} = response.data.userProfile;
                // let newBirthday = convertToFormattedDate(birthday);
                // console.log(newBirthday);
                // let formattedUserProfile = {...response.data.userProfile, [birthday]: newBirthday};

                setUserDetail(response.data.userProfile);
                setImage(response.data.image);
                setInterest(response.data.interests);
                setBill(response.data.bills);

                dispatch(getAllReviewsByProviderUsername(response.data.userProfile.account.username));

            })
            .catch(error => {
                console.log(error);
            });
        axios.get("http://localhost:8080/userDetail/increaseView?username=" + username, {headers: {Authorization: "Bearer " + localStorage.getItem("token")}})
            .then(res => {
                console.log(res.data)
            }).catch(error => {
            console.log(error);
        });
        dispatch(checkToken());
    }, []);

    useEffect(() => {
        try {
            const ids = {
                ccdvId: userDetail.account.id,
                userId: storeUser.account.id,
            }
            dispatch(isAbleToReview(ids));
        } catch (e) {
        }
    }, [storeUser, userDetail])
    // useLayoutEffect(() => {
    //     window.scrollTo(0, 0)
    // });

    useEffect(() => {
        let avg = 0;
        if (reviews.length > 0) {
            let total = 0;
            for (let i = 0; i < reviews.length; i++) {
                total += reviews[i].rating;
            }
            avg = total / reviews.length;
        }
        setAvgStar(avg);
    }, [reviews])

    const addNewChat = () => {
        if (userDetail.account.id != storeUser.account.id) {
            let newReceiver = {
                id: userDetail.account.id,
                username: userDetail.account.username,
                nickname: userDetail.account.nickname,
                avatar: userDetail.account.avatar,
                role: {
                    id: userDetail.account.role.id,
                    nameRole: userDetail.account.role.nameRole,
                },
                status: {
                    id: userDetail.account.status.id,
                    nameStatus: userDetail.account.status.nameStatus,
                },
                isActive: userDetail.account.isActive
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
    }
    const user = useSelector(state => (state.user.user.current));
    //Js function

    return (
        <>
            {userDetail && userDetail.id && < ModalCreateBill isShowing={isShowing}
                                                              hide={toggle}
                                                              userDetail={userDetail}
            />}
        <title>User Profile</title>
        <link rel="apple-touch-icon" sizes="57x57" href="https://playerduo.net/favicons/apple-icon-57x57.png" />
        <link rel="apple-touch-icon" sizes="60x60" href="https://playerduo.net/favicons/apple-icon-60x60.png" />
        <link rel="apple-touch-icon" sizes="72x72" href="https://playerduo.net/favicons/apple-icon-72x72.png" />
        <link rel="apple-touch-icon" sizes="76x76" href="https://playerduo.net/favicons/apple-icon-76x76.png" />
        <link rel="apple-touch-icon" sizes="114x114" href="https://playerduo.net/favicons/apple-icon-114x114.png" />
        <link rel="apple-touch-icon" sizes="120x120" href="https://playerduo.net/favicons/apple-icon-120x120.png" />
        <link rel="apple-touch-icon" sizes="144x144" href="https://playerduo.net/favicons/apple-icon-144x144.png" />
        <link rel="apple-touch-icon" sizes="152x152" href="https://playerduo.net/favicons/apple-icon-152x152.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="https://playerduo.net/favicons/apple-icon-180x180.png" />
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

            {/*Start Pagination Style*/}
            <style dangerouslySetInnerHTML={{__html: "\n.pagination-container {\n  display: flex;\n  list-style-type: none;\n  justify-content: center;\n}\n.pagination-container .pagination-item {\n  padding: 0 12px;\n  height: 32px;\n  text-align: center;\n  margin: auto 4px;\n  color: rgba(0, 0, 0, 0.87);\n  display: flex;\n  box-sizing: border-box;\n  align-items: center;\n  letter-spacing: 0.01071em;\n  border-radius: 16px;\n  line-height: 1.43;\n  font-size: 13px;\n  min-width: 32px;\n}\n.pagination-container .pagination-item.dots:hover {\n  background-color: transparent;\n  cursor: default;\n}\n.pagination-container .pagination-item:hover {\n  background-color: rgba(0, 0, 0, 0.04);\n  cursor: pointer;\n}\n.pagination-container .pagination-item.selected {\n  background-color: rgba(0, 0, 0, 0.08);\n}\n.pagination-container .pagination-item .arrow::before {\n  position: relative;\n  /* top: 3pt; Uncomment this to lower the icons as requested in comments*/\n  content: '';\n  /* By using an em scale, the arrows will size with the font */\n  display: inline-block;\n  width: 0.4em;\n  height: 0.4em;\n  border-right: 0.12em solid rgba(0, 0, 0, 0.87);\n  border-top: 0.12em solid rgba(0, 0, 0, 0.87);\n}\n.pagination-container .pagination-item .arrow.left {\n  transform: rotate(-135deg) translate(-50%);\n}\n.pagination-container .pagination-item .arrow.right {\n  transform: rotate(45deg);\n}\n.pagination-container .pagination-item.disabled {\n  pointer-events: none;\n}\n.pagination-container .pagination-item.disabled .arrow::before {\n  border-right: 0.12em solid rgba(0, 0, 0, 0.43);\n  border-top: 0.12em solid rgba(0, 0, 0, 0.43);\n}\n.pagination-container .pagination-item.disabled:hover {\n  background-color: transparent;\n  cursor: default;\n}\n" }} />
            {/*End Pagination Style*/}

            {
                userDetail ?
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
                                                                               style={{objectFit: "cover", height: "100%"}}/>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                    {/*<div className="rent-time-wrap"><p className="ready">Đang sẵn sàng</p></div>*/}
                                    {/*<div className="social-icon">*/}
                                    {/*    <div className="icon-wrap user-page">*/}
                                    {/*        <a href="https://playerduo.net/rabbitnee" target="_blank" rel="noopener noreferrer">*/}
                                    {/*            {userDetail.account && <img src={userDetail.account.avatar} style={{width:"50px",height:"50px"}} alt="PD" title="Trang cá nhân"*/}
                                    {/*                                        className="option-icon img-rounded"/>}*/}
                                    {/*        </a>*/}
                                    {/*    </div>*/}
                                    {/*</div>*/}
                                    <div className="member-since">
                                        <div>Ngày tham gia:</div>
                                        <span>
                                {new Date(userDetail.dateCreate).toLocaleDateString("en-GB")}
                            </span>
                                    </div>
                                </div>
                                <div className="player-profile-right-wrap col-md-3 col-md-push-6">
                                    <div className="right-player-profile"><p className="price-player-profile">{userDetail.price} đ/h</p>
                                        <div className="rateting-style">
                                            {avgStar.toFixed(1).replace(".", ",")}
                                            &nbsp;
                                            <i className="fas fa-star"></i>
                                            &nbsp;
                                            <span>{reviews ? reviews.length : <></>} <span>Đánh giá</span></span>
                                        </div>
                                        <div className="text-center">
                                            {storeUser && storeUser.account.role.id == 2 ? <button className="btn-my-style red" onClick={toggle}>Thuê</button>
                                                :<></>}                                            {/*<button className="btn-my-style white">Donate</button>*/}
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
                                                    <div style={{marginTop: "20px"}}><p>&nbsp;</p></div>
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
                                                    <div style={{marginTop: "20px"}}><p>&nbsp;</p></div>
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
                                                                   rel="noopener noreferrer">{userDetail.facebookLink}</a>
                                                            </td>
                                                        </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                                <div>
                                                    <div>
                                                        <div className="title-player-profile row">
                                                            <div style={{marginTop: "20px"}}><p>&nbsp;</p></div>
                                                            <div className="col-xs-6"><span>Đánh giá</span></div>
                                                            {
                                                                isAbleReview && isAbleReview == true ?
                                                                    <>
                                                                        <div style={{marginTop: "50px"}}><p>&nbsp;</p></div>
                                                                        <textarea placeholder="Nhập đánh giá ..." name="message" type="text"
                                                                                  className="form-control" defaultValue={""}
                                                                                  style={{marginLeft: "15px", width: "97%"}} id={"reviewContent"}/>
                                                                        <>
                                                                            <style
                                                                                dangerouslySetInnerHTML={{
                                                                                    __html:
                                                                                        "\n.rate {\n    float: left;\n    height: 46px;\n    padding: 0 10px;\n}\n.rate:not(:checked) > input {\n    position:absolute;\n    top:-9999px;\n}\n.rate:not(:checked) > label {\n    float:right;\n    width:1em;\n    overflow:hidden;\n    white-space:nowrap;\n    cursor:pointer;\n    font-size:30px;\n    color:#ccc;\n}\n.rate:not(:checked) > label:before {\n    content: '★ ';\n}\n\n/* Modified from: https://github.com/mukulkant/Star-rating-using-pure-css */\n"
                                                                                }}
                                                                            />

                                                                            <div className="rate" >
                                                                                <i className="fas fa-star fa-star-active" id={"star1"} onClick={(e) => {handleStarClicking(e, 1)}} style={{cursor: "pointer"}}></i>
                                                                                <i className="fas fa-star fa-star-active" id={"star2"} onClick={(e) => {handleStarClicking(e, 2)}} style={{cursor: "pointer"}}></i>
                                                                                <i className="fas fa-star fa-star-active" id={"star3"} onClick={(e) => {handleStarClicking(e, 3)}} style={{cursor: "pointer"}}></i>
                                                                                <i className="fas fa-star fa-star-active" id={"star4"} onClick={(e) => {handleStarClicking(e, 4)}} style={{cursor: "pointer"}}></i>
                                                                                <i className="fas fa-star fa-star-active" id={"star5"} onClick={(e) => {handleStarClicking(e, 5)}} style={{cursor: "pointer"}}></i>
                                                                            {/*    <input type="radio" id="star5" name="rate" defaultValue={5} />*/}
                                                                            {/*    <label htmlFor="star5" title="text">*/}
                                                                            {/*        5 stars*/}
                                                                            {/*    </label>*/}
                                                                            {/*    <input type="radio" id="star4" name="rate" defaultValue={4} />*/}
                                                                            {/*    <label htmlFor="star4" title="text">*/}
                                                                            {/*        4 stars*/}
                                                                            {/*    </label>*/}
                                                                            {/*    <input type="radio" id="star3" name="rate" defaultValue={3} />*/}
                                                                            {/*    <label htmlFor="star3" title="text">*/}
                                                                            {/*        3 stars*/}
                                                                            {/*    </label>*/}
                                                                            {/*    <input type="radio" id="star2" name="rate" defaultValue={2} />*/}
                                                                            {/*    <label htmlFor="star2" title="text">*/}
                                                                            {/*        2 stars*/}
                                                                            {/*    </label>*/}
                                                                            {/*    <input type="radio" id="star1" name="rate" defaultValue={1} />*/}
                                                                            {/*    <label htmlFor="star1" title="text">*/}
                                                                            {/*        1 star*/}
                                                                            {/*    </label>*/}
                                                                            </div>

                                                                            {/*<div className="rate" onClick={(e) => {e.stopPropagation()}}>*/}
                                                                            {/*    <input type="radio" id="star5" name="rate" defaultValue={5} onClick={(e) => {e.nativeEvent.stopImmediatePropagation();handleStarClicking(e, 5);}}/>*/}
                                                                            {/*    <label htmlFor="star5" title="text">*/}
                                                                            {/*        5 stars*/}
                                                                            {/*    </label>*/}
                                                                            {/*    <input type="radio" id="star4" name="rate" defaultValue={4} onClick={(e) => {e.stopPropagation();handleStarClicking(e, 4)}}/>*/}
                                                                            {/*    <label htmlFor="star4" title="text">*/}
                                                                            {/*        4 stars*/}
                                                                            {/*    </label>*/}
                                                                            {/*    <input type="radio" id="star3" name="rate" defaultValue={3} onClick={(e) => {e.stopPropagation();handleStarClicking(e, 3)}}/>*/}
                                                                            {/*    <label htmlFor="star3" title="text">*/}
                                                                            {/*        3 stars*/}
                                                                            {/*    </label>*/}
                                                                            {/*    <input type="radio" id="star2" name="rate" defaultValue={2} onClick={(e) => {e.stopPropagation();handleStarClicking(e, 2)}}/>*/}
                                                                            {/*    <label htmlFor="star2" title="text">*/}
                                                                            {/*        2 stars*/}
                                                                            {/*    </label>*/}
                                                                            {/*    <input type="radio" id="star1" name="rate" defaultValue={1} onClick={(e) => {e.stopPropagation();handleStarClicking(e, 1)}}/>*/}
                                                                            {/*    <label htmlFor="star1" title="text">*/}
                                                                            {/*        1 star*/}
                                                                            {/*    </label>*/}
                                                                            {/*</div>*/}
                                                                        </>

                                                                        <div className={"customButton"} onClick={() => {sendReviewFunction()}}>
                                                                            <p>Gửi</p>
                                                                        </div>
                                                                    </>
                                                                    :
                                                                    <></>
                                                            }

                                                        </div>
                                                        <div className="text-center review-duo-player row">
                                                            <div className="col-md-12">
                                                                {/* Start Pagination */}
                                                                {/* return trong map như thông thường, nhưng mảng duyệt phải là currentTableData */}
                                                                {
                                                                    currentTableData && currentTableData.map((item, key) => {
                                                                        return (
                                                                            <div className="full-size" key={key}>
                                                                            <div className="review-image-small">
                                                                            <div className="avt-rank avt-md"><img
                                                                            src={item.accountUser.avatar}
                                                                            className="avt-1-15 avt-img" alt=""/>
                                                                            </div>
                                                                            </div>
                                                                            <div className="wrapper-content-rating">
                                                                            <div className="review-content"><a target="_blank"
                                                                            href="https://playerduo.net/traiyeumeo">
                                                                            <p className="name-player-review color-vip-1">{item.accountUser.nickname}</p></a>
                                                                            <p className="time-player-review">
                                                                            <span>{new Date(item.date).toLocaleTimeString() + " "
                                                                            + new Date(item.date).toLocaleDateString()}</span>
                                                                            </p>
                                                                            </div>
                                                                            <div className="review-rating">
                                                                            <div className="rateting-style">
                                                                            {
                                                                                [1, 2, 3, 4, 5].map(e => {
                                                                                    if (e <= item.rating) {
                                                                                        return (<i className="fas fa-star"></i>)
                                                                                    }
                                                                                })
                                                                            }
                                                                            &nbsp;
                                                                            </div>
                                                                            </div>
                                                                            <p className="content-player-review">{item.content}</p></div>
                                                                            </div>

                                                                                );
                                                                            })
                                                                        }

                                                                        <div>
                                                                            <Pagination
                                                                                className="pagination-bar"
                                                                                currentPage={currentPage}
                                                                                totalCount={reviews.length}
                                                                                pageSize={PageSize}
                                                                                onPageChange={page => setCurrentPage(page)}
                                                                            />
                                                                        </div>
                                                                {/* reviews là mảng gốc các phần tử thật */}
                                                            {/*    End Pagination*/}
                                                            </div>
                                                            {/*<div className="col-md-12">*/}
                                                            {/*    <div className="page_account"><p className="active">1</p>*/}
                                                            {/*        <p className="">2</p>*/}
                                                            {/*        <p className="">3</p>*/}
                                                            {/*        <p className="">4</p>*/}
                                                            {/*        <p className="">5</p>*/}
                                                            {/*        <p className="active" style={{cursor: "auto"}}>1/36</p>*/}
                                                            {/*    </div>*/}
                                                            {/*</div>*/}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    :
                    <></>
            }
        </>
    )
}

export default Detail