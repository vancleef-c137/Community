import { LightningElement, wire, api, track } from 'lwc';
import GetServiceById from '@salesforce/apex/SerivceDataController.GetServiceById';
import {
   subscribe,
   unsubscribe,
   APPLICATION_SCOPE,
   MessageContext,
} from 'lightning/messageService';
import RECORD_SELECTED_CHANNEL from '@salesforce/messageChannel/Record_Selected__c';


export default class ServiceDetail extends LightningElement {
   subscription = null;
   recordId;
//@track clickedServiceId;
_productidwala = '01t8d000000GKZ1AAO';

//_service;

   // serviceId = "01t8d000000GKZ1AAO";
   //GetServiceById,  { ProductId: '01t8d000000GKThAAO' }
   @api
    get myclickedServiceId(){
      console.log("lenne");
      console.log(clickedServiceId);
        return this.clickedServiceId;
    }

    set myclickedServiceId(value) {
        this.clickedServiceId = value;
        //this._service = GetServiceById(clickedServiceId);
        console.log("lenne");
        console.log(clickedServiceId);
    }

   
@wire(GetServiceById,  { ProductId: '$recordId' }) 
_service;

@wire(MessageContext)
    messageContext;


connectedCallback(){this.subscribeMC();}
subscribeMC(){
   if(this.subscription !== null) {
      return this.subscription;
   }
   this.subscription = subscribe(this.messageContext, RECORD_SELECTED_CHANNEL, (message)=> {
      console.log('Subscriber message' + JSON.stringify(message));
      this.recordId = message.recordId;
   });
}




   //  // Encapsulate logic for Lightning message service subscribe and unsubsubscribe
   //  subscribeToMessageChannel() {
   //      if (!this.subscription) {
   //          this.subscription = subscribe(
   //              this.messageContext,
   //              RECORD_SELECTED_CHANNEL,
   //              (message) => this.handleMessage(message),
              
   //          );
   //      }
   //  }

   // //  unsubscribeToMessageChannel() {
   // //      unsubscribe(this.subscription);
   // //      this.subscription = null;
   // //  }

   //  // Handler for message received by component
   //  handleMessage(message) {
   //      this.recordId = message.recordId;
   //  }

   //  // Standard lifecycle hooks used to subscribe and unsubsubscribe to the message channel
   //  connectedCallback() {
   //      this.subscribeToMessageChannel();
   //  }

   // //  disconnectedCallback() {
   // //      this.unsubscribeToMessageChannel();
   // //  }





}