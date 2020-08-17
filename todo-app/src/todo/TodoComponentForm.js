import React, { Component } from 'react';
import TodosService from './api/todo/TodosService.js';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { withStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
  } from '@material-ui/pickers';

import DateFnsUtils from '@date-io/date-fns';
import {Link,BrowserRouter, Route} from 'react-router-dom';

import './todos.css';


class TodoComponentForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username:'',
            todoId:'',
            todoItem:{},
        }

    }

    
    componentDidMount() {

        const {username,todoId} = this.props;

        
        console.log('username from props:',username)
        console.log('todoId from props:',todoId)

        this.setState({
            username:username,
            todoId:todoId
        })

        TodosService.getTodoItem(username,todoId)
        .then(data => {this.handleTodoItemRetreive(data.data)})
        .catch(error => console.log('error happened:',error))

    }


    handleTodoItemRetreive = (todoItem) =>{
        console.log('inside handleTodoItemRetreive()',todoItem)

        this.setState(
            Object.assign({},this.state,{todoItem:todoItem})
        )

        console.log('##### state is now:',this.state)
    }

    
    // Handle checkbox change event:
    handleCheckboxChange = () =>{

        let currentTodoItem = this.state.todoItem;

        let newTodoDone = false;
        
        if(this.state.todoItem.done === true){
            newTodoDone = false 
        }
        else{
            newTodoDone = true;
        }

        const todoItem = {
            id:currentTodoItem.id,
            description:currentTodoItem.description,
            targetDate: currentTodoItem.targetDate,
            done:newTodoDone
        }

        console.log('######## checkbox state object',todoItem)

        this.setState(
            Object.assign({},this.state,{todoItem})
        );        
    }

    // Handle date change:
    handleDateChange = (event) => {
        console.log('handleDateChange...event',event)

        let currentTodoItem = this.state.todoItem;

        const todoItem = {
            id:currentTodoItem.id,
            description:currentTodoItem.description,
            targetDate: event,
            done:currentTodoItem.done
        }

        this.setState(
            Object.assign({},this.state,{todoItem})
        ); 
    }

    // Handle input field change:
    handleInputTextChange = (event) => {
        console.log('handleInputTextChange...event',event.target.value)

        let currentTodoItem = this.state.todoItem;

        const todoItem = {
            id:currentTodoItem.id,
            description:event.target.value,
            targetDate: currentTodoItem.targetDate,
            done:currentTodoItem.done
        }

        this.setState(
            Object.assign({},this.state,{todoItem})
        );
    }

    handleCancel = () =>{
        console.log('cancel is clicked...')
    }
    

    printState = () => {
        console.log('######### Current State = ',this.state)
    }

    submitTodoItemForUpdate = () =>{

        const updatedTodoItem = this.state.todoItem;
        console.log('updating todo item:',updatedTodoItem)

        TodosService.updateTodo({
            id:updatedTodoItem.id,
            description:updatedTodoItem.description,
            done:updatedTodoItem.done,
            targetDate:updatedTodoItem.targetDate,
            user:this.state.username
        }).then(data => console.log('success'));
    }

    render() {        

        const GreenCheckbox = withStyles({
            root: {
              color: green[400],
              '&$checked': {
                color: green[600],
              },
            },
            checked: {},
          })((props) => <Checkbox color="default" {...props} />);

          

        const {id,description,done,targetDate} = this.state.todoItem;

        const test = true;

        return (
            <div>                
                
                <form className='todo-form-container'>
                <h1>To-do Item for user: {this.state.username}</h1>
                    <TextField label="id" type="text"  value={id} disabled/>
                    
                    <TextField label="Description"  
                               value={description} 
                               defaultValue={description} 
                               onChange={this.handleInputTextChange}
                               inputProps={description}
                               />
                    
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                            margin="normal"
                            id="date-picker-dialog"
                            label="Date picker dialog"
                            format="MM/dd/yyyy"
                            value={targetDate}
                            onChange={this.handleDateChange}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                        />
                    </MuiPickersUtilsProvider>

                    <FormControlLabel
                        control={<GreenCheckbox checked={done} onChange={this.handleCheckboxChange} name="done" />}
                        label="Complete"
                    />

                <div>
                    <Link  className='todo-form-cancel-btn' to='/todos/user/' onClick={this.handleCancel}>Cancel</Link> 
                    
                    <span>   </span>
                    
                    <button type="submit" className='todo-form-submit-btn' onClick={this.submitTodoItemForUpdate}>Submit</button>
                </div>

                </form>

               
                
            </div>
        );
    }
}


export default TodoComponentForm;