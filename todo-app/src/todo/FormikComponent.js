import React, { Component } from 'react';
import './formikStyle.css';
import {Link,BrowserRouter, Route} from 'react-router-dom';
import {Redirect} from 'react-router';

import { Formik } from 'formik';
import * as Yup from 'yup';
import TodosService from './api/todo/TodosService';

import HeaderComponent from './outline-components/HeaderComponent.js';
import TodoAlert from './TodoAlert';

import moment from 'moment';
import { FormControlLabel} from "@material-ui/core";
import Checkbox from '@material-ui/core/Checkbox';
import { green } from '@material-ui/core/colors';
import { withStyles } from '@material-ui/core/styles';

class FormikComponent extends Component {

    constructor(props){
        super(props);

        this.state = {
            firstName: '',
              lastName: '',
              email: '',

              
              todoItem:{
                id:'',
                description:'',
                targetDate: '',
                done:false
              },
              todoSubmitStatus:'',
              operationType:''
        }
    }

    printFormikEntireState = () =>{
        console.log('*********** Formik Entire State = ',this.state)
    }

    handleTodoItemRetreive = (todoItem) =>{
        console.log('inside handleTodoItemRetreive()',todoItem)

        this.setState(
            Object.assign({},this.state,{todoItem:todoItem})
        )
    }


    submitTodoItem = (todoItem) =>{
        
        const {username,todoId} = this.props.parameterSent;

        if(this.state.operationType === 'add'){
            TodosService.addNewTodo({
                description:todoItem.todoDescription,
                done:todoItem.todoDone,
                targetDate:todoItem.todoTargetDate,
                user:username.username
            }).then(data => this.setState({todoSubmitStatus:'true'})).catch(error => {console.log('XXXXXXXX error occured:',error);this.setState({todoSubmitStatus:'false'})});
        }
        else{
            TodosService.updateTodo({
                id:todoItem.todoId,
                description:todoItem.todoDescription,
                done:todoItem.todoDone,
                targetDate:todoItem.todoTargetDate,
                user:username.username
            }).then(data => this.setState({todoSubmitStatus:'true'})).catch(error => this.setState({todoSubmitStatus:'false'}));
        }

        console.log('@@@@@@@@@@@@@@ todoSubmitStatus = ',this.state.todoSubmitStatus)
        
    }
    

    componentDidMount(){

        const {username,todoId} = this.props.parameterSent;
        
        console.log('username from props:',username)
        console.log('todoId from props:',todoId)

        this.setState({
            username:username.username,
            todoId:todoId.todoId
        })
        console.log('####### 1111111 current state is:',this.state)

        if(todoId.todoId == null){
            console.log('todo id is undefined')
            this.setState(Object.assign({},this.state,{operationType:'add'}));
        }
        else{
            console.log('loading todo item')
            this.setState(Object.assign({},this.state,{operationType:'update'}));
            TodosService.getTodoItem(username.username,todoId.todoId)
            .then(data => {this.handleTodoItemRetreive(data.data)})
            .catch(error => console.log('error happened:',error))
        }

        console.log('####### 2222222 current state is:',this.state)
        

        
    }

    handleCancel = () =>{
        console.log('cancel is clicked...')
    }

    handleTodoDone = () =>{
        console.log('inside handleTodoDone()...')

        
    }

    initializeTodoDone = () =>{
        return true;
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

          
    }

    onFormFieldChange = () => {
        console.log('inside onFormFieldChange()...')
    }

    
    render(){

        const GreenCheckbox = withStyles({
            root: {
              color: green[400],
              '&$checked': {
                color: green[600],
              },
            },
            checked: {},
          })((props) => <Checkbox color="default" {...props} />);

        // redirecting back to list todo components.
        if (this.state.redirect) {
            return <Redirect push to="/todos/user/" />;
        }

        console.log('current state:',this.state)

        const {id, description, done, targetDate} = this.state.todoItem;

        console.log('id component:',id)

        return(
            <div>
                <div className='component-front'>
                    <HeaderComponent/>
                </div>               
                
                <div className='component-back'>
                <div className='formik-form-main'>
                <Formik
                        enableReinitialize ={true}
                        initialValues= {{
                        todoId: id,
                        todoDescription:description,
                        todoDone: done,
                        todoTargetDate:moment(targetDate).format('YYYY-MM-DD')
                        }}
                    validationSchema={ Yup.object({
                        todoDescription: Yup.string()
                        .max(60, 'Must be 30 characters or less')
                        .required('Required'),
                        todoDone: Yup.string()
                        .max(5, 'Must be 5 characters or less')
                        .required('Required'),
                        todoTargetDate: Yup.string()
                        .required('Required'),
                    })}
              onSubmit={(values, { setSubmitting }) => {
                setTimeout(() => {
                
                console.log('Formik form submitted with values=',values);

                this.submitTodoItem(values);                

                //this.setState({redirect: true});

                setSubmitting(false);
                }, 400);
            }}
          >

            {formik => (
            <form onSubmit={formik.handleSubmit} className='formik-form-container'>
                
                <div className='formik-form-row'>
                    <input
                        id="todoDescription"
                        name="todoDescription"
                        type="text"
                        className='formik-form-input-text'
                        {...formik.getFieldProps('todoDescription')}
                        placeholder='Todo Description'
                    />
                    {formik.touched.todoDescription && formik.errors.todoDescription ? (
                        <div>{formik.errors.todoDescription}</div>
                    ) : null}
                </div>

                <div className='formik-form-row'>

                <FormControlLabel
                        control={<GreenCheckbox checked={done} onChange={this.handleCheckboxChange} name="done" />}
                        label="Complete"
                    />
                {/**<input
                        type="checkbox"
                        checked={this.initializeTodoDone} />
                    <input
                        id="todoDone"
                        name="todoDone"
                        type="checkbox"
                        checked={this.initializeTodoDone}
                        className='formik-form-input-text'
                        {...formik.getFieldProps('todoDone')}
                        placeholder='Todo Done'
                    />
                   
                    {formik.touched.todoDone && formik.errors.todoDone ? (
                        <div>{formik.errors.todoDone}</div>
                    ) : null} */}
                
                </div>

                <div className='formik-date-field'>
                    <input
                        id="todoTargetDate"
                        name="todoTargetDate"
                        type="date"
                        className='formik-form-input-text'
                        {...formik.getFieldProps('todoTargetDate')}
                        placeholder='Todo Target Date'
                    />
                    {formik.touched.todoTargetDate && formik.errors.todoTargetDate ? (
                        <div>{formik.errors.todoTargetDate}</div>
                    ) : null}
                </div>                
                
                <div></div>
                <div>
                <Link  className='formik-form-cancel-btn' to='/todos/user/' onClick={this.handleCancel}>
                    
                    <span>Cancel</span>
                </Link> 
                <span>   </span>
                    <button type="submit" className='formik-form-submit-btn'>Submit</button>
                </div>
                
            </form>
            )}
            </Formik>
            </div>

            <TodoAlert todoSubmitStatus={this.state.todoSubmitStatus}/>
                </div>
                {/**<button onClick={this.printFormikEntireState}>Print Formik State</button>*/}
            </div>

            
            
        );
    }
}


export default FormikComponent;