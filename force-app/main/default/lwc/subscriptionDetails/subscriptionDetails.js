import { LightningElement, wire, track } from 'lwc';
import getSubscriptionDetails from "@salesforce/apex/SerivceDataController.getSubscriptionDetails"

export default class SubscriptionDetails extends LightningElement {




    SubDetails
@wire(getSubscriptionDetails)SingleService({ data, error }) {
    if (data) {
        this.SubDetails = data;
        
        console.log(data);
        console.log("data");
    } else if (error) {
        console.log(error);
        console.log("error");
        console.log(serviceId);
    }



};




}