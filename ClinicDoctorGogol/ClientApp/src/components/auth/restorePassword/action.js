import * as types from './types';
import restoreService from './service';
import { push } from 'connected-react-router';


//тут наша функція буде працювати з моделю 
export const restorePassword = (model) => {
    return (dispatch) => {
        dispatch({type: types.RESTORE_STARTED});
        restoreService.RestorePasswordService(model)
            .then((response)=>{
                dispatch({type: types.RESTORE_SUCCESS});
                //тут пернаправляем перехід на сторінку, щоб ввести новий пароль для користувача
                dispatch(push('/RestorePasswordProcess'));
                console.log("responce from restore", response.data);
            }, err => {
                console.log("error from restore process: ", err.response);
                dispatch({
                    type: types.RESTORE_FAILED,
                    errors: err.response.data
                });
            })
            .catch(err=> {
                console.log("Помилки відновлення паролю", err);
            }
        );
    }
}
