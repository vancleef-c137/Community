import { LightningElement, wire} from 'lwc';
import logo from '@salesforce/resourceUrl/ServitiumLogo';
import { NavigationMixin } from 'lightning/navigation';
import Id from '@salesforce/user/Id';
import PROFILE_NAME_FIELD from '@salesforce/schema/User.Profile.Name';
import { getRecord, getFieldValue } from 'lightning/uiRecordApi';
export default class ServitiumNavbar1 extends NavigationMixin(LightningElement) {
    logoSite = logo;
    userId = Id;
    employee = false;
    commercial = false;
    //profil = "";
    gohome(){
        this[NavigationMixin.Navigate]({
                    type: 'comm__namedPage',
                   attributes: {
                        pageName: 'Home'
                   }
        });
    }

    goprofile(){
        this[NavigationMixin.Navigate]({
                    type: 'comm__namedPage',
                   attributes: {
                        pageName: 'Profile__c'
                   }
        });
    }

    goservices(){
        this[NavigationMixin.Navigate]({
                    type: 'comm__namedPage',
                   attributes: {
                        pageName: 'Services__c'
                   }
        });
    }

    goemployees(){
        this[NavigationMixin.Navigate]({
                    type: 'comm__namedPage',
                   attributes: {
                        pageName: 'Employees__c'
                   }
        });
    }

    goaboutus(){
        this[NavigationMixin.Navigate]({
                    type: 'comm__namedPage',
                   attributes: {
                        pageName: 'Aboutus__c'
                   }
        });
    }
    gosignin(){
        this[NavigationMixin.Navigate]({
                    type: 'comm__namedPage',
                   attributes: {
                        pageName: 'CustomLogin__c'
                   }
        });
    }
    gologout(){
        this[NavigationMixin.Navigate]({
                    type: 'comm__namedPage',
                   attributes: {
                        pageName: 'CustomLogin__c'
                   }
        });
    }
    @wire(getRecord,{
        recordId: "$userId",
        fields: [
            PROFILE_NAME_FIELD
        ]
    }) userProfile;

    connectedCallback(){
        console.log(this.userProfile);
        console.log("employee");
        this.isEmployee();
        this.isCommercial();
    }
    get boolEmployee (){
        return (this.employee);     
    }
    get boolCommercial(){
        return (this.commercial);
    }
    isEmployee() {
        //profil = getFieldValue(this.userProfile.data, PROFILE_NAME_FIELD); 
        if(getFieldValue(this.userProfile.data, PROFILE_NAME_FIELD) == "SalarieServitiumProfile")
            this.employee = true;
    }
    isCommercial(){
        //profil = getFieldValue(this.userProfile.data, PROFILE_NAME_FIELD); 
        if(getFieldValue(this.userProfile.data, PROFILE_NAME_FIELD) == "AdminServitiumProfile")
            this.commercial = true;
    }
}