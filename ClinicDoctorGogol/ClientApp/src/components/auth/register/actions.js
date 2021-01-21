import * as types from './types';
import RegisterService from './service';
import { push } from 'connected-react-router';

export const registerUser = (model) => {
    return (dispatch) => {
        dispatch({type: types.REGISTER_STARTED});
        RegisterService.registerUser(model)
            .then((response)=>{
                dispatch({type: types.REGISTER_SUCCESS});
                //тут пернаправляем перехід на сторінку
                dispatch(push('/completeregister'));
                console.log("responce data", response.data);
            }, err => {
                console.log("error: ", err.response);
                dispatch({
                    type: types.REGISTER_FAILED,
                    errors: err.response.data
                });
            })
            .catch(err=> {
                console.log("Global server error", err);
            }
        );
    }
}
