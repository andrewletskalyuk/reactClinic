import react from 'react'; 
import * as types from './types';
const restoringStateOfPassword = {
    loading: false,
    isRestored: false,
    errors: {}
}

//state має отримати перші значення
export const restorePasswordReducer = (state = restoringStateOfPassword, action) => {
    console.log("Reducer restore password working", action);
    switch (action.type) {
        case types.RESTORE_STARTED:
            return {
                loading: true,
                isRestored: false,
                errors: {}
            }
        //break;
        case types.RESTORE_SUCCESS:
            return {
                loading: false,
                isRestored: true,
                errors: {}
            }
        case types.RESTORE_FAILED:
            return {
                loading: false,
                isRestored: false,
                errors: action.errors
            }
        default:
            break;
    }
    //редюсер завжди повивен повертати state
    return state;
}
