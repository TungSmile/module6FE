import React, {useEffect, useState} from "react";
import axios from "axios";
import "../../custom-css/RegisterSupply.css";
import $ from 'jquery'
import {useDispatch, useSelector} from "react-redux";
import {
    getAllActiveSupplies,
    getSupplyByUserID2,
    updateUserSupply
} from "../../service/SupplyService";
import SignupCCDV from "../../service/custom/SignupCCDV";
import {checkToken} from "../../service/UserService";
import Swal from "sweetalert2";
import {Link} from "react-router-dom";

function RegisterSupply(isRegister) {
    const dispatch = useDispatch();
    const supply = useSelector(state => {
        return state.supplies.supplies.all;
    });

    const userSupply = useSelector(state => {
        try {
            return state.supplies.supplies.userSupplies;
        } catch (e) {
            return [];
        }
    });

    const [errMS, setErrMS] = useState("");
    const [price, setPrice] = useState(0)
    const storeUser = useSelector(state => {
        return state.user.user.current;
    });


    useEffect(() => {
        dispatch(getAllActiveSupplies());
        if (!isRegister.isRegister) {
            const idUser = JSON.parse(localStorage.getItem("account")).id;
            dispatch(getSupplyByUserID2(idUser));
        }

    }, []);

    useEffect(() => {
        if (storeUser) {
            setPrice(storeUser.price)
        }
    }, [storeUser])


    $('input[type=checkbox]').on('click', function () {
        $('input[type=checkbox]', this).prop('checked', function (i, checked) {
            return !checked
        })
        if ($('input[type=checkbox]', this).prop('checked'))
            $(this).addClass('selected');
        else
            $(this).removeClass('selected');
    });

    function handleChosenSupplies(e, item) {
        let targetSupply = {id: item};
        let newSupplies;
        if (e.target.checked) {
            if (!userSupply || userSupply.length == 0) {
                newSupplies = [targetSupply];
            } else {
                newSupplies = [...userSupply]
                newSupplies.push(targetSupply);
            }
            dispatch(updateUserSupply(newSupplies))
        } else {
            if (!userSupply || userSupply.length == 0) {
            } else {
                newSupplies = userSupply.filter(ele => {
                    if (ele.id != item) {
                        return ele;
                    }
                })
            }
            dispatch(updateUserSupply(newSupplies))
        }
    }

    const x = () => {
        if (!isRegister.isRegister) {
            const idUser = JSON.parse(localStorage.getItem("account")).id;
            SignupCCDV.setNewListSupply(idUser, userSupply)
                .then(
                    async (res) => {
                        console.log(res)
                    })
            SignupCCDV.setNewPrice(storeUser.account.username, price)
                .then(
                     (res) => {
                        dispatch(checkToken())
                        Swal.fire({
                            position: 'center',
                            icon: 'success',
                            title: res.data
                        });
                    }
                )
        }
    }
    const y = (e) => {
        if (!isNaN(e.target.value)) {
            setPrice(e.target.value)
            setErrMS("")
        } else {
            setErrMS("Vui lòng nhập số")
        }

    }

    // function send() {
    //     const result = [];
    //     const costIP = $('#rentCost').val();
    //     $('input[type=checkbox]').each(function () {
    //         if ($(this).prop('checked')) {
    //             result.push(
    //                 {id: $(this).val()}
    //             );
    //         }
    //     });
    //
    //     // sử dụng idUser để call API
    //     axios.post("http://localhost:8080/supplies/createSupply?id=" + idUser + "?cost=" + costIP , result).then(data => {
    //         alert("Thêm dữ liệu thành công")
    //     })
    //
    // }

    return (<>
        <div>
            <div className="pick-supply" style={{textAlign: "center"}}>
                <h4 className="col-12">
                    <div className="textSetSupply">DỊCH VỤ CUNG CẤP</div>
                </h4>
                {isRegister.isRegister ? <></> : <div>
                    <div className="col-md-6">
                        <div className="setPrice">Giá thuê theo giờ :</div>
                    </div>
                    <div className="col-md-4"><input type="text" maxlength="10000000" placeholder={price}
                                                     onChange={(e) => {
                                                         y(e)
                                                     }}/>
                    </div>
                    <div><span className="setPrice">{errMS}</span></div>
                </div>
                }
                <div style={{textAlign: "initial"}}>
                    {supply.length > 0 && supply.map((s) => {
                        if (s.isActive === true) {
                            if (!isRegister.isRegister) {
                                if (userSupply && userSupply.find(userSupply => userSupply.id === s.id)) {
                                    return (
                                        <div className="col-md-4">
                                            <input type="checkbox" name="checkbox" id={s.id} value={s.id} checked
                                                   onClick={(e) => {
                                                       handleChosenSupplies(e, s.id)
                                                   }}/>
                                            <label className="labelCheckBox" htmlFor={s.id}>{s.nameSupply}</label>
                                        </div>
                                    );
                                } else {
                                    return (<div className="col-md-4">
                                            <input type="checkbox" name="checkbox" id={s.id} value={s.id}
                                                   onClick={(e) => {
                                                       handleChosenSupplies(e, s.id)
                                                   }}/>
                                            <label className="labelCheckBox" htmlFor={s.id}>{s.nameSupply}</label>
                                        </div>
                                    );
                                }
                            } else {
                                if (userSupply && userSupply.find(userSupply => userSupply.id === s.id)) {
                                    return (
                                        <div className="col-md-6">
                                            <input type="checkbox" name="checkbox" id={s.id} value={s.id} checked
                                                   onClick={(e) => {
                                                       handleChosenSupplies(e, s.id)
                                                   }}/>
                                            <label className="labelCheckBox" htmlFor={s.id}>{s.nameSupply}</label>
                                        </div>
                                    );
                                } else {
                                    return (<div className="col-md-6">
                                            <input type="checkbox" name="checkbox" id={s.id} value={s.id}
                                                   onClick={(e) => {
                                                       handleChosenSupplies(e, s.id)
                                                   }}/>
                                            <label className="labelCheckBox" htmlFor={s.id}>{s.nameSupply}</label>
                                        </div>
                                    );
                                }
                            }
                        }
                    })}
                </div>
            </div>
            {isRegister.isRegister ? <></> : <div>
                <Link to={"/information/setSupply"}>
                    <button className="BtnSetSupply" onClick={x}>Cập nhập dịch vụ</button>
                </Link>
            </div>
            }
            {/*<table className="Cost">*/}
            {/*    <tr>*/}
            {/*        <td><label htmlFor="rentCost">Tiền Theo Tiếng :</label>*/}
            {/*        </td>*/}
            {/*        <td><input type="text" id="rentCost" placeholder={cost} required/>*/}
            {/*        </td>*/}
            {/*    </tr>*/}
            {/*</table>*/}
            {/*<input type="button" id="send" value="Submit" onClick={send}/>*/}
        </div>

    </>)
}

export default RegisterSupply;