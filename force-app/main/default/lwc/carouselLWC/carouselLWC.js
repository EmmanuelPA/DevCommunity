import {LightningElement, track, wire, api} from 'lwc';
import getProductList1 from '@salesforce/apex/carouselController.getProductList';
import { refreshApex } from '@salesforce/apex';
import { NavigationMixin } from 'lightning/navigation';
const CARD_VISIBLE_CLASSES = 'fade slds-show'
const CARD_HIDDEN_CLASSES = 'fade slds-hide'
const DOT_VISIBLE_CLASSES = 'dot active'
const DOT_HIDDEN_CLASSES = 'dot'

const DEFAULT_SLIDER_TIMER = 6000 // 3 second
export default class CarouselLWC extends NavigationMixin(LightningElement) {
    @track slides = []
    @track wiredList = [];
    productList = [];
    error;
    @api buttonRedirectPageAPIName;
    slideIndex = 1
    timer
    slideTimer = DEFAULT_SLIDER_TIMER
    enableAutoScroll = true
    showFull = false
    validateManualPause = false;
    @wire(getProductList1)
    wiredProducts(result) {
        this.wiredList = result;
        if (result.data) {
            console.log(screen.width);
            result.data.forEach(element => {
                var dataF = [{
                    image: element.ContentId__c,
                    heading: element.Name,
                    description: element.Brand__c,
                    price: element.Price__c,
                    color: element.Color__c
                }]

                console.log('this is data' + dataF)
                this.productList.push(dataF);
            });

            this.slidesData1();


        } else if (result.error) {

            this.error = result.error;
        }
    }
    connectedCallback(){
        this.refreshView();
    }
    renderedCallback(){
        this.refreshView();
    }
    refreshView(){
        this.productList = [];
        refreshApex(this.wiredList);
    }
    get slidesData() {
        return this.slides
    }

    slidesData1() {
        this.slides = this.productList.map((item, index) => {
            var colors = 'background:' + item[0].color;
            return index === 0 ? {
                heading: item[0].heading,
                image: item[0].image,
                description: item[0].description,
                price: item[0].price,
                color: colors,
                slideIndex: index + 1,
                cardClasses: CARD_VISIBLE_CLASSES,
                dotClases: DOT_VISIBLE_CLASSES
            } : {
                heading: item[0].heading,
                image: item[0].image,
                description: item[0].description,
                price: item[0].price,
                color: colors,
                slideIndex: index + 1,
                cardClasses: CARD_HIDDEN_CLASSES,
                dotClases: DOT_HIDDEN_CLASSES
            }
        })
        console.log(this.slides)
    }
    connectedCallback() {
        if (this.enableAutoScroll) {
            this.timer = window.setInterval(() => {
                this.slideSelectionHandler(this.slideIndex + 1)
            }, Number(this.slideTimer))
        }

    }

    disconnectedCallback() {
        if (this.enableAutoScroll) {
            window.clearInterval(this.timer)
        }
    }
    currentSlide(event) {
        let slideIndex = Number(event.target.dataset.id)
        this.slideSelectionHandler(slideIndex)
    }
    backSlide() {
        let slideIndex = this.slideIndex - 1
        this.slideSelectionHandler(slideIndex)
    }
    forwardSlide() {
        let slideIndex = this.slideIndex + 1
        this.slideSelectionHandler(slideIndex)
    }

    slideSelectionHandler(id) {
        if (id > this.slides.length) {
            this.slideIndex = 1
        } else if (id < 1) {
            this.slideIndex = this.slides.length
        } else {
            this.slideIndex = id
        }
        this.slides = this.slides.map(item => {
            return this.slideIndex === item.slideIndex ? {
                ...item,
                cardClasses: CARD_VISIBLE_CLASSES,
                dotClases: DOT_VISIBLE_CLASSES
            } : {
                ...item,
                cardClasses: CARD_HIDDEN_CLASSES,
                dotClases: DOT_HIDDEN_CLASSES
            }
        })
    }
    handleClick() {
        this[NavigationMixin.Navigate]({
            type: 'comm__namedPage',
            attributes: {
                name: this.buttonRedirectPageAPIName
            }
        });
    }
    stopAutoScroll() {
        console.log('stop');
        this.enableAutoScroll = false;
        window.clearInterval(this.timer)
    }
    startAutoCroll() {
        this.enableAutoScroll = true;
        console.log('start');
        if (this.enableAutoScroll && !this.validateManualPause) {
            this.timer = window.setInterval(() => {
                this.slideSelectionHandler(this.slideIndex + 1)
            }, Number(this.slideTimer))

        }
    }
    autoPlayControl() {
        if (this.enableAutoScroll) {
            if (this.enableAutoScroll) {
                window.clearInterval(this.timer)
                this.enableAutoScroll = false;
                this.validateManualPause = true;
                console.log(this.enableAutoScroll);
            }
        } else {
            this.timer = window.setInterval(() => {
                this.slideSelectionHandler(this.slideIndex + 1)
            }, Number(this.slideTimer))
            this.enableAutoScroll = true;
            this.validateManualPause = false;
            console.log(this.enableAutoScroll);

        }
    }
}