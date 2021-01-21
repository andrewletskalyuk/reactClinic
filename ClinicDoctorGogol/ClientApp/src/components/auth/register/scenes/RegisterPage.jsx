import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import TextFieldGroup from '../../../common/TextFieldGroup';
import PhoneFieldGroup from '../../../common/PhoneFieldGroup';
// import ImageFieldGroupCropper from "../../../common/ImageFieldGroupCropper";
import { validateFields } from "./validation";
import SignInImage from './Images/signin-image.jpg';
import '../scenes/RegisterPage.css';
import { Button } from 'primereact/button';
import EclipseWidget from '../../../common/eclipse';

//import IndexConPage from '../../confirm/index';

class RegisterPage extends Component {
    state = {
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        //photo: "",
        password: "",
        confirmPassword: "",
        errorMessage: "",
        loading: this.props.loading,
        errors: this.props.errors,
        confirmEmail: false
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
    onSubmitForm = (e) => {
        e.preventDefault();

        const errors = validateFields(this.state);

        const isValid = Object.keys(errors).length === 0;
        if (isValid) {
            const model = {
                FirstName: this.state.firstName,
                LastName: this.state.lastName,
                Email: this.state.email,
                Phone: this.state.phone,
                // Photo: this.state.photo,
                Password: this.state.password,
                ConfirmPassword: this.state.confirmPassword,
                confirmEmail: this.state.confirmEmail
            };
            this.props.registerUser(model);
            this.setState({ errorMessage: "", errors, loading: true });
        }
        else {
            this.setState({ errorMessage: "Щось пішло не так!", errors });
        }
        console.log("SubmitForm");
    }


    handlerChange = (e) => {
        console.log("e handler", e.target.name + " " + e.target.value);
        this.setState({ [e.target.name]: e.target.value });
    }

    render() {
        console.log("Register props: ", this.props);
        console.log("Register state: ", this.state);

        const {
            firstName,
            lastName,
            email,
            phone,
            password,
            confirmPassword,
            errorMessage,
            loading,
            errors
        } = this.state
        console.log("Is Erors email:", !!errors["email"]);

        return (
            <>
                <div className="signup" id='singUpPage'>
                    <div className="container mt-2">
                        <div className="signup-content">
                            <div className="signup-form">
                                <p className="text-center text-danger">{errorMessage}</p>    
                                <h2 className="form-title">Реєстрація</h2>
                                <form onSubmit={this.onSubmitForm} className="register-form" id="register-form">
                                    <TextFieldGroup
                                        field="firstName"
                                        value={firstName}
                                        label="Ім'я"
                                        icon="fa fa-user"
                                        error={errors.firstName}
                                        onChange={this.handlerChange}
                                    />

                                    <TextFieldGroup
                                        field="lastName"
                                        value={lastName}
                                        label="Прізвище"
                                        icon="fa fa-user"
                                        error={errors.lastName}
                                        onChange={this.handlerChange}
                                    />

                                    <TextFieldGroup
                                        field="email"
                                        value={email}
                                        label="Електронна пошта"
                                        icon="fa fa-envelope"
                                        type="email"
                                        //placeholder="Email"
                                        error={errors.email}
                                        onChange={this.handlerChange}
                                    />

                                    <PhoneFieldGroup
                                        field="phone"
                                        value={phone}
                                        label="Телефон"
                                        icon="fa fa-phone"
                                        error={errors.phone}
                                        onChange={this.handlerChange}
                                    />

                                    <TextFieldGroup
                                        field="password"
                                        value={password}
                                        label="Пароль"
                                        icon="fa fa-lock"
                                        type="password"
                                        //placeholder="Email"
                                        error={errors.password}
                                        onChange={this.handlerChange} />

                                    <TextFieldGroup
                                        field="confirmPassword"
                                        value={confirmPassword}
                                        label="Підтверження пароля"
                                        icon="fa fa-lock"
                                        type="password"
                                        //placeholder="Email"
                                        error={errors.confirmPassword}
                                        onChange={this.handlerChange} 
                                        />

                                    <div className="form-group text-center m-1 p-1">
                                        <Button type="submit" className="p-button-outlined p-button-info"> Створити акаунт  </Button>
                                    </div>
                                    <p className="text-center">Зареєстровані? <Link to="/login">Залогуватися</Link> </p>
                                </form>
                            </div>
                            <div className="signup-image ">
                                <figure className="align-items-center justify-content-center">
                                    <img alt='' src={SignInImage} style={{ "maxWidth": "auto" }} /></figure>
                            </div>
                        </div>
                    </div>
                </div>
                {loading && <EclipseWidget />}
            </>
        )
    };
}

export default RegisterPage; 
