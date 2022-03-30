import { LightningElement, track } from 'lwc';
import doLogin from '@salesforce/apex/CommunityAuthController.doLogin';


export default class LoginComponent extends LightningElement {


    username;
    password;
    @track errorCheck;
    @track errorMessage;

    connectedCallback(){

        var meta = document.createElement("meta");
        meta.setAttribute("name", "viewport");
        meta.setAttribute("content", "width=device-width, initial-scale=1.0");
        document.getElementsByTagName('head')[0].appendChild(meta);
    }
    renderedCallback(){

        var meta = document.createElement("meta");
        meta.setAttribute("name", "viewport");
        meta.setAttribute("content", "width=device-width, initial-scale=1.0");
        document.getElementsByTagName('head')[0].appendChild(meta);
    }

    handleUserNameChange(event){

        this.username = event.target.value;
    }

    handlePasswordChange(event){
        
        this.password = event.target.value;
    }

    handleLogin(event){

       if(this.username && this.password){

        event.preventDefault();
        console.log('in');
        doLogin({ username: this.username, password: this.password })
            .then((result) => {
                console.log(result);
                let hiddenElement = document.createElement('a');
                hiddenElement.href = result;
                hiddenElement.click();
                //window.location.href = result;
            })
            .catch((error) => {
                this.error = error;      
                this.errorCheck = true;
                this.errorMessage = error.body.message;
            });

        }

    }
}