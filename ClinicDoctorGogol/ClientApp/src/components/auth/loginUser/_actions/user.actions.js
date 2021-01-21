import { userConstants } from '../_constants';
import { userService } from '../_services';
import { alertActions } from './';
import { history } from '../_helpers';
import { push } from 'connected-react-router';


export const userActions = {
    login,
    logout//,
    //getAll
};

function login(model) {
    console.log("model Z actions", model);
    return dispatch => {
        dispatch(request({ model }));
        userService.login(model)
            .then(
                response => {
                    dispatch(success(response.data.user)); //
                    dispatch(push('/loggeduser'))
                    //console.log(data);
                    console.log(response.data.user);
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            ).catch((error) => {
                console.log(error);
            }
            );
    };

    function request(user) { return { type: userConstants.LOGIN_REQUEST, user: user } }
    function success(user) { return { type: userConstants.LOGIN_SUCCESS, user: user } }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}

function logout() {
    userService.logout();
    return { type: userConstants.LOGOUT };
}

// function getAll() {
//     return dispatch => {
//         dispatch(request());

//         userService.getAll()
//             .then(
//                 users => dispatch(success(users)),
//                 error => dispatch(failure(error))
//             );
//     };

//     function request() { return { type: userConstants.GETALL_REQUEST } }
//     function success(users) { return { type: userConstants.GETALL_SUCCESS, users } }
//     function failure(error) { return { type: userConstants.GETALL_FAILURE, error } }
// }