import RegisterSupply from "../../components/common/RegisterSupply";
import {useEffect, useState} from "react";
import axios from "axios";
import {Field, Form, Formik} from "formik";
import * as Yup from "yup";


const SupplyInfo = () => {


    const [accounts, setAccounts] = useState('');
    const accountId = JSON.parse(localStorage.getItem("account") || "{}").id;
    console.log('id:' , accountId)


    useEffect(() => {
        axios.get(`http://localhost:8080/supplies/getSupplyByAccountID${accountId}`)
            .then(res => {
                if (res.data) {
                    console.log('thongtin:', res.data);
                    setAccounts(res.data);
                } else {
                    console.log('Không có dữ liệu');
                }
            })
    }, []);



    return (
        <>
            <Formik initialValues={accounts}
                    enableReinitialize={true}

                    onSubmit={values => {
                        console.log("mau gui di", values)

                    }
                    }>
                <Form>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                        <Field name='supplies' component={RegisterSupply} />
                        <button type="submit" style={{ marginTop: '16px',marginRight:'300px' }}>Cập nhật thay đổi</button>
                    </div>
                </Form>
            </Formik>
        </>
    );

}
export default SupplyInfo