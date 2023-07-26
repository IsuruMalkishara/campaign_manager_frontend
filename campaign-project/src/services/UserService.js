import axios from "axios";


const url='http://localhost:7777';

 class UserService {
    signin(data){
        return axios.post(url+'/authenticate',data);
    }

    googlesignin(data){
        
    }

    signup(data){
        return axios.post(url+'/user/auth/send-email-otp',data);
    }

      
verifyEmail(data){
    return axios.post(url+'/user/auth/verify-email',data);
}

addPhone(data){
    return axios.post(url+'/user/auth/send-phone-otp',data);
}

verifyPhone(data){
    return axios.post(url+'/user/auth/verify-phone',data);
}
    
    
}
export default new UserService