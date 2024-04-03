import axios from "axios";

 class SignupCCDV{
    // call api đăng kí tài khoản và tự động tạo profile
     static async registerAndProfile(values) {
         return await axios.post("http://localhost:8080/accounts/registerUserAndProfile", values, {
             headers: {
                 "Authorization": `Bearer ${localStorage.getItem("token")}`
             }
         });
     }
     // call api đăng kí tài khoản và tự động tạo profile cho Google account
     static async registerAndProfileGoogle(values) {
         return await axios.post("http://localhost:8080/accounts/registerUserAndProfileGoogle", values, {
             headers: {
                 "Authorization": `Bearer ${localStorage.getItem("token")}`
             }
         });
     }
     // call api đăng kí tài khoản chưa có profile
     static async registerUser(values) {
         return await axios.post("http://localhost:8080/accounts/registerUser", values, {
             headers: {
                 "Authorization": `Bearer ${localStorage.getItem("token")}`
             }
         });
     }
     // call api đăng kí tài khoản chưa có profile cho Google account
     static async registerUserGoogle(values) {
         return await axios.post("http://localhost:8080/accounts/registerUserGoogle", values, {
             headers: {
                 "Authorization": `Bearer ${localStorage.getItem("token")}`
             }
         });
     }

     static async registerUserGoogle2(values) {
         return await axios.post("http://localhost:8080/accounts/registerUserGoogle2", values, {
             headers: {
                 "Authorization": `Bearer ${localStorage.getItem("token")}`
             }
         });
     }
     static async checkProfile(id){
         return await axios.get("http://localhost:8080/accounts/checkProfileExists/"+id)
     }

     //call api đăng kí ccdv userprofile

    static async signupUserDetailProfile(id,values){
        return await axios.post("http://localhost:8080/userDetail/registerCCDV/" +id, values);
    }
    //api dang ki tu dong userProfile
    static async signUpAutoUserDetailProfile(id){
        return await axios.post("http://localhost:8080/userDetail/registerAutoCCDV/" +id);
    }
    //api lấy danh sách dịch vụ(supply)
     static async getListSupply(){
         return await axios.get("http://localhost:8080/supplies/getSupplyList")
     }
     // edit supply bi id user profile
     static async setNewListSupply(id,list){
         return await  axios.post("http://localhost:8080/supplies/setSupply?id="+id,list)
     }
     static async setNewPrice(name,price){
         return await  axios.get("http://localhost:8080/userDetail/setPrice?username="+name+"&price="+price)
     }

}
export default SignupCCDV;