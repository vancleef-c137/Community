import { LightningElement, api, wire } from 'lwc';
import { loadStyle, loadScript } from 'lightning/platformResourceLoader';
import bootstrapcss from '@salesforce/resourceUrl/bootstrapcss';
import HeroHero from '@salesforce/resourceUrl/ServitiumHero';
import res from '@salesforce/resourceUrl/Responsive';
import fastset from '@salesforce/resourceUrl/FastSetup';
import userIcon from '@salesforce/resourceUrl/UserExperience';
import Reclamation from '@salesforce/resourceUrl/UserSupport';
import { NavigationMixin } from 'lightning/navigation';
import par1 from '@salesforce/resourceUrl/Partner1';
import par2 from '@salesforce/resourceUrl/Partner2';
import par3 from '@salesforce/resourceUrl/Partner3';
import par4 from '@salesforce/resourceUrl/Partner4';
import { getObjectInfo, getPicklistValuesByRecordType} from 'lightning/uiObjectInfoApi';
import { createRecord } from 'lightning/uiRecordApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

import CASE_OBJECT from '@salesforce/schema/Case';

import STATUS_FIELD from '@salesforce/schema/Case.Status';
import ORIGIN_FIELD from '@salesforce/schema/Case.Origin';
import PRIORITY_FIELD from '@salesforce/schema/Case.ContactId';



export default class HIW2 extends NavigationMixin(LightningElement)  {

    imgUrl=HeroHero;
    imgUrl1=fastset;
    imgUrl2=userIcon;
    imgUrl3=res;
    imgUrl4=Reclamation;
    partner1=par1;
    partner2=par2;
    partner3=par3;
    partner4=par4;
   ////////////////////////////////////////////////////////////////////
    subject;
    description;
    statusValue;
    originValue;
    priorityValue;

    pickValStatus;
    pickValOrigin;
    pickValPriority;

    @api recordId;
    @api objectApiName; 
    
    objectName; 
    @wire(getObjectInfo, { objectApiName: CASE_OBJECT })
    accountMetadata;

@wire(getPicklistValuesByRecordType, { 
        recordTypeId : '$accountMetadata.data.defaultRecordTypeId', 
        objectApiName : CASE_OBJECT
    }) 
    wiredRecordTypeInfo({data, error}) {
        if(data) {
            console.log(' getPicklistValuesByRecordType Info : ', data);
            this.pickValStatus = data.picklistFieldValues.Status.values;
            this.pickValOrigin = data.picklistFieldValues.Origin.values;
            this.pickValPriority = data.picklistFieldValues.Priority.values;
        }
        if(error) {
            console.log('Error Occurred : ', error);
        }
}

handleChange(event) {
    let name = event.target.name;
    let val = event.target.value;
    if(name === 'subject'){
        this.subject = val;
    } else if (name === 'description') {
        this.description = val;
        console.log(val);
        console.log("vaaaaaal");
    } else if (name === 'CaseStatus') {
        this.statusValue = val;
    } else if (name === 'CaseOrigin') {
        this.originValue = val;
    } else if (name === 'CasePriority') {
        this.priorityValue = val;
    } 
}

handleCreate() {
    console.log(this.accountMetadata);
    console.log('*** recordId *** ' + this.recordId);
    console.log('*** objectApiName *** ' + this.objectApiName);
    console.log('*** statusValue *** ' + this.statusValue);
    console.log('*** originValue *** ' + this.originValue);
           
    const fields = {};
    fields[STATUS_FIELD.fieldApiName] = this.statusValue;
    fields[ORIGIN_FIELD.fieldApiName] = this.originValue;
    fields[PRIORITY_FIELD.fieldApiName] = this.priorityValue;
    const caseRecord = {'apiName' : CASE_OBJECT.objectApiName, fields};
    
    createRecord(caseRecord)
        .then(result => {
            //const id = result.id;
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Success',
                    message: 'Case created: ' + result.id,
                    variant: 'success',
                }),
            );
        })
        .catch(error => {
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Error creating record',
                    message: error.body.message,
                    variant: 'error',
                }),
            );
        }) 
        console.log('*** end createRecord *** ');
}
/////////////////////////////////////////////////////////////////////////////////////////////
    renderedCallback() {
        Promise.all([
            loadStyle(this, bootstrapcss)
        ])
            .then(() => {
                console.log("All scripts and CSS are loaded. perform any initialization function.")
            })
            .catch(error => {
                console.log("failed to load the scripts");
            });
    }
    GetStarted() {
        this[NavigationMixin.Navigate]({
          type: "standard__webPage",
          attributes: {
              url: `/myservices/` 
              
          }
      },
      true
      );
      }



}