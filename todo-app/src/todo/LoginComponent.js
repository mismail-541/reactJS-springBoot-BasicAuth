import React, { Component } from 'react';
import './todos.css';

import AuthenticationService from './AuthenticationService.js';

class LoginComponent extends Component {

    constructor(props){
        super(props);

        this.state = {
            username: '',
            password: '',
            hasLoginFailed:false,
            showSuccessMessage:false
        }
    }

    printCurrentState = (event) =>{
        console.log('current state is:',this.state);
    }

    handleChange = (event) =>{
        this.setState(
            {
                [event.target.name]: event.target.value
            }
        );
    }

    loginClicked = (event) =>{

        AuthenticationService.executeBasicAuthenticationService(this.state.username,this.state.password)
        .then(
            ()=>{
                console.log('login success :)')

                AuthenticationService.registerSuccessfulLogin(this.state.username,this.state.password);
    
                Object.assign({},{showSuccessMessage:true,hasLoginFailed:false});
    
                //Programmatically activate route:
                this.props.history.push(`/welcome/${this.state.username}`);
            }
        )
        .catch(
            ()=>{
                
                console.log('login failed :(')

                Object.assign({},{showSuccessMessage:false,hasLoginFailed:true});
            }
        )
    }

    render() {
        

        return (

            <div>
                <h1 className='login-comp-instruction'>Please Enter Your Credentials Below</h1>

                <div className='login-component'>                    

                    <label className='login-comp-label'>
                        <input type='text' 
                                        name='username' 
                                        placeholder=' ' 
                                        value={this.state.username} 
                                        onChange={this.handleChange}
                                        className='login-credential-field'
                                        />
                        <span className='login-comp-span'>Username</span>
                    </label>
                    
                    <label className='login-comp-label'>
                    <input type='Password' 
                                     name='password' 
                                     placeholder=' ' 
                                     value={this.state.password} 
                                     onChange={this.handleChange}
                                     className='login-credential-field'
                                     />
                    <span className='login-comp-span'>Password</span>
                    </label>
                    <button onClick={this.loginClicked} className='login-submit-btn'>Login</button>
                   
                    {/*<button onClick={this.printCurrentState}>Print Current Login State</button>*/}
                </div>
            </div>

                
        );
    }
}

export default LoginComponent;