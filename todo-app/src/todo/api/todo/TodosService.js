import axios from 'axios';

class TodosService {

    getAllTodos (userName){

        return axios.get(`http://localhost:9090/todo-app/todos/${userName}`)
    }

    getTodoItem (username,todoId){
        return axios.get(`http://localhost:9090/todo-app/update-todo/${username}/${todoId}`)
    }

    addNewTodo(newTodo){

        console.log('adding new to-do item:',newTodo); 

        return axios.post('http://localhost:9090/todo-app/add-todo',{
            "description":newTodo.description,
            "done":newTodo.done,
            "targetDate":newTodo.targetDate,
            "user":newTodo.user
        })
    }

    updateTodo(updatedTodo){
        console.log('updating todo:',updatedTodo);

        return axios.post('http://localhost:9090/todo-app/update-todo',{
            "id":updatedTodo.id,
            "description":updatedTodo.description,
            "done":updatedTodo.done,
            "targetDate":updatedTodo.targetDate,
            "user":updatedTodo.user
        })
    }

    deleteTodo(deleteTodo){
        console.log('updating todo:',deleteTodo);
        return axios.post(`http://localhost:9090/todo-app/delete-todo/${deleteTodo.id}`,{})
    }
}

export default new TodosService();