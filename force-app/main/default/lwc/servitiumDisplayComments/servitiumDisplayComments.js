import { LightningElement , wire, track} from 'lwc';
import getComments from '@salesforce/apex/SerivceDataController.getComments';
import { refreshApex } from '@salesforce/apex';

import insertCommentMethod from '@salesforce/apex/SerivceDataController.insertCommentMethod';
import { getRecord, getFieldValue } from 'lightning/uiRecordApi';
import NAME_FIELD from '@salesforce/schema/User.Name';
import USER_ID from '@salesforce/user/Id'; 
import {ShowToastEvent} from 'lightning/platformShowToastEvent';
export default class ServitiumDisplayComments extends LightningElement {


    @wire(getComments) wiredComments;

 
    @track error;


    @track commentid;
    @track error;    
    @track getCommentRecord={
        Name:''
           
      
              
    };   

    @track error ;
    @track name;
    @wire(getRecord, {
        recordId: USER_ID,
        fields: [NAME_FIELD]
    }) wireuser({
        error,
        data
    }) {
        if (error) {
           this.error = error ; 
        } else if (data) {
            this.name = data.fields.Name.value;
        }
    }
    nameInpChange(event){
       this.getCommentRecord.Name = event.target.value;
       console.log("NAME INPUT CHANGE");
       console.log(this.getCommentRecord.Name);
    
       //window.console.log(this.getAccountRecord.Name);
            //window.console.log(this.getCommentRecord.username);
     }
      saveCommentAction(){
        console.log('gggggg');
        console.log(this.getCommentRecord.Name);
        console.log(this.name);
        insertCommentMethod({username:this.name,name:this.getCommentRecord.Name})
        .then(result=>{
     //     window.console.log(this.createComment);
         //   this.getCommentRecord={};
            this.commentid=result.Id;
            window.console.log('after save' + this.commentid);
            
            const toastEvent = new ShowToastEvent({
              title:'Success!',
              message:'Comment created successfully',
              variant:'success'
            });
            this.dispatchEvent(toastEvent);

                eval("$A.get('e.force:refreshView').fire();");
            
        })
        .catch(error=>{
           this.error=error.message;
           const toastEvent = new ShowToastEvent({
            title:'error!',
            message:error.message,
            variant:'success'
          });
          this.dispatchEvent(toastEvent);
           //window.console.log(this.error);
        });
      }






}