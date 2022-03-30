import { LightningElement,wire, track } from 'lwc';
import { getObjectInfo } from 'lightning/uiObjectInfoApi';
import { getPicklistValues } from 'lightning/uiObjectInfoApi';
import PRODUCT from '@salesforce/schema/Product2';
import BRAND from '@salesforce/schema/Product2.Brand__c';
import COLOR from '@salesforce/schema/Product2.Color__c';

export default class GetPicklistValuesOfField extends LightningElement {

    @track value ='';
    @track selectedModel = '';
    @track color
    @wire(getObjectInfo, { objectApiName: PRODUCT })

    productData;

    @wire(getPicklistValues,
        {
            recordTypeId: '$productData.data.defaultRecordTypeId', 
            fieldApiName: BRAND
        }
    )

    brandPicklist;

    @wire(getPicklistValues,
        {
            recordTypeId: '$productData.data.defaultRecordTypeId', 
            fieldApiName: COLOR
        }
    )

    colorPicklist;
    handleChange(event) {

        this.value = event.detail.value;

    }

    colorChange(event) {

        this.color = event.detail.value;

    }

    changeModel(event){
        this.selectedModel = event.target.value
        console.log(this.selectedModel);
    }
    handleOnClick(){
        this.template.querySelector("c-data-table").getCars();
    }
}