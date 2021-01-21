import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import completeImage from './images/completeRegister.jpg';

class CompleteRegister extends Component {

    render() {
        return (
            <div>
                <div className="container mt-2 text-center">
                    <div className='opacity-1 m-3 pt-3'>
                        <p>Для завершення реєстрації підтвердіть електронну пошту</p>
                        <img alt='' src={completeImage} style={{ maxWidth: '100px' }} />
                        <Link to='/'>На головну</Link>
                    </div>
                </div>
            </div>
        )
    }
}

export default CompleteRegister;