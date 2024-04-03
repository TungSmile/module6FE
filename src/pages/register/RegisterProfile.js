import {ErrorMessage, Field, Form, Formik} from "formik";
import React, {useEffect, useState} from "react";
import SignupCCDV from "../../service/custom/SignupCCDV";
import * as Yup from "yup";
import 'react-datepicker/dist/react-datepicker.css';
import axios from "axios";
import {useLocation, useNavigate} from "react-router";
import Swal from "sweetalert2";
import RegisterSupply from "../../components/common/RegisterSupply";
import {useSelector} from "react-redux"; // Import CSS cho DatePicker

const validationSchema = Yup.object().shape({
    lastName: Yup.string().required('Họ là bắt buộc'),
    firstName: Yup.string().required('Tên là bắt buộc'),
    country: Yup.string().required('Quốc tịch là bắt buộc'),
    address: Yup.string().required('Địa chỉ là bắt buộc'),
    phoneNumber: Yup.string()
        .required('Số điện thoại là bắt buộc')
        .matches(/^[0-9]{10}$/, 'Số điện thoại phải là số và có đúng 10 chữ số'),
    idCard: Yup.string()
        .required('CCCD là bắt buộc')
        .matches(/^[0-9]{12}$/, 'CCCD phải là số và có đúng 12 chữ số'),
    price: Yup.string().required('Không được để trống'),
    // nickName: Yup.string().required('Tên người dùng là bắt buộc'),
    height: Yup.string().required('Chiều cao là bắt buộc'),
    weight: Yup.string().required('Cân nặng là bắt buộc'),
    birthday: Yup.date()
        .required('Sinh nhật là bắt buộc')
        .max(new Date(Date.now() - 18 * 365 * 24 * 60 * 60 * 1000), 'Phải đủ 18 tuổi trở lên'),
});
const RegisterProfile =()=> {
    const [selectedIds, setSelectedIds] = useState([]);
    const [supply, setSupply] = useState([]);
    const location = useLocation();

    // Truy cập dữ liệu được truyền đi kèm từ trang trước
    const receivedData = location.state?.data;


    const userSupply = useSelector(state => {
        try {
            return state.supplies.supplies.userSupplies;
        } catch (e) {
            return [];
        }
    });
    useEffect(() => {
        axios
            .get('http://localhost:8080/supplies/getAllSupply')
            .then((res) => {
                setSupply(res.data);
            })
            .catch((error) => {
                console.error('Lỗi khi lấy dữ liệu:', error);
            });
    }, []);
    const handleCheckboxChange = (event, id) => {
        if (event.target.checked) {
            setSelectedIds([...selectedIds, id]);
        } else {
            setSelectedIds(selectedIds.filter((selectedId) => selectedId !== id));
        }
    };
    // const [type, setType] = useState('date');
    // const {Option} = Select;
    // const PickerWithType = ({type, onChange}) => {
    //
    //     if (type === 'time') return <TimePicker onChange={onChange}/>;
    //     if (type === 'date') return <DatePicker onChange={onChange}/>;
    //     return <DatePicker picker={type} onChange={onChange}/>;
    // };
    // const getSelectedOptionId =()=> {
    //     var select = document.getElementById("zoneSelect");
    //     var selectedOption = select.options[select.selectedIndex];
    //     var selectedId = selectedOption.value;
    //     console.log("Selected ID: " + selectedId);
    // }
    // Khai báo state để lưu trữ giá trị được chọn
    // const [selectedId, setSelectedId] = useState(['']);
    const navigate = useNavigate();
    // const {id: urlId} = useParams(); // Lấy ID từ URL (nếu có)
    // const account = JSON.parse(localStorage.getItem("account"));
    return (
        <>
            <div className={'wrapper'}>
                <div className={'container'}>
                    <div style={{display: 'flex', width: '100%'}}>
                        <div style={{width: '100%'}}>
                            <div>
                                <Formik
                                    initialValues={{
                                        lastName: '',
                                        firstName: '',
                                        country: '',
                                        address: '',
                                        height: '',
                                        weight: '',
                                        phoneNumber: '',
                                        idCard: '',
                                        gender: '',
                                        price: '',
                                        basicRequest: '',
                                        facebookLink: '',
                                        birthday: '',
                                        zone: {
                                            id: ''
                                        },
                                        supplies: [{
                                            id: ""
                                        },],
                                    }}
                                    validationSchema={validationSchema}
                                    onSubmit={(values) => {
                                        // Đây là nơi xử lý submit form sau khi đã validate thành công
                                        // values.zone.id = selectedId.toString(); // Cập nhật giá trị zone từ selectedId
                                        values.supplies = userSupply;
                                        // values.gender = selectedGender
                                        // console.log("ID zone là", selectedId);
                                        // Chuyển đổi giá trị ngày thành định dạng "YYYY-MM-DD"
                                        // const formattedDate = selectedDate.toISOString().split('T')[0];
                                        console.log("sinh nhat", values.birthday)
                                        console.log("Giá trị đối tượng values là", values);
                                        // // Lấy ID tài khoản từ token ( ID được lưu trong localStorage)
                                        // const id = JSON.parse(localStorage.getItem("account")).id
                                        // Kiểm tra xem có ID trong localStorage không
                                        const localStorageData = localStorage.getItem("account");
                                        let idAccount;
                                        if (localStorageData) {
                                            // Nếu có ID trong localStorage, sử dụng nó
                                            const accountData = JSON.parse(localStorageData);
                                            console.log("id trong local", accountData)
                                            console.log("id",accountData.id)
                                            idAccount = accountData.id;
                                        } else if (receivedData) {
                                            // Nếu không có ID trong localStorage, kiểm tra xem có ID trong URL không
                                            idAccount = receivedData.toString();
                                            console.log("id trong url", receivedData)
                                        }
                                        console.log(1)
                                        SignupCCDV.signupUserDetailProfile(idAccount, values)
                                            .then(async (response) => {
                                                console.log(2)
                                                console.log(response.data)
                                                if(receivedData){
                                                    await Swal.fire({
                                                        position: 'center',
                                                        icon: 'success',
                                                        title: 'Đăng kí thành công, kiểm tra email để xác minh tài khoản.',
                                                        showConfirmButton: false,
                                                        timer: 1500
                                                    })
                                                    navigate("/login")
                                                }else if(localStorageData){
                                                    Swal.fire({
                                                        position: 'center',
                                                        icon: 'success',
                                                        title: 'Cập nhật thành công',
                                                        showConfirmButton: false,
                                                        timer: 1500
                                                    })
                                                    navigate("/info")
                                                }
                                                else {
                                                    Swal.fire({
                                                    position: 'center',
                                                    icon: 'success',
                                                    title: 'Đăng kí thành công',
                                                    showConfirmButton: false,
                                                    timer: 1500
                                                })
                                                    navigate("/info")
                                                }
                                            })
                                    }}
                                >
                                    <Form>
                                        <div className={"row"}>
                                            <div className={"col-md-6"} style={{textAlign: "center"}}>
                                                <h4 style={{fontSize: "35px", marginBottom: "50px"}}>THÔNG TIN CƠ BẢN</h4>
                                                <table style={{marginLeft: "auto", marginRight: "auto"}}>
                                                    <tr className={"row"}>
                                                        <td className={"col-md-6"}>
                                                            <div>
                                                                <Field
                                                                    type="text"
                                                                    name="lastName"
                                                                    placeholder="Họ"
                                                                    maxLength="5000"
                                                                    autoComplete="false"
                                                                    style={{
                                                                        textAlign: 'center',
                                                                        borderRadius: '7px',
                                                                        padding: '7px',
                                                                        margin: '14px',
                                                                        outline: 'none'
                                                                    }}
                                                                />
                                                                <ErrorMessage name="lastName" component="div"
                                                                              className="error"/>
                                                            </div>
                                                        </td>
                                                        <td className={"col-md-6"}>
                                                            <div>
                                                                <Field
                                                                    type="text"
                                                                    name="firstName"
                                                                    placeholder="Tên"
                                                                    maxLength="5000"
                                                                    autoComplete="false"
                                                                    style={{
                                                                        textAlign: 'center',
                                                                        borderRadius: '7px',
                                                                        padding: '7px',
                                                                        margin: '14px',
                                                                        outline: 'none'
                                                                    }}
                                                                />
                                                                <ErrorMessage name="firstName" component="div"
                                                                              className="error"/>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                    <tr className={"row"}>
                                                        <td className={"col-md-6"}>
                                                            <div>
                                                                <Field
                                                                    as="select"
                                                                    name="gender"
                                                                    style={{
                                                                        textAlign: 'center',
                                                                        borderRadius: '7px',
                                                                        padding: '7px',
                                                                        margin: '14px',
                                                                        outline: 'none',
                                                                        width: '190px',
                                                                        border: '2px solid black',
                                                                    }}
                                                                >
                                                                    <option value="">Chọn giới tính</option>
                                                                    <option value="Nam">Nam</option>
                                                                    <option value="Nữ">Nữ</option>
                                                                </Field>
                                                            </div>
                                                        </td>
                                                        <td className={"col-md-6"}>
                                                            <div>
                                                                <Field
                                                                    as="select"
                                                                    name="zone.id"
                                                                    style={{
                                                                        textAlign: 'center',
                                                                        borderRadius: '7px',
                                                                        padding: '7px',
                                                                        margin: '14px',
                                                                        outline: 'none',
                                                                        width: '190px',
                                                                        border: '2px solid black',
                                                                    }}
                                                                >
                                                                    <option value="">Chọn khu vực</option>
                                                                    <option value='1'>Bắc</option>
                                                                    <option value="2">Trung</option>
                                                                    <option value="3">Nam</option>
                                                                </Field>
                                                            </div>
                                                        </td>

                                                    </tr>
                                                    <tr className={"row"}>
                                                        <td className={"col-md-6"}>
                                                            <div>
                                                                <Field
                                                                    type="text"
                                                                    name="country"
                                                                    placeholder="Quốc tịch"
                                                                    maxLength="5000"
                                                                    autoComplete="false"
                                                                    style={{
                                                                        textAlign: 'center',
                                                                        borderRadius: '7px',
                                                                        padding: '7px',
                                                                        margin: '14px',
                                                                        outline: 'none'
                                                                    }}
                                                                />
                                                                <ErrorMessage name="country" component="div"
                                                                              className="error"/>
                                                            </div>
                                                        </td>

                                                        <td className={"col-md-6"}>
                                                            <div>
                                                                <Field
                                                                    type="text"
                                                                    name="address"
                                                                    placeholder="Địa chỉ"
                                                                    maxLength="5000"
                                                                    autoComplete="false"
                                                                    style={{
                                                                        textAlign: 'center',
                                                                        borderRadius: '7px',
                                                                        padding: '7px',
                                                                        margin: '14px',
                                                                        outline: 'none'
                                                                    }}
                                                                />
                                                                <ErrorMessage name="address" component="div"
                                                                              className="error"/>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                    <tr className={"row"}>
                                                        <td className={"col-md-6"}>
                                                            <div>
                                                                <Field
                                                                    type="text"
                                                                    name="phoneNumber"
                                                                    placeholder="Số điện thoại"
                                                                    maxLength="5000"
                                                                    autoComplete="false"
                                                                    style={{
                                                                        textAlign: 'center',
                                                                        borderRadius: '7px',
                                                                        padding: '7px',
                                                                        margin: '14px',
                                                                        outline: 'none'
                                                                    }}
                                                                />
                                                                <ErrorMessage name="phoneNumber" component="div"
                                                                              className="error"/>
                                                            </div>
                                                        </td>
                                                        <td className={"col-md-6"}>
                                                            <div>
                                                                <Field
                                                                    type="text"
                                                                    name="idCard"
                                                                    placeholder=" Số CCCD"
                                                                    maxLength="5000"
                                                                    autoComplete="false"
                                                                    style={{
                                                                        textAlign: 'center',
                                                                        borderRadius: '7px',
                                                                        padding: '7px',
                                                                        margin: '14px',
                                                                        outline: 'none'
                                                                    }}
                                                                />
                                                                <ErrorMessage name="idCard" component="div"
                                                                              className="error"/>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                    <tr className={"row"}>
                                                        <td className={"col-md-6"}>
                                                            <div>
                                                                <Field
                                                                    type="text"
                                                                    name="height"
                                                                    placeholder="Chiều cao"
                                                                    maxLength="5000"
                                                                    autoComplete="false"
                                                                    style={{
                                                                        textAlign: 'center',
                                                                        borderRadius: '7px',
                                                                        padding: '7px',
                                                                        margin: '14px',
                                                                        outline: 'none'
                                                                    }}
                                                                />
                                                                <ErrorMessage name="height" component="div"
                                                                              className="error"/>
                                                            </div>
                                                        </td>
                                                        <td className={"col-md-6"}>
                                                            <div>
                                                                <Field
                                                                    type="text"
                                                                    name="weight"
                                                                    placeholder="Cân nặng"
                                                                    maxLength="5000"
                                                                    autoComplete="false"
                                                                    style={{
                                                                        textAlign: 'center',
                                                                        borderRadius: '7px',
                                                                        padding: '7px',
                                                                        margin: '14px',
                                                                        outline: 'none'
                                                                    }}
                                                                />
                                                                <ErrorMessage name="weight" component="div"
                                                                              className="error"/>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                    <tr className={"row"}>
                                                        <td className={"col-md-6"}>
                                                            <div>
                                                                <Field
                                                                    type="text"
                                                                    name="basicRequest"
                                                                    placeholder="Yêu cầu cơ bản"
                                                                    maxLength="5000"
                                                                    autoComplete="false"
                                                                    style={{
                                                                        textAlign: 'center',
                                                                        borderRadius: '7px',
                                                                        padding: '7px',
                                                                        margin: '14px',
                                                                        outline: 'none'
                                                                    }}
                                                                />
                                                                <ErrorMessage name="basicRequest" component="div"
                                                                              className="error"/>
                                                            </div>
                                                        </td>
                                                        <td className={"col-md-6"}>
                                                            <div>
                                                                <Field
                                                                    type="text"
                                                                    name="facebookLink"
                                                                    placeholder="Link trang cá nhân"
                                                                    maxLength="5000"
                                                                    autoComplete="false"
                                                                    style={{
                                                                        textAlign: 'center',
                                                                        borderRadius: '7px',
                                                                        padding: '7px',
                                                                        margin: '14px',
                                                                        outline: 'none'
                                                                    }}
                                                                />
                                                                <ErrorMessage name="facebookLink" component="div"
                                                                              className="error"/>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                    <tr className={"row"}>
                                                        <td className={"col-md-6"}>
                                                            <div>
                                                                <Field
                                                                    type="text"
                                                                    name="price"
                                                                    placeholder="Giá thuê theo giờ"
                                                                    maxLength="5000"
                                                                    autoComplete="false"
                                                                    style={{
                                                                        textAlign: 'center',
                                                                        borderRadius: '7px',
                                                                        padding: '7px',
                                                                        margin: '14px',
                                                                        outline: 'none'
                                                                    }}
                                                                />
                                                                <ErrorMessage name="price" component="div"
                                                                              className="error"/>
                                                            </div>
                                                        </td>
                                                        <td className={"col-md-6"}>
                                                            <div>
                                                                {/*<Space>*/}
                                                                {/*    <PickerWithType type={type} onChange={(value) => console.log(value)} />*/}
                                                                {/*</Space>*/}
                                                                <Field
                                                                    type='date'
                                                                    name='birthday'  style={{
                                                                    textAlign: 'center',
                                                                    borderRadius: '7px',
                                                                    padding: '7px',
                                                                    margin: '14px',
                                                                    outline: 'none',
                                                                    width:'190px'
                                                                }}
                                                                />
                                                                <ErrorMessage name="birthday" component="div"
                                                                              className="error"/>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                </table>
                                            </div>
                                            <div className={"col-md-6"} style={{textAlign: "center"}}>
                                                <RegisterSupply isRegister={true}/>
                                            </div>
                                            <div className={"col-md-12"} style={{textAlign: "center"}}>
                                                <button type={"submit"} style={{marginTop: '25px',
                                                    background: '#f0564a',
                                                    borderRadius: '10px',
                                                    width: '25%',
                                                    color: '#fff',
                                                    border: 'none',
                                                    height: '40px',
                                                    fontSize: '15px',
                                                    fontWeight: '600'}}>Xác nhận</button>
                                            </div>
                                        </div>
                                    </Form>
                                </Formik>
                            </div>
                        </div>
                    </div>
            </div>
        </div>
    </>
)
}
export default RegisterProfile