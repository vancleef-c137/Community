import { LightningElement, api, track, wire } from 'lwc';
// import NAME_FIELD from '@salesforce/schema/User.Name';
// const fields = [NAME_FIELD];

export default class ContactPopOver extends LightningElement {

    @track ranger;
    @track top = 50;
    @track left = 50;
    
    //userId = ranger;
    // @wire(getRecord, { recordId: '$userId', fields })
    // user;
    // get name() {
    //     return getFieldValue(this.user.data, NAME_FIELD);
    // }





    @api
    get myranger(){
        return this.ranger;
    }

    set myranger(value) {
        this.ranger = value;
    }

    @api
    get topmargin(){
        return this.top;
    }

    set topmargin(value) {
        this.top = value;
    }

    @api
    get leftmargin(){
        return this.left;
    }

    set leftmargin(value) {
        this.left = value;
    }

    get boxClass() { 
        return `background-color:white; top:${this.top - 280}px; left:${this.left}px`;
      }



}