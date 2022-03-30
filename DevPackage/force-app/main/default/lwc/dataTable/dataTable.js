import { LightningElement, api, track, wire } from 'lwc';
import getCars from '@salesforce/apex/tableController.getCars';
import changeStatus from '@salesforce/apex/tableController.changeStatus';
import isGuestUser from '@salesforce/user/isGuest';

export default class DataTable extends LightningElement {
    
    @api model = null;
    @api color = null;
    @api brand= null;
    @api pickVal;
    @api colors;
    @track tableInfo;
    errorMessage;
    errorCheck;
    guestUser = isGuestUser;
    @track chosenRecord;
    connectedCallback(){
        this.getCars();
    }

    @api
    getCars(){
        getCars({model: this.model, brand: this.brand, color: this.color}).then((result) => {
            this.tableInfo = result;
        }).catch((error) =>{
            this.errorCheck = true;
            this.errorMessage = error.body.message;
            window.setInterval(() => {
                this.errorCheck = false;
            }, 6000)
        })
    }
    getButtonData(event){
        var product = event.target.value;
        this.tableInfo.map((item) => {
            if(item.Id == product){
                this.chosenRecord = item;
            }
        });
        this.template.querySelector("c-modal-l-w-c").openModal();
    }
    changePromo(event){
        var ids = event.target.value;
        changeStatus({prodId:ids}).then(result =>{
            console.log(result);
            this.refreshView();
        }).catch(error => {
            this.errorCheck = true;
            this.errorMessage = error.body.message;
            window.setInterval(() => {
                this.errorCheck = false;
            }, 6000);
        })

    }
    refreshView(){
        console.log('parent');
        this.getCars();
    }

}