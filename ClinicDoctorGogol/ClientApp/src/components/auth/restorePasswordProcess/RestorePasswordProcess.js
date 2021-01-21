import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class RestorePasswordProcess extends Component {
    render() {
        return (
            <div>
                <div className="container mt-2 text-center">
                    <div className='opacity-1 m-3 pt-3'>
                        <p>{this.props.email} - на пошту вислано посилання з подальшими інструкціями</p>
                        <Link to='/'>На головну</Link>
                    </div>
                </div>
            </div>
        )
    }
}

export default RestorePasswordProcess;