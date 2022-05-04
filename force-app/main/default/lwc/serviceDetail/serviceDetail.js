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

_productidwala = '01t8d000000GKZ1AAO';

   
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


}