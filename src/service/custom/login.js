import axios from "axios";

class LoginService{
    static async login(account){
        return await axios.post("http://localhost:8080/login", account);
    }

    static async loginGoogle(account){
        return await axios.post("http://localhost:8080/login/google", account);
    }

    static async logout(){
        localStorage.setItem("googleAccount", "");
        localStorage.setItem("account", "");
        localStorage.setItem("token", "");
    }
}
export default LoginService;