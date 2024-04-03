import Login from "./Login";
import Register from "../register/Register";

const HomeLoginRegister = () =>{

    return (
        <>
            <div className="notifications-wrapper"></div>
            <div className="main-singin-box">
                <div className="wrapper">
                    <div className="container">
                        <div className="row login-page">
                            <div className="col-md-7 hidden-sm hidden-xs image-login">
                                <img style={{height: '100%', borderRadius: '8px', boxShadow: '5px 5px 7px 0'}} src="/resources/img/imgbackground.jpg" className="" alt="PD"/></div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default HomeLoginRegister;