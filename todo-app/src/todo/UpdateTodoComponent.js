import React, { Component } from 'react';

import TodosService from './api/todo/TodosService.js';

class UpdateTodoComponent extends Component {

    render() {

        const userName = this.props.match.params.name

        const todoId =  this.props.match.params.todoId;

        console.log('username =',userName);
        console.log('todoId for update=',todoId)

        TodosService.updateTodo({
            "id":"8",
            "description":"Learn Spring Cloud 4",
            "done":"true",
            "targetDate":"2020-06-23",
            "user":"user"
        })

        return (
            <div>Update to-do component</div>
        );
    }
}

export default UpdateTodoComponent;