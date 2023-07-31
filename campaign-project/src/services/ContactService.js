import axios from "axios";


const url='http://localhost:7777/api/v1/contact';

 class ContactService {
    getAllContacts(userId,token){
        console.warn("token "+token);
        return axios.get(url+'/filter-list', {
            params: {
              userId: userId 
            },headers: {
                'Authorization': token, 
                
              }});
    }

    
    
}
export default new ContactService