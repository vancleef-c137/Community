import { LightningElement, wire, api, track } from "lwc";
import getServices from "@salesforce/apex/SerivceDataController.getServices";
import getRelatedServices from "@salesforce/apex/SerivceDataController.getRelatedServices";
import getRelatedPriceBook from "@salesforce/apex/SerivceDataController.getRelatedPriceBook";
import GetServiceBySubscription from "@salesforce/apex/SerivceDataController.GetServiceBySubscription";
import { NavigationMixin } from 'lightning/navigation';
import shorten from '@salesforce/resourceUrl/shorten';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { loadScript } from 'lightning/platformResourceLoader';
import {publish, MessageContext} from 'lightning/messageService';
import RECORD_SELECTED_CHANNEL from '@salesforce/messageChannel/Record_Selected__c';



export default class Service extends NavigationMixin(LightningElement) {

@wire(getServices) Services;

@wire(getRelatedServices) RelatedServices({ error, data }) {
  console.log(data);
  console.log("lennarelated");
  this.results = data;
  this.error = error;
}
@wire(getRelatedPriceBook) RelatedPriceBooks;  



@wire(GetServiceBySubscription) SubscriptionServices;


@wire(MessageContext)
messageContext;

@track clickedServiceId;

@api service;

@api serviceId='';

showId(event){
  console.log('000'+event.target.dataset.id);
  serviceId = event.target.dataset.id;

}



handleServiceSelect(event) {
  this[NavigationMixin.Navigate]({
    type: "standard__webPage",
    attributes: {
        url: `/singleservice/?blogId=${event.target.dataset.id}` 
        
    }
},
true
);
}

handleProviderSelect(event){
   var defination ={
    componentDef:"c:navigationLwcTarget",
    attributes: {
      recordId: event.target.dataset.id,
    }
   }
  this[NavigationMixin.Navigate]({
    type:"standard__component",
    attributes:{ 
     componentName: "c__navigationLwcTarget"
     //+ btoa(JSON.stringify(defination))
    }
  })
  
}




handleNameSelect(event){
console.log(event.target.dataset.id);


var message ={recordId: event.target.dataset.id};
publish(this.messageContext,RECORD_SELECTED_CHANNEL ,message);

}


renderedCallback() {
  loadScript(this, shorten).then(() => {


const text = this.template.querySelector(".more");
console.log("text");
console.log(text);


  }).catch(error => {
    console.log("mamchetchi");
    console.log(error);
    this.dispatchEvent(
        new ShowToastEvent({
            title: 'Error loading Jquery',
            message: error,
            variant: 'error'
        })
    );
});
    
  
}
toggleText(){
  
}

}



 


  
