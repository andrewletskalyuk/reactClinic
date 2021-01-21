import axios from 'axios';
import { serverUrl } from '../../../../config';

export const userService = {
    login,
    logout
};

//от тут ми і відправляємо дані
function login(model){
    return axios.post(`${serverUrl}api/Account/login`, model);
    // .then(responce => this.setState({user: responce.user}))
    // .catch(error=>{
    //     this.setState({errorMessageFromLogin: error.message});
    //     console.error('Responce from Login was', error);
    // });
}

function logout(){
    //remove data from localstorage
    localStorage.removeItem('user');
}

