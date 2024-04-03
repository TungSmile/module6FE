import React, {useEffect, useState} from "react";
import DetailCCDV from "./DetailCCDV";
import {useDispatch, useSelector} from "react-redux";
import {activeAccount, blockAccount, getListReport} from "../../service/AdminService";
import customAxios from "../../service/api";
import {addChatReceivers, getChatWithReceiver, setActiveReceiver, setMsgBoxToggle} from "../../service/ChattingService";
import Swal from "sweetalert2";

const AccountReport =() =>{
    const dispatch = useDispatch();
    const [userParam, setUserParam] = useState("");
    const reportList = useSelector((state) => {
        return state.admin.admin.listReport;
    });
    console.log(reportList + 8282828)
    const handleInputChange = (e) => {
        setUserParam(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

    }
    useEffect(() =>{
       dispatch(getListReport(userParam))
    },[userParam])
    const [currentPage, setCurrentPage] = useState(1);

    const allListReport = 5;

    const indexOfLastAllCCDV = currentPage * allListReport;

    const indexOfFirstAlLCCDV = indexOfLastAllCCDV - allListReport;

    const currenAllListReport = reportList.slice(indexOfFirstAlLCCDV, indexOfLastAllCCDV);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const [idAccount, setIdAccount] = useState({});
    const [username, setUsername] = useState('');
    const activeAc = (str) => {
        setUsername(str);
    };
    const blockAc = (object) => {
        setIdAccount(object);
        console.log(idAccount)
    };

    const addUserChat = (username) => {
        const account = customAxios.get("userDetail/"+ username)
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
            .catch(reason => {
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: 'Tài khoản không khả dụng.',
                    showConfirmButton: false,
                    timer: 1500
                });
            })
    }

    const storeUser = useSelector(state => {
        return state.user.user.current;
    });
    const msgBoxToggle = useSelector(state => {
        return state.chatting.chatting.msgBoxToggle;
    });

    useEffect(() =>{
        dispatch(blockAccount(idAccount)).then(() =>{
            dispatch(getListReport(userParam));
        })
    },[idAccount])
    useEffect(() =>{
        dispatch(activeAccount(username)).then(() =>{
            dispatch(getListReport(userParam));
        })
    },[username]);
    return(
        <>
            <link rel="stylesheet" href="/template_admin/css/css_sidebar.css"/>
            <link rel="stylesheet" href="/template_admin/vendors/themefy_icon/themify-icons.css"/>
            <div className="main_content_iner overly_inner ">
                <div className="container-fluid p-0 ">
                    <div className="row">
                        <div className="col-12">
                            <div className="page_title_box d-flex flex-wrap align-items-center justify-content-between">
                                <div className="page_title_left d-flex align-items-center">
                                    {/*  có thể điền tiêu đề  */}
                                </div>
                                <div className="page_title_right">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="white_card card_height_100 mb_30 pt-4">
                                <div className="white_card_body">
                                    <div className="QA_section">
                                        <div className="white_box_tittle list_header">
                                            <h4>Danh sách tố cáo </h4>
                                            <div className="box_right d-flex lms_block">
                                                <div className="serach_field_2">
                                                    <div className="search_inner">
                                                        <form onSubmit={handleSubmit}>
                                                            <div className="search_field">
                                                                <input type="text" placeholder="Nhập username để tìm kiếm..." value={userParam} onChange={handleInputChange}
                                                                />
                                                            </div>
                                                        </form>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="QA_table mb_30">
                                            <table className="table lms_table_active ">
                                                <thead>
                                                <tr>
                                                    <th scope="col" style={{fontSize :'14px', fontWeight: 'bold'}}>id</th>
                                                    <th scope="col" style={{fontSize :'14px', fontWeight: 'bold'}}>Tài khoản người tố cáo</th>
                                                    <th scope="col" style={{fontSize :'14px', fontWeight: 'bold'}}>Tài khoản người bị tố cáo</th>
                                                    <th scope="col" style={{fontSize :'14px', fontWeight: 'bold'}}>Quyền người bị tố cáo</th>
                                                    <th scope="col" style={{fontSize :'14px', fontWeight: 'bold'}}>Nội dung tố cáo</th>
                                                    <th scope="col" style={{fontSize :'14px', fontWeight: 'bold'}}>Trạng thái tài khoản người bị tố cáo</th>
                                                    <th scope="col" style={{fontSize :'14px', fontWeight: 'bold'}}>Hoạt động</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                {currenAllListReport.length > 0 && currenAllListReport.map((item) => (
                                                    <tr>
                                                        <th scope="row">
                                                            <a href="#" className="question_content">
                                                                {item.id}
                                                            </a>
                                                        </th>
                                                        <td onClick={() => {addUserChat(item.send.username)}} style={{cursor: "pointer"}}>{item.send.username}</td>
                                                        <td onClick={() => {addUserChat(item.receiver.username)}} style={{cursor: "pointer"}}>{item.receiver.username}</td>
                                                        <td>
                                                            {item.receiver.role.nameRole === "ROLE_CCDV" &&
                                                            <a style={{color: "black"}} href="#">Người CCDV</a>
                                                            }
                                                            {item.receiver.role.nameRole === "ROLE_USER" &&
                                                                <a style={{color: "black"}} href="#">Người dùng</a>
                                                            }
                                                        </td>
                                                        <td>
                                                            <div >
                                                                {item.content}
                                                            </div>
                                                        </td>
                                                        <td>
                                                            {item.receiver.status.nameStatus === "active" &&
                                                            <a href="#" className="status_btn">
                                                                đã kích hoạt
                                                            </a>
                                                            }
                                                            {item.receiver.status.nameStatus === "block" &&
                                                                <a href="#" className="status_btn" style={{backgroundColor : 'red'}}>
                                                                    đã bị khóa
                                                                </a>
                                                            }
                                                            {item.receiver.status.nameStatus === "register" &&
                                                                <a href="#" className="status_btn" style={{backgroundColor : 'orange'}}>
                                                                    chờ xác nhận
                                                                </a>
                                                            }
                                                        </td>
                                                        <td>
                                                            {item.receiver.status.nameStatus === "active"   &&(
                                                                <>
                                                                    <div className="action_btns d-flex">
                                                                        <a href="#" className="action_btn" onClick={() => blockAc(item.receiver.id)}>
                                                                            {" "}
                                                                            <i className="ti-unlock" />
                                                                        </a>
                                                                    </div>
                                                                </>
                                                            )}

                                                            { item.receiver.status.nameStatus === "block" &&(
                                                                <>
                                                                    <div className="action_btns d-flex" >
                                                                        <a href="#" className="action_btn" onClick={() => activeAc(item.receiver.username)}>
                                                                            {" "}
                                                                            <i className="ti-lock" />
                                                                        </a>
                                                                    </div>
                                                                </>
                                                            )}
                                                        </td>
                                                    </tr>
                                                ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/*Phân trang*/}
                    <div className="pagination-container">
                        <ul className="pagination">
                            {currentPage === 1 ? (
                                <li className="disabled">
                                    <button>&lt; Trang trước</button>
                                </li>
                            ) : (
                                <li>
                                    <button onClick={() => paginate(currentPage - 1)}>&lt; Trang trước</button>
                                </li>
                            )}
                            {currentPage < Math.ceil(reportList.length / allListReport) ? (
                                <li>
                                    <button onClick={() => paginate(currentPage + 1)}>Trang tiếp theo &gt;</button>
                                </li>
                            ) : (
                                <li className="disabled">
                                    <button>Trang tiếp theo &gt;</button>
                                </li>
                            )}
                        </ul>
                    </div>
                    {/*    hêt phân trang*/}
                    {/*    <DetailCCDV/>*/}
                    {/*    <DetailCCDV data={detailCCDV}/>*/}
                </div>
            </div>

        </>
    )
}
export default AccountReport;