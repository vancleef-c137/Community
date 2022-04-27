import { LightningElement, wire} from 'lwc';
import getCategories from '@salesforce/apex/SerivceDataController.getCategories';
import { NavigationMixin } from 'lightning/navigation';

export default class AllCategories extends NavigationMixin(LightningElement) {

    @wire(getCategories) wiredCategories;
    services;
    
          handleCategorySelect(event){
              console.log("click");
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


