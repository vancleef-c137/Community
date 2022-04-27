import { LightningElement } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import homeimg from '@salesforce/resourceUrl/homeimg';


export default class HIW1 extends NavigationMixin(LightningElement) {

    imgUrl= homeimg;
    _productidwala = '01t8d000000GKZ1AAO 01t8d000000GKZ1AAO';
    ///opportunityclick

    navigateToWebsite() {

        this[NavigationMixin.Navigate]({
            type: "standard__webPage",
            attributes: {
                url: `http://localhost:3000/`
            }
        },
        true
        );
    }


    navigateToWebPage() {
       

    
      this[NavigationMixin.Navigate]({
        type: "standard__webPage",
        attributes: {
            url: `/opportunityclick/?blogId=${this._productidwala}`
        }
    },
    true
    );
    }


    navigateToServices() {

        this[NavigationMixin.Navigate]({
            type: 'comm__namedPage',
            attributes: {
                name: 'Contact_Support'
            }
        },
        true
        );
    }



}