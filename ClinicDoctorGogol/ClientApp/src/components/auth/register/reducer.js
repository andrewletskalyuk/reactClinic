import * as types from './types';
const intialState = {
    loading: false,
    errors: {}
}

export const registerReducer = (state = intialState, action) => {
    console.log("Reducer working", action);
    switch (action.type) {
        case types.REGISTER_STARTED:
            return {
                //...this.state,
                loading: true,
                errors: {}
            }
            break;

        case types.REGISTER_SUCCESS:
            return {
                loading: false,
                errors: {}
            }
            break;

        case types.REGISTER_FAILED:
            return {
                loading: false,
                errors: action.errors
            }
            break;

        default:
            break;
    }
    return state;
}
