import React, {useEffect, useState} from "react";
import UploadAvatar from "../profile/UploadAvatar";
import axios from "axios";
import {ErrorMessage, Field, Form, Formik, useFormikContext} from "formik";
import {DatePicker, Modal} from "antd";
import RegisterSupply from "../../components/common/RegisterSupply";
import {useSelector} from "react-redux";
import * as Yup from "yup";
import Swal from "sweetalert2";

const UserInfo = () => {
    const validationSchema = Yup.object().shape({
        lastName: Yup.string().required('Họ là bắt buộc'),
        firstName: Yup.string().required('Tên là bắt buộc'),
        country: Yup.string().required('Quốc tịch là bắt buộc'),
        address: Yup.string().required('Địa chỉ là bắt buộc'),
        phoneNumber: Yup.string()
            .required('Số điện thoại là bắt buộc')
            .matches(/^[0-9]{10}$/, 'Số điện thoại phải là số và có đúng 10 chữ số'),
        nickname: Yup.string().required('Tên người dùng là bắt buộc'),
        height: Yup.string().required('Chiều cao là bắt buộc'),
        weight: Yup.string().required('Cân nặng là bắt buộc'),
        birthday: Yup.date()
            .required('Sinh nhật là bắt buộc')
            .max(new Date(Date.now() - 18 * 365 * 24 * 60 * 60 * 1000), 'Phải đủ 18 tuổi trở lên'),
    });
    const [accounts, setAccounts] = useState('');
    const [zone,setzone]= useState('');
    const accountId = JSON.parse(localStorage.getItem("account") || "{}").id;
    console.log('id:' , accountId)


    useEffect(() => {
        axios.get(`http://localhost:8080/accounts/account-profile/${accountId}`)
            .then(res => {
                if (res.data) {
                    console.log('thongtin:', res.data);
                    setAccounts(res.data);
                    if (res.data.gender== null){
                        setInitialGender("Nam/Nữ");
                    }else{
                        setInitialGender(res.data.gender)
                    }
                    if(res.data.zone==null){
                        setzone("Bắc/Trung/Nam");
                    }else {
                        setzone(res.data.zone.zone)
                    }
                } else {
                    console.log('Không có dữ liệu');
                }
            })
            .catch(error => {
                console.error('Lỗi khi tải dữ liệu:', error);
            });
    }, []);
    //supplies
    // const userSupply = useSelector(state => {
    //     try {
    //         return state.supplies.supplies.userSupplies;
    //     } catch (e) {
    //         return [];
    //     }
    // });
    //chon sinh nhat
    const [selectedDate, setSelectedDate] = useState(null);
    const handleDateChange = (date) => {
        // Chuyển đổi giá trị DatePicker thành đối tượng ngày
        setSelectedDate(date);
    };

//chon gioi tinh
    const [initialGender, setInitialGender] = useState(accounts.gender || '');
    const [gender, setGender] = useState(initialGender);

    const handleGenderChange = (event) => {
        setGender(event.target.value);
    };
    //bat modal
    const [isOpen, setIsOpen] = useState(false);

    const openModal = (e) => {
        e.preventDefault(); // Ngăn chặn sự kiện mặc định của nút submit
        setIsOpen(true);
        console.log(1)
    };

    const closeModal = () => {
        setIsOpen(false);
    };
    //birthday
    // const originalDate = accounts.birthday;
    // const dateObject = new Date(originalDate);
    // const year = dateObject.getFullYear();
    // const month = String(dateObject.getMonth() + 1).padStart(2, '0'); // Cộng thêm 1 vì tháng trong JavaScript bắt đầu từ 0
    // const day = String(dateObject.getDate()).padStart(2, '0');
    //
    // const formattedDate = `${year}-${month}-${day}`;
    // console.log(formattedDate);
    // const [birthday, setBirthday] = useState(formattedDate);
    //
    // const handleBirthdayChange = (e) => {
    //     const newValue = e.target.value;
    //     setBirthday(newValue);
    // };



    //message
    const [message, setMessage] = useState('');

    return (
        <>
            {/*<div className="row flowaccount">*/}
            {/*    <div className="col-sm-4 col-xs-12">*/}
            {/*        <div className="border"><p>TỔNG TIỀN ĐÃ NẠP</p><span>0đ </span></div>*/}
            {/*    </div>*/}
            {/*    <div className="col-sm-4 col-xs-12">*/}
            {/*        <div className="border"><p>TỔNG TIỀN ĐÃ DONATE</p><span>0đ </span></div>*/}
            {/*    </div>*/}
            {/*    <div className="col-sm-4 col-xs-12">*/}
            {/*        <div className="border"><p>SỐ GIỜ ĐÃ THUÊ</p><span>0 Giờ</span></div>*/}
            {/*    </div>*/}
            {/*</div>*/}
            <div className="row">
                <div className="col-md-6 col-sm-12 col-xs-12 personalinfo">
                    <h3>Thông tin cá nhân</h3>
                    <UploadAvatar/>
                    <Formik initialValues= {accounts }
                            enableReinitialize={true}
                            validationSchema={validationSchema}
                            onSubmit={(values) => {
                                // values.birthday = selectedDate
                                // values.supplies = userSupply;
                                // values.birthday = birthday;
                                console.log("mau gui di", values)
                                // if (values.isGoogle === true){
                                //     setMessage('Do bạn đăng kí bằng google nên không thể sửa tài khoản email.')
                                //     return
                                // }
                                    axios.post(`http://localhost:8080/userDetail/change-user-profile/${accountId}`,values).then(res => {
                                        Swal.fire({
                                            position: 'center',
                                            icon: 'success',
                                            title: 'Cập nhật dữ liệu thành công.',
                                            showConfirmButton: false,
                                            timer: 1500
                                        });
                                        console.log("ketqua",res.data)
                                    })
                                }
                            }>
                            <Form className="from-userinfo">
                            <div className="fieldGroup "><p className="control-label">Họ</p><Field type="text" style={{padding: "10px", fontSize: "14px"}}
                                                                                                   name="firstName"
                                                                                                   maxLength={5000}
                                                                                                   autoComplete="false"
                                                                                                   readOnly={accounts && accounts.role && accounts.role.nameRole === "ROLE_USER"}
                            />
                                <ErrorMessage name="firstName" component="div"
                                              className="error"/>
                            </div>
                            <div className="fieldGroup "><p className="control-label">Tên</p><Field type="text" style={{padding: "10px", fontSize: "14px"}}
                                                                                                    name="lastName"
                                                                                                    // placeholder  ={accounts.lastName || 'Nhập tên của bạn'}
                                                                                                    // defaultValue ={accounts.lastName || 'Nhập tên của bạn'}
                                                                                                    maxLength={5000}
                                                                                                    autoComplete="false"
                                                                                                    readOnly={accounts && accounts.role && accounts.role.nameRole === "ROLE_USER"}


                            />
                                <ErrorMessage name="lastName" component="div"
                                              className="error"/>
                            </div>
                            <div className="fieldGroup "><p className="control-label">Nick Name</p><Field type="text" style={{padding: "10px", fontSize: "14px"}}
                                                                                                          name="nickname"
                                                                                                          maxLength={5000}
                                                                                                          autoComplete="false"
                            />
                                <ErrorMessage name="nickname" component="div"
                                              className="error"/>
                            </div>
                                <div className="fieldGroup "><p className="control-label">Số điện thoại</p><Field type="text" style={{padding: "10px", fontSize: "14px"}}
                                                                                                              name="phoneNumber"
                                                                                                              maxLength={5000}
                                                                                                              autoComplete="false"
                                                                                                                  readOnly={accounts && accounts.role && accounts.role.nameRole === "ROLE_USER"}

                                />
                                    <ErrorMessage name="phoneNumber" component="div"
                                                  className="error"/>
                                </div>

                                <div className="fieldGroup">
                                    <p className="control-label">Email</p>
                                    <Field
                                        type="text" style={{padding: "10px", fontSize: "14px"}}
                                        name="email"
                                        maxLength={5000}
                                        autoComplete="false"
                                        readOnly={accounts.isGoogle}
                                    />
                                    <ErrorMessage name="email" component="div"
                                                  className="error"/>
                                    {message && !accounts.isGoogle && (
                                        <div className="error">{message}</div>
                                    )}
                                </div>


                                <p className="control-label">Ngày sinh</p>
                                <div>
                                    {/*<div*/}
                                    {/*    style={{*/}
                                    {/*        width: '90%',*/}
                                    {/*        display: 'inline-block', // Để đảm bảo nằm cạnh nhau*/}
                                    {/*        textAlign: 'center',*/}
                                    {/*        height: '55px',*/}
                                    {/*        padding: '17px',*/}
                                    {/*        border: '1px solid #777',*/}
                                    {/*        borderRadius: '7px',*/}
                                    {/*    }}*/}
                                    {/*>*/}
                                    {/*    {birthday || initialBirthday}*/}
                                    {/*</div>*/}
                                    <Field
                                        type="date"
                                        name="birthday"
                                        maxLength={5000}
                                        autoComplete="false"
                                        style={{
                                            width: '100%', // Chiếm 10% chiều rộng
                                            verticalAlign: 'top', // Để thẻ input nằm trên thẻ div
                                            marginBottom: "20px",
                                            padding: "10px", fontSize: "14px"
                                        }}
                                        readOnly={accounts && accounts.role && accounts.role.nameRole === "ROLE_USER"}

                                    />
                                    <ErrorMessage name="birthday" component="div"
                                                  className="error"/>
                                </div>


                            <div className="fieldGroup "><p className="control-label">Địa chỉ</p><Field type="text" style={{padding: "10px", fontSize: "14px"}}
                                                                                                        name="address"
                                                                                                        // placeholder={accounts.address || 'Nhập địa chỉ của bạn'}
                                                                                                        maxLength={5000}
                                                                                                        autoComplete="false"
                                                                                                        readOnly={accounts && accounts.role && accounts.role.nameRole === "ROLE_USER"}

                                                                                                        // enableReInitial = "true"
                            />
                                <ErrorMessage name="address" component="div"
                                              className="error"/>
                            </div>
                            <div className="fieldGroup ">
                            <p className="control-label">Giới tính</p>
                            <div>
                                {/*<div style={{ display: 'flex' }}>*/}
                                {/*    <div*/}
                                {/*        style={{*/}
                                {/*            width: '50%',*/}
                                {/*            textAlign: 'center',*/}
                                {/*            height: '55px',*/}
                                {/*            marginTop: '10px',*/}
                                {/*            padding: '17px',*/}
                                {/*            border: '1px solid #777',*/}
                                {/*            borderRadius: '7px',*/}
                                {/*        }}*/}
                                {/*    >*/}
                                {/*        {gender || initialGender}*/}
                                {/*    </div>*/}
                                {/*    <div>*/}
                                        <Field
                                            as="select"
                                            name="gender"
                                            style={{
                                                textAlign: 'center',
                                                borderRadius: '7px',
                                                // margin: '10px',
                                                outline: 'none',
                                                width: '100%',
                                                border: '1px solid #777',
                                                padding: "10px",
                                                fontSize: "14px"
                                            }}
                                            disabled={accounts && accounts.role && accounts.role.nameRole === "ROLE_USER"}

                                            // onChange={handleGenderChange}
                                        >
                                            <option value="">{initialGender}</option>
                                            <option value="Nam">Nam</option>
                                            <option value="Nữ">Nữ</option>

                                        </Field>
                                    {/*</div>*/}
                                </div>
                            </div>


                            {/*<div className="d-flex"><label className="gender--radio"><input name="gender" type="radio"*/}
                            {/*                                                                defaultValue={ accounts.gender || "Nam"}*/}
                            {/*                                                                defaultChecked="checked"/>Nam<span/></label><label*/}
                            {/*    className="gender--radio"><input name="gender" type="radio"*/}
                            {/*                                     defaultValue={accounts.gender|| "Nữ"}/>Nữ<span/></label></div>*/}
                            <div className="fieldGroup ">
                                <p className="control-label">Khu vực</p>
                                <div>
                                    <Field
                                        as="select"
                                        name="zone.id"
                                        style={{
                                            textAlign: 'center',
                                            borderRadius: '7px',
                                            outline: 'none',
                                            width: '100%',
                                            border: '1px solid #777',
                                            padding: "10px",
                                            fontSize: "14px"
                                        }}
                                        disabled={accounts && accounts.role && accounts.role.nameRole === "ROLE_USER"}

                                    >
                                        <option value="">{zone}</option>
                                        <option value="1">Miền Bắc</option>
                                        <option value="2">Miền Trung</option>
                                        <option value="3">Miền Nam</option>
                                    </Field>

                                </div>
                            </div>


                            <div className="fieldGroup "><p className="control-label">Chiểu cao (cm)</p><Field type="text" style={{padding: "10px", fontSize: "14px"}}
                                                                                                        name="height"
                                                                                                        // placeholder={accounts.height || 'Nhập chiều cao của bạn'}
                                                                                                        maxLength={5000}
                                                                                                        autoComplete="false"
                                                                                                               readOnly={accounts && accounts.role && accounts.role.nameRole === "ROLE_USER"}

                            />
                                <ErrorMessage name="height" component="div"
                                              className="error"/>
                            </div>
                            <div className="fieldGroup "><p className="control-label">Cân nặng (kg)</p><Field type="text" style={{padding: "10px", fontSize: "14px"}}
                                                                                                          name="weight"
                                                                                                          // placeholder={accounts.weight || 'Nhập cân nặng của bạn'}
                                                                                                          maxLength={5000}
                                                                                                          autoComplete="false"
                                                                                                              readOnly={accounts && accounts.role && accounts.role.nameRole === "ROLE_USER"}

                            />
                                <ErrorMessage name="weight" component="div"
                                              className="error"/>
                            </div>
                            <div className="fieldGroup "><p className="control-label">Giới thiệu</p><Field type="text" style={{padding: "10px", fontSize: "14px"}}
                                                                                                              name="describes"
                                                                                                              // placeholder={accounts.describes || 'Nhập giới thiệu của bạn'}
                                                                                                              maxLength={5000}
                                                                                                              autoComplete="false"
                                                                                                           readOnly={accounts && accounts.role && accounts.role.nameRole === "ROLE_USER"}

                            />

                            </div>
                            <div className="fieldGroup "><p className="control-label">Yêu cầu</p><Field type="text" style={{padding: "10px", fontSize: "14px"}}
                                                                                                           name="basicRequest"
                                                                                                           // placeholder={accounts.basicRequest || 'Nhập yêu cầu của bạn'}
                                                                                                           maxLength={5000}
                                                                                                           autoComplete="false"
                                                                                                        readOnly={accounts && accounts.role && accounts.role.nameRole === "ROLE_USER"}

                            />
                            </div>
                            <div className="fieldGroup "><p className="control-label">Trang cá nhân</p><Field type="text" style={{padding: "10px", fontSize: "14px"}}
                                                                                                        name="facebookLink"
                                                                                                        // placeholder={accounts.facebookLink || 'Nhập địa chỉ trang cá nhân của bạn'}
                                                                                                        maxLength={5000}
                                                                                                        autoComplete="false"
                                                                                                              readOnly={accounts && accounts.role && accounts.role.nameRole === "ROLE_USER"}

                            />
                            </div>
                            {/*<div  className={"col-md-18"} style={{textAlign: "center"}}>*/}
                            {/*    <div>*/}
                            {/*        <p className="control-label">Dịch vụ</p>*/}
                            {/*        <RegisterSupply isRegister={true} name='supplies.id'/>*/}
                            {/*    </div>*/}
                            {/*</div>*/}
                            <hr/>
                            <button type="submit" className="btn-update">Cập nhật</button>
                        </Form>
                    </Formik>
                </div>
            </div>
        </>
    )
}
export default UserInfo