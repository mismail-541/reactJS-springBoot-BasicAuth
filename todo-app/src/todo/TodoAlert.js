import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Alert, AlertTitle } from '@material-ui/lab';
import {Link,BrowserRouter, Route} from 'react-router-dom';
import './todos.css';


class TodoAlert extends Component {

    constructor(props){
        super(props);

        this.state = {}
    }

    render() {

        const todoSubmitStatus = this.props.todoSubmitStatus;

          console.log('%%%%%%%%%% TodoAlert :: todoSubmitStatus=',todoSubmitStatus);

          if(todoSubmitStatus === 'true'){
            console.log('%%%%%% TodoAlert :: success')

            return(
                <div>
                   <div className='todo-alert-box-success'>
                       <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="white">
                           <path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z"/>
                       </svg>
                       <span>To-do Item Submitted Successfully !</span>
                   </div>                
                </div>
             )
          }
          else if(todoSubmitStatus === 'false'){
            console.log('%%%%%% TodoAlert :: failure')

            return(
                <div>
                   <div className='todo-alert-box-failure'>
                   <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="white">
                        <path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"/>
                    </svg>
                       <span>Error occured while submitting To-do Item !</span>
                   </div>                
                </div>
             )
          }
          else{
            console.log('%%%%%% TodoAlert :: Idle')
              return(<div></div>)
          }

          
              
          
      
                
      
    }
}

export default TodoAlert;

