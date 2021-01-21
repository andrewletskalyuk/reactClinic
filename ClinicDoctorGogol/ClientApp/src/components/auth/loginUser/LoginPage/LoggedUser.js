import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import completeLogIn from './ImagesLogin/loggedSFimg.jpg';
import { connect } from 'react-redux';

class LoggedUser extends Component{
    render(){
        const {
            loggedIn,
            user
        } = this.props;
        return(
                <div>
                <div className="container mt-2 text-center">
                    <div className='opacity-1 m-3 pt-3'>
                        {loggedIn && 
                            <p>{user.email} успішно залогувався</p>
                        }
                        <img alt='' src={completeLogIn} style={{ maxWidth: '100px' }} />
                        <Link to='/'>На головну</Link>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    const { loggedIn, user } = state.authentication;
    return {
        loggedIn,
        user
    };
}


export default connect(mapStateToProps,null)(LoggedUser);