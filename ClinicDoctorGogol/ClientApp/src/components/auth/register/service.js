import axios from 'axios';
import { serverUrl } from '../../../config';

export default class RegisterService {
    static registerUser(model) {
        //от тут то і собака зарита наглухо - передача аксіосом постом моделі на сервер
        return axios.post(`${serverUrl}api/Account/register`, model);
    }
}
