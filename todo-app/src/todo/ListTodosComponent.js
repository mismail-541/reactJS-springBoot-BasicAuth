import React, { Component } from 'react';

//import Material Table:
import MaterialTable from 'material-table';

import './todos.css';
import HeaderComponent from './outline-components/HeaderComponent.js';

import TodosService from './api/todo/TodosService.js';

import AuthenticationService from './AuthenticationService.js';


class ListTodosComponent extends Component {


    constructor(props){
        super(props);

        this.state = {
            todos: [],
            userName:'',
            message:''
        }
    }

    componentDidMount(){
        
        const userName = AuthenticationService.getLoggedInUserName();
        console.log('component did mount! list todos component!!!!!>',userName);        

        this.refreshTodos(userName);
    }

    refreshTodos = (userName) =>{
        TodosService.getAllTodos(userName)
        .then(response => this.handleAllTodosSuccess(response))
        .catch(error => console.log(error))
    }

    handleAllTodosSuccess = (response) =>{

        console.log('inside handleAllTodosSuccess()');

        this.setState(Object.assign({},[],{todos:response.data}));

        console.log('state is=',this.state);
    }

    addNewTodoItem = () =>{
        console.log('adding new to-do item >');

        

        const userName = this.props.match.params.name

        TodosService.addNewTodo({
            description:'some description 1',
            done:false,
            targetDate:'2020-06-21',
            user:userName
        })
        .then(data => console.log('successfully added new to-do!'))
        .catch(error => console.log('error occured while adding new to-do :('))


        this.props.history.push('/add-todo/user')
    }

    addTodoItem = ()=>{

        const userName = this.props.match.params.name

        this.props.history.push(`/add-todo/${userName}/`)
    }

    updateTodoItem = (rowData) =>{
        console.log(`updating todo-item with user= ${rowData.user} and id=${rowData.id}`)

        this.props.history.push(`/update-todo/user/${rowData.id}`)
    }

    deleteTodoItem = (rowData) =>{
        console.log(`deleting todo-item with user= ${rowData.user} and id=${rowData.id}`)
        const userName = AuthenticationService.getLoggedInUserName();
       
        TodosService.deleteTodo(rowData)
            .then( response =>{
                this.setState(Object.assign(this.state,{message:'delete is successful'}));        
                this.refreshTodos(userName);
            }                
            );
    }


    render() {
        
        
        
        const todosLocal = this.state.todos;
       

        return (
            <div>

                <div className='component-front'>
                    <HeaderComponent/>
                </div>               
                
                <div className='component-back'>   
                 
                    <div className='todos-table-container'>                                
                    
                        

                        <MaterialTable title="Multiple Actions Preview"
                            columns={[
                                { title: 'User Id', field: 'id' },
                                { title: 'Description', field: 'description' },
                                { title: 'Is Completed', field: 'done'},
                                { title: 'Target Date', field: 'targetDate'
                                },
                            ]}
                            data={todosLocal}      
                            actions={[
                                {
                                    icon: 'delete',
                                    tooltip: 'delete user',
                                    onClick: (event, rowData) => {
                                        console.log('rowData:',rowData)
                                        this.deleteTodoItem(rowData);
                                        
                                    }
                                },
                                {
                                    icon: 'edit',
                                    tooltip: 'edit user',
                                    onClick: (event, rowData) => {
                                        console.log('rowData:',rowData)
                                        this.updateTodoItem(rowData);
                                    }
                                }
                            ]}
                            />
                    </div>

                    <div>
                            <button className='todo-add-new-btn' onClick={this.addTodoItem}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="white">
                                <path d="M24 10h-10v-10h-4v10h-10v4h10v10h4v-10h10z"/></svg>
                            </button>
                    </div>
                
                </div>
                
            </div>
        );
    }
}

export default ListTodosComponent;