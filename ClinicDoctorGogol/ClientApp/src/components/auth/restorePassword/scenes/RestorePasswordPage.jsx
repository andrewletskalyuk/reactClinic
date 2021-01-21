import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import EclipseWidget from '../../../common/eclipse';
import TextFieldGroup from '../../../common/TextFieldGroup';
import { validateFields } from "./validation";
import { Button } from 'primereact/button';
import './Button.css';
import '../scenes/RestorePasswordPage.css';

class RestorePasswordPage extends Component {
    state = {
        email: "",
        loading: this.props.loading,
        errors: this.props.errors
    }

    UNSAFE_componentWillReceiveProps = (nextProps) => {
        console.log('параметри ресторе пас були змінені', nextProps);
        this.setState({
            loading: nextProps.loading,
            errors: nextProps.errors
        });
    }


    //а тут спрацьовує функція коли клікнули на відновлення паролю
    onSubmitFormRestorePassword = (e) => {
        e.preventDedault();
        //виймаємо помилки
        const errors = validateFields(this.state);
        const isValid = Object.keys(errors).length === 0;
        if (isValid) {
            //виймаємо дані для обробки
            const model = {
                Email: this.state.email
            };
            console.log("Model - ", model);
            this.props.restorePassword(model);
            this.setState({ errorMessage: "", errors, loading: true });
        }
        else {
            this.setState({ errorMessage: "Restore passwors - problems", errors });
        }
        console.log("restorePasswordForm SubmitForm");
    }

    //тут як тільки дані змінюються вони попадають в setState, до свого поля
    handlerChange = (e) => {
        console.log("e handler", e.target.name + " " + e.target.value);
        this.setState({ [e.target.name]: e.target.value });
    }

    render() {
        const {
            email,
            loading,
            errors
        } = this.state;
        return (
            <>
                <div className="container mt-2">
                    <div className='card'>
                        <article className='card-body mx-auto' style={{ maxWidth: 600 + 'px' }}>
                            <h5>Введіть електронну пошту при реєстрації</h5>

                            <form onSubmit={this.onSubmitFormRestorePassword}
                                className='restore-form'
                                id='restore-form'
                            >

                                <TextFieldGroup
                                    field="email"
                                    value={email}
                                    label="Електронна пошта"
                                    icon="fa fa-envelope"
                                    type="email"
                                    error={errors}
                                    onChange={this.handlerChange}
                                    style={{ maxWidth: 350 + 'px'}}
                                />

                                <div className="form-group text-center m-1 p-1">
                                    <Button type="submit" className="p-button-outlined p-button-info"> Відновити пароль </Button>
                                </div>
                            </form>

                        </article>

                    </div>
                </div>

                {loading && <EclipseWidget />}
            </>
        )
    }
}

export default RestorePasswordPage;