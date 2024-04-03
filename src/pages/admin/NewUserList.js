import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import AdminSlice from "../../redux/AdminSlice";
import {blockAccount, getAllUser} from "../../service/AdminService";
import customAxios from "../../service/api";
import {addChatReceivers, getChatWithReceiver, setActiveReceiver, setMsgBoxToggle} from "../../service/ChattingService";
import Swal from "sweetalert2";

const NewUserList =() =>{
    const dispatch = useDispatch();
    const allUserAc = useSelector((state) => {
        console.log(state.admin.admin.allUser);
        return state.admin.admin.allUser;
    });
    const [account, setAccount] =useState({});
    const blockAccountUser = (object) => {
        setAccount(object);
    };
    useEffect(() =>{
        dispatch(blockAccount(account)).then(() =>{
            dispatch(getAllUser());
        })
    },[account]);

    const [currentPage, setCurrentPage] = useState(1);

    const allAccountUserAc = 5;

    const indexOfLastUser = currentPage * allAccountUserAc;

    const indexOfFirstUser = indexOfLastUser - allAccountUserAc;

    const currenUserAc = allUserAc.slice(indexOfFirstUser, indexOfLastUser);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

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

    return(
        <><link rel="stylesheet" href="/template_admin/css/css_sidebar.css"/>
            <link rel="stylesheet" href="/template_admin/vendors/themefy_icon/themify-icons.css" />
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
                                            <h4>Danh sách người dùng mới nhất </h4>
                                            <div className="box_right d-flex lms_block">
                                                {/*<div className="serach_field_2">*/}
                                                {/*    <div className="search_inner">*/}
                                                {/*        <form active="#">*/}
                                                {/*            <div className="search_field">*/}
                                                {/*                <input*/}
                                                {/*                    type="text"*/}
                                                {/*                    placeholder="Search content here..."*/}
                                                {/*                />*/}
                                                {/*            </div>*/}
                                                {/*            <button type="submit">*/}
                                                {/*                <i className="ti-search" />*/}
                                                {/*            </button>*/}
                                                {/*        </form>*/}
                                                {/*    </div>*/}
                                                {/*</div>*/}
                                                {/*<div className="add_button ms-2">*/}
                                                {/*    <a*/}
                                                {/*        href="#"*/}
                                                {/*        data-toggle="modal"*/}
                                                {/*        data-target="#addcategory"*/}
                                                {/*        className="btn_1"*/}
                                                {/*    >*/}
                                                {/*        search*/}
                                                {/*    </a>*/}
                                                {/*</div>*/}
                                            </div>
                                        </div>
                                        <div className="QA_table mb_30">
                                            <table className="table lms_table_active ">
                                                <thead>
                                                <tr>
                                                    <th scope="col" style={{fontSize :'14px', fontWeight: 'bold'}}>id</th>
                                                    <th scope="col" style={{fontSize :'14px', fontWeight: 'bold'}}>Biệt danh</th>
                                                    <th scope="col" style={{fontSize :'14px', fontWeight: 'bold'}}>Tài khoản</th>
                                                    <th scope="col" style={{fontSize :'14px', fontWeight: 'bold'}}>Email</th>
                                                    <th scope="col" style={{fontSize :'14px', fontWeight: 'bold'}}>Vai trò</th>
                                                    <th scope="col" style={{fontSize :'14px', fontWeight: 'bold'}}>Trạng thái</th>
                                                    <th scope="col" style={{fontSize :'14px', fontWeight: 'bold'}}>Hoạt động</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                {currenUserAc.length>0 &&  currenUserAc.map((item) =>(
                                                <tr>
                                                    <th scope="row">
                                                        <a href="#" className="question_content">
                                                            {item.id}
                                                        </a>
                                                    </th>
                                                    <td onClick={() => {addUserChat(item.username)}} style={{cursor: "pointer"}}>{item.nickname}</td>
                                                    <td onClick={() => {addUserChat(item.username)}} style={{cursor: "pointer"}}>{item.username}</td>
                                                    <td>
                                                        <a className="__cf_email__">
                                                            {item.email}
                                                        </a>
                                                    </td>
                                                    <td>
                                                        {item.role.nameRole === "ROLE_USER" &&
                                                        <a href="#">Người dùng</a>
                                                        }
                                                    </td>
                                                    <td>
                                                        <a href="#" className="status_btn">
                                                            {item.status.nameStatus}
                                                        </a>
                                                    </td>
                                                    <td>
                                                        <div className="action_btns d-flex"  onClick={() => blockAccountUser(item.id)}>
                                                            <a href="#" className="action_btn">
                                                                {" "}
                                                                <i className="ti-unlock" />
                                                            </a>
                                                        </div>
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
                            {currentPage < Math.ceil(allUserAc.length / allAccountUserAc) ? (
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
                </div>
            </div>
        </>
    )
}
export default NewUserList;