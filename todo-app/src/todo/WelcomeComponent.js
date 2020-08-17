import React, { Component } from 'react';
import './todos.css';

import HeaderComponent from './outline-components/HeaderComponent.js';

import {Link} from 'react-router-dom';

import HelloWorldService from './api/todo/HelloWorldService.js';


class WelcomeComponent extends Component {

    constructor(props){
        super(props);

        this.state={
            welcomeMessage:''
        }
    }

    //Call hello world service:
    retrieveWelcomeMessage = () =>{
        console.log('welcome message button clicked!');

        HelloWorldService.executeHelloWorldService()
        .then(response => this.handleSuccessfulResponse(response))
    }

    handleSuccessfulResponse = (response)=>{
        this.setState({welcomeMessage:response.data.helloWorldResponse})
    }


    //invoke hello world service post:
    postTestMessage = () =>{
        console.log('postTestMessage button clicked!');

        HelloWorldService.postNewHelloWorldMessage('testing').then(response =>console.log('post sample message response:',response))
    }

    //invoke hello world service get request with path variable:
    getTestRequestWithPathVariableMessage = () =>{
        console.log('request with path variable button clicked!');

        HelloWorldService.executeHelloWorldServicePathVariable('pathVar123ABC').then(response =>console.log('get Request with path variable response:',response))
    }

    //invoke hello world service returnError:
    returnError = () =>{
        console.log('request to return error button clicked!');

        HelloWorldService.returnError().then(response =>console.log('get Request return error response:',response)).catch(error => console.log(error.response.data.message))
    }

    render() {

        //collect welcome message from api call:
        const welcomeMessageAPI=this.state.welcomeMessage;

        return (
            <div>
            
                <HeaderComponent/>
                
                <div>
                    <p>
                        <br></br>
                        Welcome to To-do App {this.props.match.params.name}!
                    
                    
                        You can manage your todos <Link className='welcome-todo-link' to = '/todos'>here</Link> or choose 'to-dos' from the navigation bar
                    </p>
                
                    <p>Click here to ge a customized welcome message.</p>
                    
                    <br></br>
                    
                    <button className='welcome-message-btn' 
                            onClick={this.retrieveWelcomeMessage}>Get Welcome Message</button>

                    <h1>{welcomeMessageAPI}</h1>


                    <button className='welcome-message-btn' 
                            onClick={this.postTestMessage}>make test post request</button>

                    <br></br>

                    <button className='welcome-message-btn' 
                            onClick={this.getTestRequestWithPathVariableMessage}>make test get request with path variable</button>


                    <br></br>

                    <button className='welcome-message-btn' 
                            onClick={this.returnError}>return error</button>
                    
                </div>
            
            
            </div>
        );
    }
}

export default WelcomeComponent;