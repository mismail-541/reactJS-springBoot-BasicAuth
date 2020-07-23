import axios from 'axios';

class HelloWorldService {

    executeHelloWorldService(){
        console.log('HelloWorldService :: executeHelloWorldService()...')
        return axios.get('http://localhost:9090/todo-app/helloWorldSimple')
    }

    postNewHelloWorldMessage(message){

        console.log('making post request...');

        return axios.post('http://localhost:9090/todo-app/postHellowWorldSimple', {
            helloWorldRequest: message
          })
    }

    executeHelloWorldServicePathVariable(message){
        return axios.get(`http://localhost:9090/todo-app/helloWorldSimplePathVar/${message}`);
    }

    returnError(message){
        return axios.get('http://localhost:9090/todo-app/returnError');
    }

    
    
}

export default new HelloWorldService();