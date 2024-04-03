import "../information/EditSuppleAndPrice.css"
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {getAllActiveSupplies, getSupplyByUserID, getSupplyByUserID2} from "../../service/SupplyService";
import $ from "jquery";
import axios from "axios";

const EditSuppleAndPrice = () => {
    const dispatch = useDispatch();
    const supply = useSelector(state => {
        return state.supplies.supplies.all;
    });
    const storeUser = useSelector(state => {
        console.log(state)
        return state.user.user.current
    });
    // const userSupply = useSelector(state => {
    //     return state.supplies.supplies.userSupplies;
    // });

    const [userSupply, setUserSupply] = useState([]);
    const [supplyRender, setSupplyRender] = useState([])

    useEffect(() => {
        dispatch(getAllActiveSupplies());
        const idUser = JSON.parse(localStorage.getItem("account")).id;
        // dispatch(getSupplyByUserID(idUser));
        axios.get("http://localhost:8080/supplies/getSupplyByUserID?id=" + idUser, {headers: {Authorization: "Bearer " + localStorage.getItem("token")}})
            .then(data => {
                setUserSupply(data.data)
                x(data.data)
            })
        console.log("supplyRender")
    }, []);

    const x = (us) => {
        const tempArray = new Array(supply.length).fill(false)
        for (let i = 0; i < supply.length; i++) {
            for (const s of us) {
                if (supply[i].id === s.id) {
                    tempArray[i] = true;
                    break;
                }
                tempArray[i] = false
            }
        }
        setSupplyRender(tempArray)
    }
    $('input[type=checkbox]').on('click', function () {
        $('input[type=checkbox]', this).prop('checked', function (i, checked) {
            return !checked
        })})

    const getSupplySelect = () => {
        const checkBoxElements = document.querySelectorAll('.supply');
        const checkedValues = Array.from(checkBoxElements)
            .filter(checkbox => checkbox.checked)
            .map(checkbox => checkbox.value);
        console.log(checkedValues)
        console.log(supplyRender)
    }


    return (<>
        <h4 className="textSupply">Danh sách dịch vụ </h4>
        <div className="containerCheckBox">
            {supply.map((s, index) => {
                // const isClick = () => {
                //     const temp = {...supplyRender}
                //     temp[index] = !temp[index];
                //     setSupplyRender(temp)
                // }
                console.log(supplyRender[index])
                return (
                    <div className="col-6">
                        <label className="switch">
                            <input type="checkbox" className="supply" key={index} value={s.id}
                                   checked={supplyRender[index]}
                            />
                            <span className="slider round"></span>
                            <span className="contentCheckBox">{s.nameSupply}</span>
                        </label>
                    </div>
                )

            })}
        </div>
        <button onClick={getSupplySelect}> Log</button>
        {/*<div className="col-4" >*/}
        {/*    <label className="switch">*/}
        {/*        <input type="checkbox" className="supply"/>*/}
        {/*        <span className="slider round"></span>*/}
        {/*        <span className="contentCheckBox">Hello word abc dfafsa</span>*/}
        {/*    </label>*/}
        {/*</div>*/}
    </>)
}
export default EditSuppleAndPrice;