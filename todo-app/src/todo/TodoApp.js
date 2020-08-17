import React, { Component } from 'react';

//import custom components:
import LoginComponent from './LoginComponent.js';
import LogoutComponent from './LogoutComponent.js';
import WelcomeComponent from './WelcomeComponent.js';
import ErrorComponent from './ErrorComponent.js';
import ListTodosComponent from './ListTodosComponent.js';

import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import FooterComponent from './outline-components/FooterComponent.js';
import './outline-components/bootstrap.css';
import './todos.css';

import AuthenticatedRoute from './AuthenticatedRoute.js';
import TodoComponent from './TodoComponent.js';

class TodoApp extends Component {


    submitLogin = () =>{
        console.log('##### inside submitLogin()....');
    }

    componentDidMount(){
        console.log('component did mount!')
    }

    render() {
        return (
            <div className='todo-app'>      
                    
                    <div className='todo-container'>
                        <Router>
                            <div className='todo-header'>                                
                            </div>
                            <div className='todo-cover'>
                                <Switch>
                                    <Route path='/' exact component={LoginComponent} />
                                    <Route path='/login' component={LoginComponent} />
                                    <AuthenticatedRoute path='/welcome/:name' component={WelcomeComponent} />
                                    <AuthenticatedRoute path='/todos/:name' component={ListTodosComponent} />
                                    <AuthenticatedRoute path='/add-todo/:name' component={TodoComponent} />
                                    <AuthenticatedRoute path='/update-todo/:name/:todoId' component={TodoComponent} />
                                    <AuthenticatedRoute path='/logout' component={LogoutComponent} />
                                    <Route component={ErrorComponent} />
                                </Switch> 
                            </div>
                                
                            <div className='todo-footer'>
                                <FooterComponent />
                            </div>                      
                        </Router>    
                
                    </div>

                
                            
            </div>
        );
    }
}
export default TodoApp;