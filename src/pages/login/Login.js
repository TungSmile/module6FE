import LoginService from "../../service/custom/login";
import {ErrorMessage, Field, Form, Formik} from "formik";
import {useNavigate} from "react-router";
import * as yup from "yup";
import {useEffect, useState} from "react";
import Swal from "sweetalert2";
import {useDispatch} from "react-redux";
import {checkToken} from "../../service/UserService";
import {getAllNotifications} from "../../service/ChattingService";
import jwt_decode from "jwt-decode";

function Login() {
    // const [loadScript, setLoadScript] = useState(false);
    // Lấy "source" từ URL
    const searchParams = new URLSearchParams(window.location.search);
    const sourceParam = searchParams.get('source');
    const dispatch = useDispatch();
    if (sourceParam === 'email_activation'){
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Kích hoạt thành công. Hãy đăng nhập ngay.',
            showConfirmButton: false,
            timer: 1500
        });
    }
    const navigate = useNavigate();
    const [message, setMessage] = useState("")
    const signUpSchema = yup.object().shape({
        username: yup.string()
            .min(4, "Tài khoản phải lớn 4 ký tự!")
            .max(50, "Too Long!")
            .required("Tài khoản không được để trống")
            .matches(
                /^[a-z0-9]*$/,
                "Tài khoản không được chứa ký tự đặc biệt và chữ hoa"
            ),
        password: yup.string()
            .min(4, "Mật khẩu dài ít nhất 5 ký tự trở lên")
            .max(50, "Too Long!")
            .required("mật khẩu không được để trống")
            .matches(
                /^[a-zA-Z0-9]*$/,
                "Mật khẩu không được chứa ký tự đặc biệt"
            ),
    })
    const handleLogin = async (values) => {
        try {
            const response = await LoginService.login(values);
            const data = response.data;
            console.log(data.isActive);
            if ((data.status.nameStatus === "active" || data.status.nameStatus === "inActive") && data.isActive) {
                localStorage.setItem("token", data.token);
                localStorage.setItem("account", JSON.stringify(data));
                dispatch(checkToken());
                dispatch(getAllNotifications(data.id));
                if (data.role.nameRole ==="ROLE_ADMIN") {
                    navigate("/homeAdmin");
                } else if (data.role.nameRole ==="ROLE_USER") {
                    navigate("/");
                } else if (data.role.nameRole ===("ROLE_CCDV")) {
                    navigate("/");
                }
            } else if (data.status.nameStatus === "emailverify") {
                navigate("/login");
                setMessage("Tài khoản xác nhận email");
            } else if (data.status.nameStatus === "register") {
                navigate("/login");
                setMessage("Tài khoản chưa được chấp nhận");
            } else if (data.status.nameStatus === "block") {
                navigate("/login");
                setMessage("Tài khoản của bạn đã bị khóa");
            } else if (!data.isActive) {
                navigate("/login");
                setMessage("Tài khoản của bạn đã bị xóa");
            } else {
                // else này đang ko nhận
                navigate("/login");
                setMessage(data);
            }
        } catch (error) {
            navigate("/login");
            setMessage("tài khoản hoặc mật khẩu không chính xác");
        }
    }

    const handleLoginGoogle = async (email) => {
        try {
            let account = {
                email: email
            }
            const response = await LoginService.loginGoogle(account);
            const data = response.data;
            console.log(data);
            if (data.id && data.isActive) {
                localStorage.setItem("token", data.token);
                localStorage.setItem("account", JSON.stringify(data));
                dispatch(checkToken());
                dispatch(getAllNotifications(data.id));
                if (data.role.nameRole ==="ROLE_ADMIN") {
                    navigate("/homeAdmin");
                } else if (data.role.nameRole ==="ROLE_USER") {
                    navigate("/");
                } else if (data.role.nameRole ===("ROLE_CCDV")) {
                    navigate("/");
                }
            } else if (data === "Chưa có tài khoản") {
                navigate("/registerUserOrCCDV");
            } else {
                navigate("/login");
                setMessage(data);
            }
        } catch (error) {
            navigate("/login");
            setMessage("Chưa xác định catch");
        }
    }

    function handleCallbackResponse(response) {
        let userObj = jwt_decode(response.credential);
        console.log(userObj)
        localStorage.setItem("googleAccount", JSON.stringify(userObj));

        handleLoginGoogle(userObj.email).then(r => {});
    }

    useEffect(() => {
        /*global google*/
        window.google.accounts.id.initialize({
            client_id: "1037575977837-idj26a1rcc1tf4lvtqkkfbbt0mtbcd5i.apps.googleusercontent.com",
            callback: handleCallbackResponse
        });

        window.google.accounts.id.renderButton(
            document.getElementById("signInDiv"),
            {theme: "outline", size: "large"}
        )
        localStorage.setItem("googleAccount", "");
        localStorage.setItem("account", "");
        localStorage.setItem("token", "");
    }, [])

    // useEffect(() => {
    //     const script = document.createElement('script');
    //     script.src = 'https://accounts.google.com/gsi/client';
    //     // script.async = true;
    //     script.defer = true;
    //     document.body.appendChild(script);
    //
    //     setLoadScript(!loadScript);
    //     console.log("------------------")
    //
    //     return () => {
    //         // Clean up the script tag when the component unmounts
    //         document.body.removeChild(script);
    //     };
    // }, []);

    return (
        <>
            <link rel="shortcut icon" href="../resources/raw/favicon.ico"/>
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
                                <div className="content-main" style={{width: '450px', border: '1px', borderRadius: '8px', backgroundColor: '#fff', padding: '20px', boxShadow: '5px 5px 7px 0'}}>
                                    <h3 style={{color: '#f0564a'}}>Nơi kết nối yêu thương</h3>
                                    <Formik
                                        initialValues={{
                                            username: '',
                                            password: '',
                                        }}
                                        onSubmit={(values) => handleLogin(values)}
                                        validationSchema={signUpSchema}
                                    >
                                        <Form>
                                            <div className="fieldGroup" style={{ height: '80px', fontSize: '14px', color: 'red' }}>
                                                <label htmlFor="username" style={{color:'black'}}>Tên đăng nhập: </label>
                                                <Field type="text" id="username" name="username" maxLength={18} autoComplete="false" />
                                                <ErrorMessage name="username" />
                                                {message && <p style={{ textAlign: 'center' }}>{message}</p>}
                                            </div>
                                            <div className="fieldGroup" style={{ height: '80px', fontSize: '14px', color: 'red' }}>
                                                <label htmlFor="password" style={{color:'black'}}>Mật khẩu:</label>
                                                <Field type="password" id="password" name="password" maxLength={50} autoComplete="false" />
                                                <ErrorMessage name="password" />
                                            </div>
                                            {/*<p className="forgot-password">*/}
                                            {/*    <a href="src/pages/login/Login#"><span>Quên mật khẩu?</span></a>*/}
                                            {/*</p>*/}
                                            <button type="submit"><span>Đăng nhập</span></button>
                                        </Form>

                                    </Formik>
                                    {/*<button className="btn btn-default">*/}
                                    {/*    <i className="fab fa-facebook"></i>*/}
                                    {/*    <span>Đăng nhập bằng Facebook</span>*/}
                                    {/*</button>*/}

                                    <div style={{marginTop: '2px', borderRadius:'10px'}} id={"signInDiv"}></div>

                                    <div className={"row"}>
                                        <div className={"col-md-6"}>
                                            <a className="create-new" href={"/register"}>
                                                <p><span>Đăng ký người dùng</span></p>
                                            </a>
                                        </div>
                                        <div className={"col-md-6"}>
                                            <a className="create-new" href={"/registerCCDV"}>
                                                <p><span>Đăng ký cung cấp dịch vụ</span></p>
                                            </a>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
                <div id="fb-root" style={{position: 'absolute', top: '-10000px', width: '0px', height: '0px'}}
                     className="fb_reset">
                </div>

        </>
    );
};

export default Login;