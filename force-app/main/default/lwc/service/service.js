import { LightningElement, wire, api, track } from "lwc";
import getServices from "@salesforce/apex/SerivceDataController.getServices";
import getRelatedServices from "@salesforce/apex/SerivceDataController.getRelatedServices";
import getRelatedPriceBook from "@salesforce/apex/SerivceDataController.getRelatedPriceBook";
import GetServiceBySubscription from "@salesforce/apex/SerivceDataController.GetServiceBySubscription";
import GetSubscriptionDetails from "@salesforce/apex/SerivceDataController.getSubscriptionDetails";
import getContactId from "@salesforce/apex/SerivceDataController.getContactId";
import { NavigationMixin } from 'lightning/navigation';
import shorten from '@salesforce/resourceUrl/shorten';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { loadStyle, loadScript } from 'lightning/platformResourceLoader';
import AddToCalendar from '@salesforce/resourceUrl/AddToCalendar'
import Id from '@salesforce/user/Id';
import {publish, MessageContext} from 'lightning/messageService';
import RECORD_SELECTED_CHANNEL from '@salesforce/messageChannel/Record_Selected__c';



export default class Service extends NavigationMixin(LightningElement) {
  ididid="";
  userId = Id;



  renderedCallback() {
    Promise.all([
      loadScript(this, AddToCalendar + '/add-to-calendar-button-main/assets/js/atcb.min.js'),
      loadStyle(this, AddToCalendar + '/add-to-calendar-button-main/assets/css/atcb.min.css'),
      // loadStyle(this, FullCalendarJS + '/fullcalendar.print.min.css')
    ])
    .then(() => {
      console.log("c bon jawek behi")
      
      // Initialise the calendar configuration
   
    })
    .catch(error => {
      // eslint-disable-next-line no-console
      console.error({
        message: 'Not Loading FullCalendarJS',
        error
      });
    })
  }



  @wire(getContactId, {userId : '$userId'})loggedinid({error,data}) {
    if (data) {
        this.ididid = data;
        console.log("1");
        console.log(data);
    } else if (error) {
        this.error = error;
        console.log("erreur1")
        console.log(JSON.stringify(error));
    }

}


  @wire(GetServiceBySubscription, {ContactId : '$ididid'}) SubscriptionServices;
//, {ContactId : '$ididid'}
  @wire(GetSubscriptionDetails, {ContactId : '$ididid'}) AllSubscriptions;
//, {ContactId : '$ididid'} 
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


// renderedCallback() {
//   loadScript(this, shorten).then(() => {


// const text = this.template.querySelector(".more");
// console.log("text");
// console.log(text);


//   }).catch(error => {
//     console.log("mamchetchi");
//     console.log(error);
//     this.dispatchEvent(
//         new ShowToastEvent({
//             title: 'Error loading Jquery',
//             message: error,
//             variant: 'error'
//         })
//     );
// });
    
  
//}
toggleText(){
  
}

}