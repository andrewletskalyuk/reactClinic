import RestorePasswordPage from './scenes/RestorePasswordPage';
import {connect} from 'react-redux';
import { restorePassword } from './action';

const mapState = state =>
{
    return {
        email: state.RestorePasswordPage.email,
        loading: state.RestorePasswordPage.loading,
        errors: state.RestorePasswordPage.errors,
    }
}

//це контейнер куди буде передана функція 
const RestorePass = RestorePasswordPage;

//mapDispatchToProps огортаємо нашу функцію в іншу функцію, щоб можна було її використати
const mapDispatchToProps = {
    restorePassword
}

//а оце чистий редакс
export default connect(mapState, mapDispatchToProps)(RestorePass);