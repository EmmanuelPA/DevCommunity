import { LightningElement, api, track } from 'lwc';
import uploadFile from '@salesforce/apex/productCreationHandler.uploadFile'
export default class ModalLWC extends LightningElement {
    isModalOpen = false;
    @api chosenRecord;
    @api pick;
    @api colors;
    fileData;
    active = false;
    @track model;
    @track brand;
    @track color;
    @track price;
    errorCheck;
    errorMessage;
    successMessage;
    successCheck;
    closeModal(){
        this.isModalOpen = false;

    }
    @api
    openModal(){
        this.isModalOpen = true;
    }
    get acceptedFormats() {
        return ['.jpg', '.png'];
    }
    get model(){
        return this.chosenRecord.Name;
    }
    
    openfileUpload(event) {
        const file = event.target.files[0]
        var reader = new FileReader()
        reader.onload = () => {
            var base64 = reader.result.split(',')[1]
            this.fileData = {
                'filename': file.name,
                'base64': base64,
                'recordId': '01t8c00000LxZYNAA3'
            }
        }
        reader.readAsDataURL(file)
    }
    
    handleClick(){

        if(this.brand != null && this.model != null && this.color != null && this.price != null && this.fileData != null){
             var product = {
                id: '01t8c00000LxZYNAA3',
                model: this.model,
                brand: this.brand,
                price: this.price,
                color: this.color,
                active: this.active,
            }; 
            const {base64, filename, recordId} = this.fileData
            var jsonProduct = JSON.stringify(product);
            uploadFile({product: jsonProduct, base64, filename, recordId }).then(result=>{
                this.fileData = null;
                this.successMessage = `${filename} uploaded successfully!!`;
                this.successCheck = true;
                window.setInterval(() => {
                    this.successCheck = false;
                    this.closeModal();
                    this.restartVariables();
                    this.refreshParent();
                }, 6000)
            })
        } else{
            this.errorCheck = true;
            this.errorMessage = 'Fill in te required fields, please.';
            window.setInterval(() => {
                this.errorCheck = false;
            }, 6000)
        }
    }
    restartVariables(){
        this.active = false;
        this.model = '';
        this.brand = '';
        this.color = '';
        this.price = '';
    }

    handleChange(event){
        if(event.target.label == 'Model'){
            this.model = event.target.value;
            console.log(this.model);
        } else if(event.target.label == 'Brand'){
            this.brand = event.target.value;
            console.log(event.target.value);
        } else if(event.target.label == 'Color'){
            this.color = event.target.value;
            console.log(event.target.value);
        }else if(event.target.label == 'Price'){
            this.price = event.target.value;
            console.log(event.target.value);
        }else if(event.target.label == 'Active'){
            this.active = event.target.checked
            console.log(this.active);
        }
    }
    refreshParent(event){
        console.log('child');
        let ev = new CustomEvent('refreshlwc');
            this.dispatchEvent(ev);                    
    }
    
}