import { LightningElement,wire, track } from 'lwc';
import getCars from '@salesforce/apex/tableController.getCarModel';
export default class GetPicklistValuesOfField extends LightningElement {
    models = [];
    @track totalCost;
    @track downP = 0;
    @track value ='';
    @track termSelected;
    errorCheck;
    @wire(getCars)
    productData({error, data}){
        if(data){
            var cars = [];
            data.map(item =>{
                var lists = {
                    label: item.Name,
                    value: item.Name,
                    price: item.Price__c
                }
                cars.push(lists);
            })
            this.models = cars;
        } else if(error){
            console.log(error);
        }
    }
    get options() {
        return this.models;
    }

    handleChange(event) {
        this.models.forEach(element => {
            if(element.value == event.detail.value){
                this.totalCost = element.price;
            }
        });
        this.value = event.detail.value;

    }

    changeModel(event){
        this.downP = event.target.value
    }

    get termOptions() {
        return [
            { label: '6 months', value: '6' },
            { label: '12 months', value: '12' },
            { label: '24 months', value: '24' },
        ];
    }

    handleTerm(event) {
        this.termSelected = event.detail.value;
    }

    handleOnClick(){
        if(this.totalCost == null || this.downP == null || this.value == null || this.termSelected == null){
            this.errorCheck = true;
            window.setInterval(() => {
                this.errorCheck = null;
            }, 4000);
        }else{
            this.errorCheck = false;
            this.template.querySelector("c-simulator-table").calculateMonthlyPayment();
        }
    }
}