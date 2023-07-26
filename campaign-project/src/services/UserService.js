import axios from "axios";


const url='http://localhost:7777';

 class UserService {
    signin(data){
        return axios.post(url+'/authenticate',data);
    }

    googlesignin(data){
        
    }

      

    
    
}
export default new UserService