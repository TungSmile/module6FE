import React, {useEffect, useState} from 'react';
import {ErrorMessage, Field, Formik} from 'formik';
import * as Yup from 'yup';
import Swal from "sweetalert2";
import '../../custom-css/cssRegister.css'
import SignupCCDV from "../../service/custom/SignupCCDV";
import {useNavigate} from "react-router";
import {Link} from "react-router-dom";
import login from "../login/Login";

const validationSchema = Yup.object().shape({
    username: Yup.string()
        .required('Tên đăng nhập là bắt buộc')
        .min(6, 'Tên đăng nhập phải có ít nhất 6 ký tự'),
    password: Yup.string()
        .required('Mật khẩu là bắt buộc')
        .min(8, 'Mật khẩu phải có ít nhất 8 ký tự')
        .matches(/(?=.*\d)/, 'Mật khẩu phải chứa ít nhất một chữ số'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Mật khẩu không trùng khớp')
        .required('Nhập lại mật khẩu là bắt buộc'),
    email: Yup.string().email('Email không hợp lệ').required('Email là bắt buộc'),
    nickName: Yup.string().required('Tên người dùng là bắt buộc')
});
const SignupForm = () => {
    const [message, setMessage] = useState('');
    const [message2, setMessage2] = useState('');
    useEffect(() => {
        setMessage('');
        setMessage2('');
    }, []);


    const resetMessage = () => {
        setMessage('');
        setMessage2('');
    }
    const navigate = useNavigate();
    return (
        <>
            link rel="shortcut icon" href="../resources/raw/favicon.ico"/>
            <link href="/resources/all.css" rel="stylesheet"/>
            <link href="/resources/css.css" rel="stylesheet"/>
            <title>PlayerDuo - Thuê người yêu</title>
            <link href="/resources/8.97b85fe3.chunk.css" rel="stylesheet"/>
            <link href="/resources/main.3e229f12.chunk.css" rel="stylesheet"/>
            <link rel="stylesheet" type="text/css" href="/resources/9.cb7de3a7.chunk.css"/>
            <link rel="stylesheet" href="/resources/css-login.css"/>
            <link rel="stylesheet" type="text/css" href="/resources/css/style.css"/>
            <title>React App</title>
            <div className="notifications-wrapper"></div>
            <div className="main-singin-box">
                <div className="wrapper">
                    <div className="container">
                        <div className="row login-page">
                            <div className="col-md-7 hidden-sm hidden-xs image-login">
                                <img style={{height: '100%', borderRadius: '8px', boxShadow: '5px 5px 7px 0'}}
                                     src="/resources/img/imgbackground.jpg" className=""
                                     alt="PD"/>
                            </div>
                            <div className={"content-main"} style={{
                                width: '700px',
                                border: '1px',
                                borderRadius: '8px',
                                backgroundColor: '#fff',
                                padding: '20px',
                                boxShadow: '5px 5px 7px 0'
                            }}>
                                <Formik
                                    initialValues={{
                                        username: '',
                                        password: '',
                                        confirmPassword: '',
                                        email: '',
                                        nickName: '',
                                    }}
                                    validationSchema={validationSchema}
                                    onSubmit={(values, actions) => {
                                        // Đây là nơi xử lý submit form sau khi đã validate thành công
                                        console.log(values);
                                        SignupCCDV.registerAndProfile(values)
                                            .then(async (response) => {
                                                console.log('trave', response)
                                                if (response.data.validStatus === 'NAME_EXISTED_EMAIL_EXIST') {
                                                    setMessage("Tên đăng nhập đã tồn tại. Vui lòng chọn tên khác.");
                                                    setMessage2("Email đã được đăng ký. Vui lòng sử dụng email khác.");
                                                } else if (response.data.validStatus === 'NAME_EXISTED') {
                                                    setMessage("Tên đăng nhập đã tồn tại. Vui lòng chọn tên khác.");
                                                } else if (response.data.validStatus === 'EMAIL_EXIST') {
                                                    setMessage2("Email đã được đăng ký. Vui lòng sử dụng email khác.");
                                                } else if (response.data.validStatus === 'SUCCESSFULL') {
                                                    await Swal.fire({
                                                        position: 'center',
                                                        icon: 'success',
                                                        title: 'Đăng kí thành công, kiểm tra email để xác minh tài khoản.',
                                                        showConfirmButton: false,
                                                        timer: 1500
                                                    });
                                                    navigate("/login")
                                                }


                                            })
                                            .finally(() => {
                                                actions.setSubmitting(false);
                                            });
                                    }}
                                >
                                    {({ handleSubmit, isSubmitting }) => (
                                        <form onSubmit={handleSubmit}>
                                            <div className="fieldGroup" style={{ display: 'flex',height:'70px' }}>
                                                <div className="input-wrapper" style={{width:'50%', fontSize: '14px', color:'red'}}>
                                                    <Field
                                                        type="text"
                                                        name="username"
                                                        placeholder="Tên đăng nhập"
                                                        maxLength="5000"
                                                        autoComplete="false"
                                                        onFocus={resetMessage}
                                                        style={{
                                                            textAlign: 'center',
                                                            borderRadius: '7px',
                                                            padding: '7px',
                                                            margin: '10px',
                                                            outline: 'none'
                                                        }}
                                                    />
                                                    <ErrorMessage name="username" component="div" className="error" />
                                                </div>

                                                <div className="input-wrapper" style={{marginLeft:'10px',width:'50%', fontSize:'14px', color:'red'}}>
                                                    <Field
                                                        type="text"
                                                        name="nickName"
                                                        placeholder="Tên người dùng"
                                                        maxLength="5000"
                                                        autoComplete="false"
                                                        style={{
                                                            textAlign: 'center',
                                                            borderRadius: '7px',
                                                            padding: '7px',
                                                            margin: '10px',
                                                            outline: 'none'
                                                        }}
                                                    />
                                                    <ErrorMessage name="nickName" component="div" className="error" />
                                                </div>

                                                {message && (
                                                    <div className="error">
                                                        {message}
                                                    </div>
                                                )}
                                            </div>

                                            <div className="fieldGroup" style={{ display: 'flex',height:'70px' }}>
                                                <div className="input-wrapper"  style={{width:'50%', fontSize: '14px', color:'red'}}>
                                                    <Field
                                                        type="password"
                                                        name="password"
                                                        placeholder="Mật khẩu"
                                                        maxLength="5000"
                                                        autoComplete="false"
                                                        style={{
                                                            textAlign: 'center',
                                                            borderRadius: '7px',
                                                            padding: '7px',
                                                            margin: '10px',
                                                            outline: 'none'
                                                        }}
                                                    />
                                                    <ErrorMessage name="password" component="div" className="error" />
                                                </div>

                                                <div className="input-wrapper"  style={{marginLeft:'10px' ,width:'50%', fontSize: '14px', color:'red'}}>
                                                    <Field
                                                        type="password"
                                                        name="confirmPassword"
                                                        placeholder="Nhập lại mật khẩu"
                                                        maxLength="5000"
                                                        autoComplete="false"
                                                        style={{
                                                            textAlign: 'center',
                                                            borderRadius: '7px',
                                                            padding: '7px',
                                                            margin: '10px',
                                                            outline: 'none'
                                                        }}
                                                    />
                                                    <ErrorMessage name="confirmPassword" component="div" className="error" />
                                                </div>
                                            </div>

                                            <div className="register-verify-email"  style={{fontSize: '14px', color:'red',height:'70px'}}>
                                                <div className="fieldGroup">
                                                    <Field type="email" name="email" placeholder="Email" maxLength="5000" autoComplete="false" onFocus={resetMessage} style={{textAlign: 'center', borderRadius: '7px', padding: '7px', margin: '10px', outline: 'none'}}
                                                    />
                                                    <ErrorMessage name="email" component="div" className="error"/>
                                                </div>

                                                {message2 && (
                                                    <div className="error">
                                                        {message2}
                                                    </div>
                                                )}
                                            </div>
                                            <div className="recaptcha">
                                                {/* Đoạn mã reCAPTCHA */}
                                            </div>
                                            <button type={"submit"} disabled={isSubmitting}
                                                    style={{marginTop: '2px', marginLeft: '0', marginBottom: '20px', height: '30px', borderRadius: '10px', alignContent: 'center'}}>
                                                <span style={{margin: '20px', padding: '10px',}}>Đăng ký tài khoản</span>
                                            </button>
                                        </form>
                                    )}
                                </Formik>
                                <div className="change-link" style={{display: 'flex', justifyContent: 'space-between'}}>
                                    <a className="create-new" href={"/login"}>
                                        <p>
                                            <span>Đăng nhập</span>
                                        </p>
                                    </a>
                                    {/*<a className="create-new">*/}
                                    {/*    <p>*/}
                                    {/*        <span>Quên mật khẩu?</span>*/}
                                    {/*    </p>*/}
                                    {/*</a>*/}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SignupForm;
