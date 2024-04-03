
import Login from "../../pages/login/Login";
const HeaderLoginRegister =() =>{
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
                                <Login/>
                        </div>
                    </div>
                </div>
            </div>
            <div id="fb-root" style={{position: 'absolute', top: '-10000px', width: '0px', height: '0px'}}
                 className="fb_reset">
            </div>

        </>
    );
}
export default HeaderLoginRegister;