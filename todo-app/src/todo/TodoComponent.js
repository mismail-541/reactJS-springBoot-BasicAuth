import React, { Component } from 'react';
import TodoComponentForm from './TodoComponentForm.js';
import HeaderComponent from './outline-components/HeaderComponent.js';
import FormikComponent from './FormikComponent.js'

class TodoComponent extends Component {

    constructor(props){
        super(props);

        this.state = {

        }
    }

    render() {

        // Fetch the username from the URL as path variable:
        const username = this.props.match.params.name;

        // Fetch the todoId from the URL as path variable:
        const todoId =  this.props.match.params.todoId;

        console.log('username =',username);
        console.log('todoId for update=',todoId);

        

        return (
            <div>

                <div className='component-front'>
                    <HeaderComponent/>
                </div>               
                
                <div className='component-back'>
                
                {/*<TodoComponentForm username={username} 
                                   todoId={todoId} />*/}
                <FormikComponent parameterSent={{
                    firstName:'Mohammad',
                    lastName:'Ismail',
                    email:'mismail6059@gmail.com',
                    username:{username},
                    todoId:{todoId}
                }}></FormikComponent>
                </div>
            </div>
        );
    }
}

export default TodoComponent;