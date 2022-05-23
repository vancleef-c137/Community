import { LightningElement, wire, track } from 'lwc';
import GetServiceById from "@salesforce/apex/SerivceDataController.GetServiceById";
import getServiceReviews from "@salesforce/apex/SerivceDataController.getServiceReviews";
import getCurrentDate from '@salesforce/apex/SerivceDataController.getCurrentDate';
import getContactId from '@salesforce/apex/SerivceDataController.getContactId';
import getStartDate from '@salesforce/apex/SerivceDataController.getStartDate';
import getEndDate from '@salesforce/apex/SerivceDataController.getEndDate';
import { CurrentPageReference } from 'lightning/navigation';
import { loadStyle, loadScript } from 'lightning/platformResourceLoader';
import bootstrapcss from '@salesforce/resourceUrl/bootstrapcss';
import Swiper from '@salesforce/resourceUrl/SwiperCSS';
import Swiperscript from '@salesforce/resourceUrl/SwiperJS';
import photo from '@salesforce/resourceUrl/CircleLogo';
import Id from '@salesforce/user/Id';

export default class SingleServicePage extends LightningElement {
    imgUrl= photo;
    imgUrl1 = "";
    imgUrl2 = "";
    imgUrl3 = "";
    @track data;
    OtherImages="";
    currentDate="";
    endDate;
    startDate;
	error;
	userId = Id;
    serviceActive = false;
    serviceInactive = false; 
    contactid = "";

    renderedCallback() {
        Promise.all([
            loadStyle(this, bootstrapcss),
            loadStyle(this, Swiper),
            loadScript(this, Swiperscript)
        ])
            .then(() => {
                console.log("All scripts and CSS are loaded. perform any initialization function.")
            })
            .catch(error => {
                console.log("failed to load the scripts");
            });
    }


    @track serviceId = "";

    @wire(CurrentPageReference)
    pageReference({ state }) {
        if (state && state.blogId) {
            this.serviceId = state.blogId;
            console.log(state.blogId);
            console.log("HEHI HEHI ID LAHNE HEEEEHI");
        }
    }
    Producto
    @wire(GetServiceById, { ProductId: '$serviceId' }) SingleService({ data, error }) {
        if (data) {
            this.Producto = data;
            
            console.log(data[0].otherImagesLinks__c);
            this.OtherImages=data[0].otherImagesLinks__c;
            var splitted = this.OtherImages.split(';');
            console.log(splitted[0]);
            this.imgUrl1 = splitted[0];
            console.log(splitted[1]);
            this.imgUrl2 = splitted[1];

            console.log(splitted[2]);
            this.imgUrl3 = splitted[2];

            console.log("🚀")
        } else if (error) {
            console.log(error);
            console.log("error");
            console.log(serviceId);
        }



    };


    // var str= "12344A56789";
    // var splitted = str.split('4A'); //this will output ["1234", "56789"]
    // var first = splitted[0]; //"1234"
    // var second = splitted[1]; //"56789"
    // console.log('First is: ' + first + ', and second is: ' + second);





    @wire(getServiceReviews,{ProductId: '$serviceId'})Review


    @wire(getCurrentDate)wiredDate({
        error,
        data
    }) {
        if (data) {
            this.currentDate = data;
            console.log("current date");
            console.log(data);
        } else if (error) {
            this.error = error;
            console.log("erreur1")
            console.log(JSON.stringify(error));
        }
    }

    @wire(getContactId, {userId : '$userId'})wiredContact({
        error,
        data
    }) {
        if (data) {
            this.contactid = data;
            console.log("wired contact");
            console.log(data);
        } else if (error) {
            this.error = error;
            console.log("erreur1")
            console.log(JSON.stringify(error));
        }
    }

    @wire(getStartDate, {productId : '$serviceId', contactId : '$contactid'})wiredStartDate({
        error,
        data
    }) {
        if (data) {
            this.startDate = data;
            console.log("wired startDate");
            console.log(data);
        } else if (error) {
            this.error = error;
            console.log("erreur wired contact")
            console.log(JSON.stringify(error));
        }
    }

    @wire(getEndDate, {productId : '$serviceId', contactId : '$contactid'})wiredEndDate({
        error,
        data
    }) {
        if (data) {
            this.endDate = data;
            console.log("wired endDate");
            console.log(data);
        } else if (error) {
            this.error = error;
            console.log("erreur wired contact")
            console.log(JSON.stringify(error));
        }
    }

    renderedCallback(){
        this.isActive();
        this.isInactive();
    }

    get boolActive (){
        return (this.serviceActive);     
    }

    get boolInactive(){
        return (this.serviceInactive);
    }

    isActive() {
       if(this.startDate <= this.currentDate){
        if(this.currentDate < this.endDate){
            this.serviceActive = true;
        }
       }     
    }

    isInactive(){
        if(this.currentDate < this.startDate)
            this.serviceInactive = true;
    }













}