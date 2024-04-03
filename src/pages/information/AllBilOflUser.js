import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import {cancelBill, completes, getAllBillByIdUser, setFocusBill, setFocusBillId} from "../../service/BillsService";
import {checkToken} from "../../service/UserService";
import axios from "axios";
import Swal from "sweetalert2";
import $ from "jquery";

const AllBillOfUser = () => {

    let idAccount = JSON.parse(localStorage.getItem("account")).id;

    const dispatch = useDispatch();

    const stompClient = useSelector(state => {
        return state.chatting.stompClient;
    })

    const allBillOfUser = useSelector((state) => {
        return state.BillByAccount.BillByAccount.allBillByUser;
    });

    const stringComplete = useSelector((state) => {
        return state.BillByAccount.BillByAccount.completeString;
    });

    const stringCancelBill = useSelector((state) => {
        return state.BillByAccount.BillByAccount.cancelBill;
    });

    const focusBillId = useSelector(state => {
        return state.BillByAccount.BillByAccount.focusBillId;
    });

    const [billDetail, setBillDetail] = useState(false);

    const [message, setMessage] = useState('')

    const [idBillComplete, setBillComplete] = useState(undefined);

    const [idBill, setIdBill] = useState(undefined);

    const [currentPage, setCurrentPage] = useState(1);

    const billsPerPage = 5;

    const indexOfLastBill = currentPage * billsPerPage;

    const indexOfFirstBill = indexOfLastBill - billsPerPage;

    const currentBills = allBillOfUser.slice(indexOfFirstBill, indexOfLastBill);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const [modal, setModal] = useState(false);

    const [objects, setObjects] = useState(null);

    const dateStringOptions = {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false, // Use 24-hour format
    };

    const openBillDetail = (object) => {
        setObjects(object);
        setBillDetail(true);
    };

    const closeBillDetail = () => {
        setHover(false);
        setBillDetail(false);
    };
    const openModal = (object) => {
        setObjects(object);
        setModal(true);
    };
    const closeModal = () => {
        setMessage("")
        setModal(false);
    };
    const  complete = (idBill) =>{
        setBillComplete(idBill)
    }
    useEffect(() =>{
        dispatch(completes(idBillComplete)).then(() =>{
            dispatch(checkToken());
            dispatch(getAllBillByIdUser(idAccount))
            sendNotification(idBillComplete);
        })
    },[idBillComplete])

    const confirmCancelBill = (idBill) => {
        setIdBill(idBill);
        setModal(false);
    };

    useEffect(() => {
        dispatch(cancelBill({ idBill, idAccount, message })).then(() =>{
            dispatch(checkToken());
            dispatch(getAllBillByIdUser(idAccount));
            sendNotification(idBill);
        });
    },[idBill,idAccount,message]);

    useEffect(() => {
        const handleUrlChange = () => {
            dispatch(setFocusBillId(0));
        };

        // Add the event listener to listen for URL changes
        window.addEventListener("popstate", handleUrlChange);

        // Clean up the event listener when the component unmounts
        return () => {
            window.removeEventListener("popstate", handleUrlChange);
        };
    }, [])

    const sendNotification = (billId) => {
        try {
            if (stompClient != null) {
                let message = {
                    "type": "notification",
                    "subtype": billId
                }
                stompClient.send("/gkz/hello", {}, JSON.stringify(message));
            }
        } catch (e) {
            console.log("Send notification error:");
            console.log(e);
        }
    }

    const sendReport = () => {
        const report = {
            date: new Date(),
            send: {
                id: objects.accountUser.id
            },
            receiver: {
                id: objects.accountCCDV.id
            },
            content: $("[name='contentReport']").val(),
            bill: {
                id: objects.id
            }
        }
        axios.post("http://localhost:8080/reports/sendReport", report, {headers: {Authorization: "Bearer " + localStorage.getItem("token")}})
            .then(data => {
                Swal.fire({
                    position: 'center',
                    icon: 'info',
                    title: data.data
                })
            }).catch(e => {
            console.log(e)
        })
    }
    const [hover, setHover] = useState(false);
    const clickReport = () => {
        setHover(!hover)
    }
    return (
        <>
            <style
                dangerouslySetInnerHTML={{
                    __html:
                        "\n.flicker-border {\n  border: 2px solid transparent; /* Start with a transparent border */\n  animation: flicker 2s infinite alternate; /* Apply the flicker animation */\n}\n\n@keyframes flicker {\n  0% {\n    border-color: red; /* Start with a red border */\n  }\n  50% {\n    border-color: transparent; /* Flicker to a transparent border halfway through the animation */\n  }\n  100% {\n    border-color: red; /* End with a red border again */\n  }\n}\n    "
                }}
            />
            <link href="../resources/8.97b85fe3.chunk.css" rel="stylesheet"/>
            <link href="../resources/main.3e229f12.chunk.css" rel="stylesheet"/>
                        <h3>Lịch sử đơn thuê</h3>
                        <div className="transaction-table">
                            <div className="table-responsive">
                                <table className="table table-striped table-bordered table-condensed table-hover">
                                    <thead>
                                    <tr>
                                        <th style={{fontFamily: "Poppins", fontSize: "13px", fontWeight: "700", width: "50px"}}>Mã đơn</th>
                                        <th style={{fontFamily: "Poppins", fontSize: "13px", fontWeight: "700", width: "180px"}}>Tên tài khoản người CCDV</th>
                                        <th style={{fontFamily: "Poppins", fontSize: "13px", fontWeight: "700", width: "320px"}}>Ngày bắt đầu</th>
                                        <th style={{fontFamily: "Poppins", fontSize: "13px", fontWeight: "700", width: "70px"}}>Số giờ thuê</th>
                                        <th style={{fontFamily: "Poppins", fontSize: "13px", fontWeight: "700", width: "100px"}}>Tổng tiền</th>
                                        <th style={{fontFamily: "Poppins", fontSize: "13px", fontWeight: "700", width: "100px"}}>Tình trạng</th>
                                        <th style={{fontFamily: "Poppins", fontSize: "13px", fontWeight: "700", width: "100px"}}>Xem chi tiết</th>
                                        <th style={{fontFamily: "Poppins", fontSize: "13px", fontWeight: "700", width: "200px"}}>Hoạt động</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {currentBills.length > 0 && currentBills.map((item) => (
                                            <tr key={item.id} className={focusBillId && focusBillId == item.id ? "flicker-border" : ""}>
                                                <td style={{textAlign: "center"}}>{item.id}</td>
                                                <td>{item.accountCCDV.username}</td>
                                                <td>{new Date(item.dateStart).toLocaleString("en-GB", dateStringOptions)} - {new Date(item.dateEnd).toLocaleString("en-GB", dateStringOptions)}</td>
                                                <td style={{textAlign: "center"}}>{item.hour}</td>
                                                <td style={{textAlign: "right"}}>{item.total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</td>
                                                <td>
                                                    {item.status.nameStatus === "wait" ? "Chờ xác nhận" : item.status.nameStatus === "recevied" ? "Đã nhận" : item.status.nameStatus === "complete" ? "Hoàn thành" : "Đã hủy"}
                                                </td>
                                                <td style={{width: '150px', textAlign: "center"}}>
                                                    <button className="action-button detail-button"
                                                            style={{width: 'auto'}} onClick={() => openBillDetail(item)}>
                                                        Xem chi tiết
                                                    </button>
                                                </td>
                                                <td className="actions">
                                                    {item.status.nameStatus === "wait" && (
                                                        <>
                                                            <button className="action-button cancel-button" style={{margin: "0 2px 0"}} onClick={() => openModal(item)}>
                                                                Hủy đơn
                                                            </button>
                                                        </>
                                                    )}
                                                    {item.status.nameStatus === "recevied" && (
                                                        <>
                                                            <button className="action-button cancel-button" style={{margin: "0 2px 0"}} onClick={() => openModal(item)}>
                                                                Hủy đơn
                                                            </button>
                                                            <button className="action-button confirm-button" style={{margin: "0 2px 0"}} onClick={() =>complete(item.id)}>
                                                                Xác nhận
                                                            </button>
                                                        </>
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Hiển thị các nút phân trang */}
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
                                {currentPage < Math.ceil(allBillOfUser.length / billsPerPage) ? (
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


                        {allBillOfUser.length === 0 && (
                            <div className="text-center mt-20 col-md-12"><span>Không có dữ liệu</span></div>
                        )}


            {objects && modal &&  (
                <>
                    <link href="../resources/8.97b85fe3.chunk.css" rel="stylesheet"/>
                    <link href="../resources/main.3e229f12.chunk.css" rel="stylesheet"/>
                    <div role="dialog">
                        <div className="fade modal-backdrop in"/>
                        <div role="dialog" tabIndex={-1} className="fade modal-donate in modal" style={{display: "block"}}>
                            <div className="modal-dialog">
                                <div className="modal-content" role="document">
                                    <div className="modal-header">
                                        <button type="button" className="close" onClick={closeModal}>
                                            <span aria-hidden="true">×</span>
                                            <span className="sr-only">Close</span>
                                        </button>
                                        <h4 className="modal-title">
                                            <span>Thuê player</span>
                                        </h4>
                                    </div>
                                    <div className="modal-body">
                                        <table>
                                            <tbody>
                                            <tr>
                                                <td>Tên tài khoản người CCDV:</td>
                                                <td>{objects.accountCCDV.username}</td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <span>Số giờ thuê</span>:
                                                </td>
                                                <td>{objects.hour}</td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <span>Ngày tạo đơn </span>:
                                                </td>
                                                <td>
                                                    <span className="price">{new Date(objects.dateEnd).toLocaleString("en-GB", dateStringOptions)}</span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <span>Tổng tiền</span>:
                                                </td>
                                                <td>
                                                    <span className="price">{objects.total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td colSpan={2}>
                                                    <textarea required="không được để trống" placeholder="Lý do hủy" name="message"
                                                              maxLength={255} type="text" className="form-control" defaultValue={""}  value={message}
                                                              onChange={(e) => setMessage(e.target.value)}/>
                                                </td>
                                            </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn-fill btn btn-danger" onClick={() => confirmCancelBill(objects.id)}>
                                            <span>Xác nhận</span>
                                        </button>
                                        <button type="button" className="btn btn-default" onClick={closeModal}>
                                            <span>Đóng</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
            {/*modal bill chi tiết*/}
            {objects && billDetail && (
                <>
                    <link href="../resources/8.97b85fe3.chunk.css" rel="stylesheet"/>
                    <link href="../resources/main.3e229f12.chunk.css" rel="stylesheet"/>
                    <div role="dialog">
                        <div className="fade modal-backdrop in"/>
                        <div role="dialog" tabIndex={-1} className="fade modal-donate in modal"
                             style={{display: "block"}}>
                            <div className="modal-dialog">
                                <div className="modal-content" role="document">
                                    <div className="modal-header">
                                        <button type="button" className="close" onClick={closeBillDetail}>
                                            <span aria-hidden="true">×</span>
                                            <span className="sr-only">Close</span>
                                        </button>
                                        <h4 className="modal-title">
                                            <span>Chi tiết hóa đơn</span>
                                        </h4>
                                    </div>
                                    <div className="modal-body">
                                        <table>
                                            <tbody>
                                            <tr>
                                                <td>Tên tài khoản người CCDV:</td>
                                                <td>{objects.accountCCDV.username}</td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <span>Số giờ thuê</span>:
                                                </td>
                                                <td>{objects.hour}</td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <span>Ngày tạo đơn </span>:
                                                </td>
                                                <td>
                                                <span
                                                    className="price">{new Date(objects.dateCreate).toLocaleString("en-GB", dateStringOptions)}</span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <span>Tổng tiền</span>:
                                                </td>
                                                <td>
                                                    <span className="price">{objects.total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <span>Ngày Bắt đầu </span>:
                                                </td>
                                                <td>
                                                <span
                                                    className="price">{new Date(objects.dateStart).toLocaleString("en-GB", dateStringOptions)}</span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <span>Ngày kết thúc </span>:
                                                </td>
                                                <td>
                                                <span
                                                    className="price">{new Date(objects.dateEnd).toLocaleString()}</span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <span>Lời nhắn </span>:
                                                </td>
                                                <td>
                                                    <span className="price">{objects.firstMessage}</span>
                                                </td>
                                            </tr>
                                            {(
                                                (objects.status.nameStatus === "cancel from wait by user" || objects.status.nameStatus === "cancel from recevied by user") && (
                                                    <tr>
                                                        <td>
                                                            <span>Lý do người thuê hủy </span>:
                                                        </td>
                                                        <td>
                                                            <span className="price">{objects.userMessage}</span>
                                                        </td>
                                                    </tr>
                                                )
                                            ) || (
                                                (objects.status.nameStatus === "cancel from wait by ccdv" || objects.status.nameStatus === "cancel from recevied by ccdv") && (
                                                    <tr>
                                                        <td>
                                                            <span>Lý do người CCDV hủy </span>:
                                                        </td>
                                                        <td>
                                                            <span className="price">{objects.ccdvMessage}</span>
                                                        </td>
                                                    </tr>
                                                )
                                            )}

                                            {/*<tr>*/}
                                            {/*    <td>*/}
                                            {/*        <span>Nhận xét admin nếu có </span>:*/}
                                            {/*    </td>*/}
                                            {/*    <td>*/}
                                            {/*        <span className="price">{objects.adminMessage}</span>*/}
                                            {/*    </td>*/}
                                            {/*</tr>*/}
                                            {hover ?
                                                <>
                                                    <tr>
                                                        <td><span>Nội dung báo cáo </span>:</td>
                                                        <td></td>
                                                    </tr>

                                                    <tr>
                                                        <td colSpan={2}>
                                                    <textarea required="không được để trống"
                                                              placeholder=" Bạn muốn báo cáo về người CCDV điều gì "
                                                              name="contentReport"
                                                              maxLength={255} type="text" className="form-control"
                                                    />
                                                        </td>
                                                    </tr>
                                                </>
                                                : <></>}
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className="modal-footer">
                                        {hover? <button className="btn btn-success" onClick={sendReport}><span>Gửi Báo Cáo</span>
                                        </button>: <button className="btn btn-danger" onClick={clickReport}><span>Báo Cáo</span>
                                        </button>}
                                        <button type="button" className="btn btn-default" onClick={closeBillDetail}>
                                            <span>Đóng</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    );
}

export default AllBillOfUser;
