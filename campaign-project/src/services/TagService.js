import axios from "axios";


const url='http://localhost:7777/api/v1/contact';

 class TagService {
    getAllTags(userId,token){
        console.warn("token "+token);
        return axios.get(url+'/tags', {
            params: {
              userId: userId 
            },headers: {
                'Authorization': token, 
                
              }});
    }

    
    
}
export default new TagService