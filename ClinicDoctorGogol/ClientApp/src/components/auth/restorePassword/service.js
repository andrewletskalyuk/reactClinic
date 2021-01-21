import axios from 'axios';
import { serverUrl } from '../../../config';

export default class RestorePasswordService{
    static restorePassword(model)
    {
        //тут ми постом відправимо дані з новим паспортом юзера
        return axios.post(`${serverUrl}api/Account/restorepassword`, model);
    }
}
