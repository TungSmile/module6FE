import {useEffect} from "react";
import {useDispatch} from "react-redux";
import {cancelBill} from "../../service/BillsService";

const CancelBill = (idBill,idAccount,message) =>{
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(cancelBill(idBill, idAccount, message))
    },[idBill]);
}
export default CancelBill;