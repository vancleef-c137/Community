import { LightningElement, wire, track } from 'lwc';
import GetServiceById from "@salesforce/apex/SerivceDataController.GetServiceById";
import getServiceReviews from "@salesforce/apex/SerivceDataController.getServiceReviews";
import { CurrentPageReference } from 'lightning/navigation';
import { loadStyle, loadScript } from 'lightning/platformResourceLoader';
import bootstrapcss from '@salesforce/resourceUrl/bootstrapcss';
import Swiper from '@salesforce/resourceUrl/SwiperCSS';
import Swiperscript from '@salesforce/resourceUrl/SwiperJS';
import photo from '@salesforce/resourceUrl/CircleLogo';

export default class SingleServicePage extends LightningElement {
    imgUrl= photo;

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


    @track serviceId = "01t8d000000GNKkAAO";

    @wire(CurrentPageReference)
    pageReference({ state }) {
        if (state && state.blogId) {
          //  this.serviceId = state.blogId;
            console.log(state.blogId);
            console.log("HEHI HEHI ID LAHNE HEEEEHI");
        }
    }
    Producto
    @wire(GetServiceById, { ProductId: '$serviceId' }) SingleService({ data, error }) {
        if (data) {
            this.Producto = data;
            
            console.log(data);
            console.log("data");
        } else if (error) {
            console.log(error);
            console.log("error");
            console.log(serviceId);
        }



    };


    @wire(getServiceReviews,{ProductId: '$serviceId'})Review












}