import { LightningElement } from 'lwc';
import web from '@salesforce/label/c.Web';
import webtolead from '@salesforce/label/c.webtolead';
export default class AppointmentForm extends LightningElement {
    webPage = web;
    webtoleadUrl = webtolead;

}