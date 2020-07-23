import React, { Component } from 'react';

import AuthenticationService from './AuthenticationService.js'
import {Route,Redirect} from 'react-router-dom'; 

class AuthenticatedRoute extends Component {

    render() {

        const path = this.props.path;
        const component = this.props.component;

        const isUserLoggedIn = AuthenticationService.isUserLoggedIn();

        if(isUserLoggedIn){
            return <Route path={path} component={component} />
        }
        else{
            return <Redirect to='/login'/>
        }

    }
}

export default AuthenticatedRoute;