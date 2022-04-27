import { LightningElement, wire, track } from 'lwc';
import { CurrentPageReference } from 'lightning/navigation';
import getCategoryServices from "@salesforce/apex/SerivceDataController.getCategoryServices";




export default class SingleCategory extends LightningElement {


    @track catId = "";

    @wire(CurrentPageReference)
    pageReference({ state }) {
        if (state && state.categoryId) {
            this.catId = state.categoryId;
console.log(state.categoryId);
console.log("IID ?. ?? ?");
console.log(this.catId);
        }
    }
    Services
    @wire(getCategoryServices,{CategoryId: '$catId'})SingleService({ data, error }) {
        if (data) {
            this.Services = data;
            
            console.log(data);
            console.log("data");
        } else if (error) {
            console.log(error);
            console.log("error");

        }

    }


}