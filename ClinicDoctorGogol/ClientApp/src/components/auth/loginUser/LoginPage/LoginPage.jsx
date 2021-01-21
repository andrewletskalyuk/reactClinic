import React, { Component } from 'react';
import { connect } from 'react-redux';
import { userActions } from '../_actions';
import { validateFieldsLogin } from '../LoginPage/validationLogin';
import TextFieldGroup from '../../../common/TextFieldGroup';
import EclipseWidget from '../../../common/eclipse';
import loginimg from '../LoginPage/ImagesLogin/loginImg.jpg';
import './LoginPage.css';
import { Button } from 'primereact/button';

class LoginPage extends Component {
    state = {
        email: '',
        password: '',
        submitted: false,
        loading: false,
        loggingIn: false,
        errors: this.props.errors
    };

    componentDidMount() {
        console.log('завантаження сторінки Логування');
        this.props.logout();
    }

    //визивається при зміні даних у пропсах
    UNSAFE_componentWillReceiveProps = (nextProps) => {
        console.log('Change props', nextProps);
        this.setState({
            loading: nextProps.loading,
            errors: nextProps.errors
        }
        );
    }

    handlerChange = (e) => {
        console.log("login page e handler", e.target.name + " " + e.target.value);
        this.setState({ [e.target.name]: e.target.value });
    }

    handleSubmitLogin = (e) => {
        e.preventDefault();
        const errors = validateFieldsLogin(this.state);
        const isValid = Object.keys(errors).length === 0;
        if (isValid) {
            const model = {
                Email: this.state.email,
                Password: this.state.password
            };
            this.props.login(model);
        }
        else {
            this.setState({ errorMessage: "Не валідна форма!", errors });
        }
    }
    render() {
        const {
            email,
            password,
            submitted,
            loading,
            errors
        } = this.state
        return (
            <>
                <div className='container mt-2'>
                    <h2 className="form-title text-center pt-3">Логування</h2>
                    <form onSubmit={this.handleSubmitLogin}>
                        <div className='form-group'>
                            <div className='container mt-2'>
                                <div className='row'>
                                    <div className='col-5 p-lg-3 ml-5 m-2 text-md-left text-lg-left text-xl-left text-sm-center'>
                                        <TextFieldGroup
                                            field="email"
                                            value={email}
                                            label="Електронна пошта"
                                            icon="fa fa-envelope"
                                            type="email"
                                            error={errors.email}
                                            onChange={this.handlerChange} />
                                        <TextFieldGroup
                                            field="password"
                                            value={password}
                                            label="Пароль"
                                            icon="fa fa-lock"
                                            type="password"
                                            error={errors.password}
                                            onChange={this.handlerChange} />
                                        <div className="form-group text-center m-1 p-1">
                                            <Button type="submit" className="p-button-outlined p-button-info"> Залогуватися  </Button>
                                        </div>
                                    </div>
                                    <div className='col-6'>
                                        <img alt="" src={loginimg} className='imgLoginCenter d-none d-sm-none d-md-none d-lg-block d-xl-block' />
                                    </div>
                                </div>
                            </div>
                        </div>
                        {submitted && this.state.errors.length === 0 &&
                            <p className="text-center">Ви були успішно залоговані.</p>
                        }
                    </form>
                </div>
                {loading && <EclipseWidget />}
            </>
        );
    }
}

function mapStateToProps(state) {
    const { loggingIn, submitted, email } = state.authentication;
    return {
        loggingIn,
        submitted,
        email, 
        errors: {

        }
    };
}
export default connect(mapStateToProps,userActions)(LoginPage);
