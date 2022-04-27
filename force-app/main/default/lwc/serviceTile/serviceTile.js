import { LightningElement, api, wire } from 'lwc';
import { getRecord, getFieldValue } from 'lightning/uiRecordApi';
import { getObjectInfo, } from "lightning/uiObjectInfoApi";
import getServices from "@salesforce/apex/SerivceDataController.getServices";
import getServiceId from "@salesforce/apex/SerivceDataController.getServiceId";
import SERVICENAME_FIELD from '@salesforce/schema/Service__c.Name';
import getServicess from "@salesforce/apex/SerivceDataController.getServicess"
import SERVICE_OBJECT from '@salesforce/schema/Service__c';
const fields = [];



export default class ServiceTile extends LightningElement {

   _allServices;
   error;
   connectedCallback() {
    this.loadServices();
}
loadServices() {
    getServicess()
        .then(result => {
            this._allServices = result;
        })
        .catch(error => {
            this.error = error;
        });
}



}