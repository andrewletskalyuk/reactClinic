import React, { Component } from 'react';
import imgforapp from './Images/appimg.jpg';
import { Button } from 'primereact/button';
import TextFieldGroup from '../common/TextFieldGroup';
import PhoneFieldGroup from '../common/PhoneFieldGroup';
import EclipseWidget from '../common/eclipse';
import { validateFieldsAppointments } from '../appointments/validationAppointments';
import DateTimePicker from './DateTimeFunction';
import './Appointments.css';

class Appointments extends Component {
    state = {
        fullname: "",
        phone: "",
        email: "",
        message: "",
        dateappointment: "",
        loading: this.props.loading,
        errors: this.props.errors
    }


    UNSAFE_componentWillReceiveProps = (nextProps) => {
        console.log('Appointments', nextProps);
        this.setState(
            {
                loading: nextProps.loading,
                errors: nextProps.errors
            }
        );
    }

    handlerChange = (e) => {
        console.log("e handler", e.target.name + " " + e.target.value);
        this.setState({ [e.target.name]: e.target.value });
    }
    
    onSubmitFormAppointment = (e) => {
        e.preventdefault();
        const errors = validateFieldsAppointments(this.state);
        
        const isValidData = Object.keys(errors).length === 0;
        if (isValidData) {
            const model = {
                fullname: this.state.fullname,
                phone: this.state.phone,
                email: this.state.email,
                message: this.state.message,
                dateappointment: this.state.dateappointment
            };
            this.props.Appointments(model);
            this.setState({ errorMessage: "", errors, loading: true });
        }
        else {
            this.setState({ errorMessage: "Щось пішло не так запис на прийом кульгає!", errors });
        }
    }
    
    render() {
        const {
            fullname,
            phone,
            email,
            message,
            dateappointment,
            loading,
            errors
        } = this.setState;
        return (
            <>
                <form action={this.onSubmitFormAppointment}>
                    <div className='form-group'>
                        <div className='container mt-2'>
                            <h5 className='pt-3 text-center'>Для запису на прийом заповніть поля</h5>
                            <div className='row'>
                                <div className='col-5 p-lg-3 m-2 text-md-left text-lg-left text-xl-left text-sm-center'>
                                    <div className='textgroupApp'>
                                        <TextFieldGroup
                                            field="fullname"
                                            value={fullname}
                                            label="ПІБ"
                                            icon="fa fa-user"
                                            //error={errors.fullname}
                                            onChange={this.handlerChange}
                                            className=''
                                        />
                                    </div>
                                    <div className='textgroupApp'>
                                        <PhoneFieldGroup
                                            field="phone"
                                            value={phone}
                                            label="Номер телефону для зворотнього зв'язку"
                                            icon="fas fa-mobile-alt"
                                            // error={errors.phone}
                                            onChange={this.handlerChange}
                                        />
                                    </div>
                                    <div className='textgroupApp'>
                                        <TextFieldGroup
                                            field="email"
                                            value={email}
                                            label="Ваш email"
                                            icon="far fa-envelope"
                                            // error={errors.email}
                                            onChange={this.handlerChange}
                                        />
                                    </div>
                                    <div className='textgroupApp'>
                                        <TextFieldGroup
                                            field="message"
                                            value={message}
                                            label="На що скаржитесь?"
                                            icon="far fa-sticky-note"
                                            // error={errors.message}
                                            onChange={this.handlerChange}
                                        />
                                    </div>
                                    <div className='mt-2 mb-3'>
                                        <DateTimePicker
                                            field="dateappointment" 
                                            value='dateappointment'
                                            onChange={this.handlerChange}
                                        />    
                                    </div>
                                    <div className='pl-3'>
                                        <Button type="submit" className="p-button-outlined p-button-info">Записатися на прийом</Button>
                                    </div>
                                </div>
                                <div className='col-6'>
                                    <img alt='' src={imgforapp} className='imgcenter d-none d-sm-none d-md-none d-lg-block d-xl-block'></img>
                                </div>
                            </div>
                        </div>

                    </div>

                </form>
                {loading && <EclipseWidget />}
            </>
        );
    }
}

export default Appointments;
