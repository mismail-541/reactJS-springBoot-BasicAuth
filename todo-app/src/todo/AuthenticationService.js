import axios from 'axios';

class AuthenticationService {

    executeBasicAuthenticationService(username,password){

        let basicAuthheader = this.createBasicAuthToken(username,password);

        return axios.get('http://localhost:9090/todo-app/basicAuth',
            {
                headers: {authorization: basicAuthheader}
            }
        );
    }

    createBasicAuthToken(username,password) {
        
        let basicAuthHeader = 'Basic ' + window.btoa(username+":"+password)
        
        return basicAuthHeader;
    }

    registerSuccessfulLogin(username,password){
        sessionStorage.setItem('authenticatedUser',username);

        
        this.setupAxiosInterceptors(this.createBasicAuthToken(username,password))
    }

    logout(){
        console.log('logging out....')
        sessionStorage.removeItem('authenticatedUser');
    }

    isUserLoggedIn(){
        let user = sessionStorage.getItem('authenticatedUser');

        if(user===null){
            return false;
        }
        else{
            return true;
        }
    }

    getLoggedInUserName(){
        let user = sessionStorage.getItem('authenticatedUser');

        if(user===null){
            return '';
        }
        else{
            return user;
        }
    }



    //Setting up the interceptors for Axios requests/responses
    setupAxiosInterceptors(basicAuthHeader){       


        axios.interceptors.request.use(
            (config) =>{
                if(this.isUserLoggedIn()){
                 config.headers.authorization = basicAuthHeader   
                }
                return config
            }
        )
    }

}

export default new AuthenticationService()