import { api, LightningElement, track } from 'lwc';
import submitScoreAction from '@salesforce/apex/CreateAppointmentDemandController.submitScoreAction';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';
//import {NavigationMixin} from 'lightning/navigation';


export default class CreateAppointmentDemand extends NavigationMixin (LightningElement) {

    @track scoreObName;
    @track scoreObjEmail;
    @track scoreObjPhone;
    @track scoreObjCity;
    @track scoreObjBirthdate;
   // @track scoreObjGender;
    @track scoreRecoreId;
    @track errorMsg;

   scoreHandleChange(event){
        if(event.target.name == 'scoreName'){
        this.scoreObName = event.target.value;  
        //window.console.log('scoreObName ##' + this.scoreObName);
        }
      if(event.target.name == 'scoreEmail'){
        this.scoreObjEmail = event.target.value;  
      }

      if(event.target.name == 'scorePhone'){
        this.scoreObjPhone = event.target.value;  
      }
      if(event.target.name == 'scoreCity'){
        this.scoreObjCity = event.target.value;  
      }
      if(event.target.name == 'scoreBirthdate'){
        this.scoreObjBirthdate = event.target.value;  
      }
    

 }

 submitAction(){
    submitScoreAction({cardName:this.scoreObName,cardEmail:this.scoreObjEmail,cardPhone:this.scoreObjPhone,cardCity:this.scoreObjCity,cardBirthdate:this.scoreObjBirthdate})
    .then(result=>{
        this.scoreRecoreId = result.Id;
        window.console.log('scoreRecoreId##Vijay2 ' + this.scoreRecoreId);       
        const toastEvent = new ShowToastEvent({
            title:'Success!',
            message:'Record created successfully',
            variant:'success'
          });
          this.dispatchEvent(toastEvent);

          /*Start Navigation*/
   
         /*End Navigation*/

    })
    .catch(error =>{
       this.errorMsg=error.message;
       window.console.log(this.error);
    });

 }
}