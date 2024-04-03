import ReactDOM from 'react-dom';
import React, {useEffect, useState} from "react";
import "../../custom-css/modalCreateBill.css"
import axios from "axios";
import $ from 'jquery'
import {useDispatch, useSelector} from "react-redux";
import {getAllBillIn7DayByCCDV} from "../../service/BillsService";
import Swal from "sweetalert2";
import {checkToken} from "../../service/UserService";

const ModalCreateBill = ({isShowing, hide, userDetail}) => {
    const user = useSelector(state => (state.user.user.current));
    const stompClient = useSelector(state => {
        return state.chatting.stompClient;
    })
    const dispatch = useDispatch();
    const [message, setMessage] = useState('');
    const currentTime = new Date();
    const [hourInDay, setHourInDay] = useState([]);
    const [timeBillIn7Day, setTimeBillIn7Day] = useState(new Array(168).fill(0));
    const [total, setTotal] = useState(0);
    const [dayRend, setDayRend] = useState((new Date()).getDate());
    const [hourRend, setHourRend] = useState(1);
    const [bill, setBill] = useState({
        address: '',
        dateCreate: '',
        dateStart: '',
        dateEnd: '',
        price: userDetail.price,
        total: userDetail.price * 1,
        hour: 1,
        firstMessage: '',
        accountCCDV: {
            id: userDetail.id
        },
        accountUser: {}
    });
    const [sevenDay, setSevenDay] = useState([]);
    const [billCCDV,setBillCCDV] = useState('')
    useEffect(() => {
        setTotal(userDetail.price);
        dispatch(getAllBillIn7DayByCCDV(userDetail.id));
        fillDay();
        axios.get(`http://localhost:8080/bills/getAllBill7DayByIDCCDV?id=${userDetail.id}`).then(data => {
            fillData(data.data);
            setBillCCDV(data.data);
            console.log(data.data)
        }).catch(() => {
            console.log("check api")
        })

    }, [message]);
    const close = () => {
        hide();
        setMessage(message + 1);
    }

    const fillDay = () => {
        const b = [];
        for (let i = 0; i < 7; i++) {
            const a = new Date();
            a.setDate((a.getDate() + i));
            b.push(a);
        }
        setSevenDay(b)
    }
    const pricing = (valueTag) => {
        setTotal(userDetail.price * valueTag.target.value);
        setHourRend(valueTag.target.value)
    }
    const getData = (e) => {
        const number = e.target.value - currentTime.getDate();
        const temp = [];
        for (let i = 0; i < 24; i++) {
            temp.push(timeBillIn7Day[(i + (number * 24))]);
        }
        setHourInDay(temp);
        setDayRend(e.target.value);
    }
    const submit = () => {
        let check = false;
        for (let i = 0; i < hourInDay.length; i++) {
            if (hourInDay[i] === 2) {
                check = true;
                break
            }
        }
        if (user) {
        } else {
            check = false;
        }
        if (check) {
            let tempBill = {
                ...bill,
                total: total,
                hour: hourRend,
                dateCreate: new Date(),
                firstMessage: $("[name='MessageBills']").val(),
                address: $("[name='address']").val(),
                accountUser: {
                    id: JSON.parse(localStorage.getItem("account")).id
                }
            }
            axios.post("http://localhost:8080/bills/createBill", tempBill, {headers: {Authorization: "Bearer " + localStorage.getItem("token")}})
                .then(data => {
                    hide();
                    if (data.data != null) {
                        if (data.data.bill != null) {
                            sendNotification(data.data.bill.id);
                            Swal.fire({
                                position: 'center',
                                icon: 'success',
                                title: data.data.message
                            });
                        } else {
                            Swal.fire({
                                position: 'center',
                                icon: 'error',
                                title: data.data.message
                            });
                        }
                        dispatch(checkToken());

                    } else {
                        Swal.fire({
                            position: 'center',
                            icon: 'error',
                            title: "Có lỗi xảy ra. Vui lòng thử lại."
                        });
                    }
                }).catch(
                (e) => {
                    console.log(e);
                }
            ).finally((e) => {
                setMessage(message + 1);
            })
        }
    }

    const fillData = (data) => {
        const tempTest = new Array(168).fill(0);
        for (const item of data) {
            const number = (new Date(item.dateStart)).getHours() + ((new Date(item.dateStart)).getDate() - currentTime.getDate()) * 24;
            for (let i = number; i < number + item.hour; i++) {
                tempTest[i] = 1;
            }
        }
        for (let i = 0; i < 24; i++) {
            if (currentTime.getHours() >= i) {
                tempTest[i] = 1;
            }
        }
        setTimeBillIn7Day(tempTest);
        const temp = [];
        for (let i = 0; i < 24; i++) {
            temp.push(tempTest[i]);
        }
        $("[name='MessageBills']").text("");
        $("[name='address']").text("");
        setHourInDay(temp);
        setHourRend(1)
    }
    const handClick = (index) => {
        let check = true;
        const temp = new Array(168).fill(0);
        const number = index + ((dayRend - currentTime.getDate()) * 24);
        for (const item of billCCDV) {
            const number = (new Date(item.dateStart)).getHours() + ((new Date(item.dateStart)).getDate() - currentTime.getDate()) * 24;
            for (let i = number; i < number + item.hour; i++) {
                temp[i] = 1;
            }
        }
        for (let i = 0; i < 24; i++) {
            if (currentTime.getHours() >= i) {
                temp[i] = 1;
            }
        }
        for (let i = 0; i < temp.length; i++) {
            if (temp[i] === 2) {
                temp[i] = 0;
            }
            if (i >= number && i < (parseInt(number) + parseInt(hourRend))) {
                if (temp[i] === 1) {
                    check = false;
                }
            }
        }
        // for (let i = number; i < (parseInt(number) + parseInt(hourRend)); i++) {
        //     if (temp[i] === 1) {
        //         check = false;
        //     }
        // }
        if (check) {
            for (let i = number; i < (parseInt(number) + parseInt(hourRend)); i++) {
                if (temp[i] === 0) {
                    temp[i] = 2;
                }
            }
            setTimeBillIn7Day(temp);
        }
        const number1 = dayRend - currentTime.getDate();
        const temp1 = [];
        for (let i = 0; i < 24; i++) {
            temp1.push(temp[(i + (number1 * 24))]);
            if (temp[(i + (number1 * 24))] === 2) {
            }
        }
        setHourInDay(temp1);
        const a = new Date();
        a.setDate(dayRend);
        a.setHours(index);
        a.setMinutes(0);
        a.setSeconds(0, 0);
        const b = new Date(a.getTime());
        b.setHours((b.getHours() + parseInt(hourRend)));
        setBill({...bill, dateStart: a, dateEnd: b});
    }

    const sendNotification = (billId) => {
        try {
            if (stompClient != null) {
                let message = {
                    "type": "notification",
                    "subtype": billId,
                }
                stompClient.send("/gkz/hello", {}, JSON.stringify(message));
            }
        } catch (e) {
            console.log("Send notification error:");
            console.log(e);
        }
    }

    return isShowing ? ReactDOM.createPortal(
        <div role="dialog">
            <div className="fade modal-backdrop in"/>
            <div role="dialog" tabIndex={-1} className="fade modal-donate in modal"
                 style={{display: 'flex', justifyContent: "center"}}>
                <div className="modal-dialog" style={{width: "1400px", height: "800px", marginLeft: "0px", marginRight: "0px",
                    display: "flex", justifyContent: "center"}}>
                    <div className="modal-content" role="document" style={{maxWidth: "1320px", height: "590px"}}>
                        <div className="modal-header">
                            <button type="button" className="close" onClick={close}><span
                                aria-hidden="true">×</span><span
                                className="sr-only">Close</span></button>
                            <h4 className="modal-title"><span>Thuê người yêu </span></h4></div>
                        <div className="modal-body" style={{
                            overflow: 'auto', maxHeight: '550px'
                        }}>
                            <div className={"container"}>
                                <div className={"row"}>
                                    <div className={"col-md-5"}>
                                        <table>
                                            <tbody>
                                            <tr>
                                                <td>Player:</td>
                                                <td>{userDetail.account.nickname}</td>
                                            </tr>
                                            <tr>
                                                <td><span>Thời gian muốn thuê</span>:</td>
                                                <td><select name="hour" className="form-control" onChange={pricing}>
                                                    <option value={1}>1&nbsp;giờ</option>
                                                    <option value={2}>2&nbsp;giờ</option>
                                                    <option value={3}>3&nbsp;giờ</option>
                                                    <option value={4}>4&nbsp;giờ</option>
                                                    <option value={5}>5&nbsp;giờ</option>
                                                    <option value={6}>6&nbsp;giờ</option>
                                                    <option value={7}>7&nbsp;giờ</option>
                                                    <option value={8}>8&nbsp;giờ</option>
                                                    <option value={9}>9&nbsp;giờ</option>
                                                    <option value={10}>10&nbsp;giờ</option>
                                                    <option value={11}>11&nbsp;giờ</option>
                                                    <option value={12}>12&nbsp;giờ</option>
                                                    <option value={13}>13&nbsp;giờ</option>
                                                    <option value={14}>14&nbsp;giờ</option>
                                                    <option value={15}>15&nbsp;giờ</option>
                                                    <option value={16}>16&nbsp;giờ</option>
                                                    <option value={17}>17&nbsp;giờ</option>
                                                    <option value={18}>18&nbsp;giờ</option>
                                                    <option value={19}>19&nbsp;giờ</option>
                                                    <option value={20}>20&nbsp;giờ</option>
                                                    <option value={21}>21&nbsp;giờ</option>
                                                    <option value={22}>22&nbsp;giờ</option>
                                                    <option value={23}>23&nbsp;giờ</option>
                                                    <option value={24}>24&nbsp;giờ</option>
                                                </select></td>
                                            </tr>
                                            <tr>
                                                <td><span>Chi phí</span>:</td>
                                                <td><span className="price">{total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} đ</span></td>
                                            </tr>
                                            <tr>
                                                <td><span>Số dư hiện tại</span>:</td>
                                                {user ? <td>
                                                    <span className="total-amount">{user.balance.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} đ</span></td> : <td>
                                                    <span className="total-amount">0 đ</span></td>}

                                            </tr>
                                            <tr>
                                                <td>Địa Chỉ :</td>
                                                <td><textarea id="textAddress" placeholder="Nhập địa chỉ  " name="address"
                                                              maxLength={255} type="text" className="form-control"
                                                              defaultValue={""}/><p className="err-message"/></td>
                                            </tr>
                                            <tr>
                                                <td colSpan={2}><textarea id="testMessage"
                                                                          placeholder=" Gửi lời nhắn cho người được thuê "
                                                                          name="MessageBills"
                                                                          maxLength={255} type="text" className="form-control"
                                                                          defaultValue={""}/><p className="err-message"/></td>
                                            </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className={"col-md-7"}>
                                        <table>
                                            <tbody>
                                            <tr>
                                                <td>Chọn Ngày :</td>
                                                <td><select name="dateCreate" className="form-control" onChange={getData}>
                                                    <option id="day0" value={sevenDay[0].getDate()}>
                                                        Ngày
                                                        :&nbsp;{sevenDay[0].getDate()}-{sevenDay[2].getMonth() + 1}-{sevenDay[2].getFullYear()}
                                                    </option>
                                                    <option id="day1" value={sevenDay[1].getDate()}>
                                                        Ngày
                                                        :&nbsp;{sevenDay[1].getDate()}-{sevenDay[2].getMonth() + 1}-{sevenDay[2].getFullYear()}
                                                    </option>
                                                    <option id="day2" value={sevenDay[2].getDate()}>
                                                        Ngày
                                                        :&nbsp;{sevenDay[2].getDate()}-{sevenDay[2].getMonth() + 1}-{sevenDay[2].getFullYear()}
                                                    </option>
                                                    <option id="day3" value={sevenDay[3].getDate()}>
                                                        Ngày
                                                        :&nbsp;{sevenDay[3].getDate()}-{sevenDay[3].getMonth() + 1}-{sevenDay[3].getFullYear()}
                                                    </option>

                                                    <option id="day4" value={sevenDay[4].getDate()}>
                                                        Ngày
                                                        :&nbsp;{sevenDay[4].getDate()}-{sevenDay[4].getMonth() + 1}-{sevenDay[4].getFullYear()}
                                                    </option>

                                                    <option id="day5" value={sevenDay[5].getDate()}>
                                                        Ngày
                                                        :&nbsp;{sevenDay[5].getDate()}-{sevenDay[5].getMonth() + 1}-{sevenDay[5].getFullYear()}
                                                    </option>

                                                    <option id="day6" value={sevenDay[6].getDate()}>
                                                        Ngày
                                                        :&nbsp;{sevenDay[6].getDate()}-{sevenDay[6].getMonth() + 1}-{sevenDay[6].getFullYear()}
                                                    </option>

                                                </select></td>
                                            </tr>
                                            <tr>
                                                <td colSpan={2}>
                                                    <div className="table-boxTime" style={{overflow: "initial"}}>
                                                        {hourInDay.length > 0 && hourInDay.map((value, index) => (
                                                            value === 0 ?
                                                                <div className="item-box" onClick={() => handClick(index)}
                                                                     key={index}>&nbsp;{index}h00</div> :
                                                                value === 1 ?
                                                                    <div className="item-box-unavailable"
                                                                         key={index}>&nbsp;{index}h00&nbsp; </div> :
                                                                    value === 2 ?
                                                                        <div className="item-box-pick"
                                                                             onClick={() => handClick(index)}
                                                                             key={index}>&nbsp;{index}h00&nbsp; </div> : <></>
                                                        ))}
                                                    </div>
                                                </td>
                                            </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn-fill btn btn-danger" onClick={submit}><span>Thuê</span>
                            </button>
                            <button type="button" className="btn btn-default" onClick={close}><span>Đóng</span></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>,
        document.body
    ) : null;
}
export default ModalCreateBill;
