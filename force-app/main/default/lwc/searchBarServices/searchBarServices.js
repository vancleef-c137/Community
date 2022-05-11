import { LightningElement,wire,track,api } from 'lwc';

import getProductData from '@salesforce/apex/ServiceController.getProductRecordMethod';
export default class SearchBarServices extends LightningElement {

    @api accName;

    @track productRecord;

    @track error;

    handleChange(event){

        const userInput = event.target.value;

        this.accName= userInput;

    }

 

    @wire(getProductData,{ accNameParamInApex: '$accName'}) 

    productsData({ error, data }) {

        if (data) {

            //console.log('RecordId is'+recordId);

            this.productRecord = data;

            this.error = undefined;

        } else if (error) {

            //console.log('Error block');

            this.error = error;

            this.productRecord = undefined;

        }

    }

}