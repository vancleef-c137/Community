import { LightningElement, wire, api } from "lwc";

import { getRecord, getFieldValue } from "lightning/uiRecordApi";
import getServices from "@salesforce/apex/SerivceDataController.getServices";

import Id from '@salesforce/user/Id';
import NAME_FIELD from '@salesforce/schema/User.Name';
import EMAIL_FIELD from '@salesforce/schema/User.Email';
const fields = [NAME_FIELD, EMAIL_FIELD];

export default class Services extends LightningElement {



    userId = Id;
    @wire(getRecord, { recordId: '$userId', fields })
    user;
    get name() {
        return getFieldValue(this.user.data, NAME_FIELD);
    }
    get email() {
        return getFieldValue(this.user.data, EMAIL_FIELD)
    }
    


    // handleContactSelect(event) {
    //     //const payload = { recordId: event.target.service.Id };
       
    //     //publish(this.messageContext, RECORD_SELECTED_CHANNEL, payload);
    // }
    
  
}