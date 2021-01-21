import React, { Component } from 'react';
import axios from 'axios';
import ConPage from './ConPage';
import EclipseWidget from '../../common/eclipse';

class ConfirmPage extends Component {
    state = {
        email: {},
        token: {},
        isLoading: true,
        confirmedEmail: false
    }
    componentDidMount = () => {
        console.log('confirm email -- ', this.props.location.search);
        const params = new URLSearchParams(this.props.location.search);
        const email = params.get('email');
        const token = params.get('token');
        console.log('qs----------', token);
        axios.post('/api/Account/confirm-email', {
            email: email,
            token: token
        }).then((response) => {
            console.log("привіт в обід", response);
            this.setState({ isLoading: false, email: response.data.email, confirmedEmail: response.data.confirmedEmail });
        }, err => {
            console.log("errors: ", err.response);
        })
            .catch(err => {
                console.log("Global server error", err);
            }
            );
    };

    render() {
        //const emailFor = this.params.get('email');
        const { isLoading, email, confirmedEmail } = this.state;
        return (
            <>
                {!confirmedEmail && <p>Підтвердіть будь ласка електронну пошту!</p>}
                {confirmedEmail && <ConPage email={email} />}
                {isLoading && <EclipseWidget />}
            </>
        );
    }
}

export default ConfirmPage;
