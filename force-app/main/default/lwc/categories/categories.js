import { LightningElement, wire} from 'lwc';
import getCategories from '@salesforce/apex/ServiceController.getCategories';
import basePath from '@salesforce/community/basePath';
import { NavigationMixin } from 'lightning/navigation';


export default class Categories extends NavigationMixin(LightningElement) {
     @wire(getCategories) wiredCategories;
services;



      handleCategorySelect(event){

        this[NavigationMixin.Navigate]({

            type: "standard__webPage",

            attributes: {

                url: `/singlecategory/?categoryId=${event.target.dataset.id}`

               

            }

        },

        );

        console.log(event.target.dataset.id);

      }
}