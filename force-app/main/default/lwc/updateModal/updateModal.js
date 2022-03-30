import {
    LightningElement,
    api,
    track
} from 'lwc';
import updateRecord from '@salesforce/apex/productCreationHandler.updateRecord'
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
    closeModal() {
        this.isModalOpen = false;
        this.restartVariables();

    }
    @api
    openModal() {
        this.isModalOpen = true;
        
    }
    renderedCallback(){
        if(this.chosenRecord && this.isModalOpen){
            this.model = this.chosenRecord.Name;
            this.brand = this.chosenRecord.Brand__c;
            this.price = this.chosenRecord.Price__c;
            this.color = this.chosenRecord.Color__c;
            this.active = this.chosenRecord.Has_Promotion__c;
            console.log(this.model);
            console.log(this.brand);
            console.log(this.color);
        }
    }
    get acceptedFormats() {
        return ['.jpg', '.png'];
    }
    get model() {
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
                'recordId': this.chosenRecord.Id
            }
        }
        reader.readAsDataURL(file)
    }

    handleClick() {

        if (this.brand == null || this.model == null || this.color == null || this.price == null) {
            this.errorCheck = true;
            this.errorMessage = 'Fill in te required fields, please.';
            window.setInterval(() => {
                this.errorCheck = false;
            }, 6000)
        } else {
            var product = {
                id: this.chosenRecord.Id,
                model: this.model,
                brand: this.brand,
                price: this.price,
                color: this.color,
                active: this.active,
            };
            const { base64, filename, recordId } = this.fileData ? this.fileData : ['', '', ''];
            var jsonProduct = JSON.stringify(product);
            updateRecord({
                product: jsonProduct,
                base64,
                filename,
                recordId
            }).then(result => {
                this.fileData = null;
                this.successMessage = `Record updated successfully!!`;
                this.successCheck = true;
                var inter = window.setInterval(() => {
                    this.successCheck = false;
                    this.closeModal();
                    this.restartVariables();
                    this.refreshParent();
                    window.clearInterval(inter);
                }, 6000)
            })

        }
    }
    restartVariables() {
        this.active = false;
        this.model = '';
        this.brand = '';
        this.color = '';
        this.price = '';
    }

    handleChange(event) {
        if (event.target.label == 'Model') {
            this.model = event.target.value;
            console.log(this.model);
        } else if (event.target.label == 'Brand') {
            this.brand = event.target.value;
            console.log(event.target.value);
        } else if (event.target.label == 'Color') {
            this.color = event.target.value;
            console.log(event.target.value);
        } else if (event.target.label == 'Price') {
            this.price = event.target.value;
            console.log(event.target.value);
        } else if (event.target.label == 'Active') {
            this.active = event.target.checked
            console.log(this.active);
        }
    }
    refreshParent(event) {
        console.log('child');
        let ev = new CustomEvent('refreshlwc');
        this.dispatchEvent(ev);
    }

}