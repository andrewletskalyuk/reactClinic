import RegisterPage from './scenes/RegisterPage';
import { connect } from 'react-redux';
import { registerUser } from './actions';

const mapState = (stateRedux) =>
{
    return {
        loading: stateRedux.register.loading,
        errors: stateRedux.register.errors,
    }
}

const Register = RegisterPage;
export default connect(mapState, {registerUser})(Register);
