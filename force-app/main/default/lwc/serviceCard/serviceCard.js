import { LightningElement, wire, track } from 'lwc';
import GetServiceById from "@salesforce/apex/SerivceDataController.GetServiceById";
import getServiceReviews from "@salesforce/apex/SerivceDataController.getServiceReviews";
import { CurrentPageReference } from 'lightning/navigation';
import { getRecord, getFieldValue } from "lightning/uiRecordApi";
import Id from '@salesforce/user/Id';
import NAME_FIELD from '@salesforce/schema/User.Name';
import EMAIL_FIELD from '@salesforce/schema/User.Email';
const fields = [NAME_FIELD, EMAIL_FIELD];

export default class ServiceCard extends LightningElement {



    userId = Id;
    @wire(getRecord, { recordId: '$userId', fields })
    user;
    get name() {
        return getFieldValue(this.user.data, NAME_FIELD);
    }
    get email() {
        return getFieldValue(this.user.data, EMAIL_FIELD)
    }
    


    @track serviceId = "";

    @wire(CurrentPageReference)
    pageReference({ state }) {
        if (state && state.blogId) {
            this.serviceId = state.blogId;

        }
    }

    // this._blogId
    Producto
    @wire(GetServiceById, { ProductId: '$serviceId' }) SingleService({ data, error }) {
        if (data) {
            this.Producto = data;
            
            console.log(data);
            console.log("data");
        } else if (error) {
            console.log(error);
            console.log("error");
            console.log(serviceId);
        }



    };


    @wire(getServiceReviews,{ProductId: '$serviceId'})Review







}