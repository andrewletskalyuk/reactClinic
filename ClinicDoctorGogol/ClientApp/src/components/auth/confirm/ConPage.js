import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';

class ConPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: props.email
        }
    }
    render() {
        return (
            <div className='container'>
                <p>{this.props.email} - пошта була успішно підтверджена.</p>
                <Link to='/' >На головну</Link>
            </div>
        );
    }
}

export default ConPage;