import React, { Component } from 'react';

import './todos.css';
import {Link} from 'react-router-dom';

import AuthenticationService from './AuthenticationService.js';

class LogoutComponent extends Component {

    render() {

        AuthenticationService.logout();

        return (
            <>
                <h1>You are logged out</h1>
                <div className="logout-container">
                    <span>
                        Thank You for Using Our Application.
                    </span>
                    <Link className='router-link login-submit-link' to='/login'>Login</Link>                                       
                </div>
            </>
        )
    }
}
export default LogoutComponent;
