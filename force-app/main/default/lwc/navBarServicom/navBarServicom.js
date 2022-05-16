import { LightningElement } from 'lwc';
import Servicom from '@salesforce/resourceUrl/ServicomLogo';
import { NavigationMixin } from 'lightning/navigation';



export default class NavBarServicom extends NavigationMixin(LightningElement) {

    navbarItems =["Home","About Us","Profil",];
    logo=Servicom;


    GoToHome() {
        this[NavigationMixin.Navigate]({
          type: "standard__webPage",
          attributes: {
              url: `/` 
              
          }
      },
      true
      );
      }

      GoToProfile() {
        this[NavigationMixin.Navigate]({
          type: "standard__webPage",
          attributes: {
              url: `/myservices/` 
              
          }
      },
      true
      );
      }

      GoToAboutUs() {
        this[NavigationMixin.Navigate]({
          type: "standard__webPage",
          attributes: {
              url: `/myservices/` 
              
          }
      },
      true
      );
      }

      GoToMyServices() {
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