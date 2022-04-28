import { LightningElement } from 'lwc';
import { loadStyle, loadScript } from 'lightning/platformResourceLoader';
import bootstrapcss from '@salesforce/resourceUrl/bootstrapcss';
import HeroHero from '@salesforce/resourceUrl/ServitiumHero';
import res from '@salesforce/resourceUrl/Responsive';
import fastset from '@salesforce/resourceUrl/FastSetup';
import userIcon from '@salesforce/resourceUrl/UserExperience';
import Reclamation from '@salesforce/resourceUrl/UserSupport';
import par1 from '@salesforce/resourceUrl/Partner1';
import par2 from '@salesforce/resourceUrl/Partner2';
import par3 from '@salesforce/resourceUrl/Partner3';
import par4 from '@salesforce/resourceUrl/Partner4';



export default class HIW2 extends LightningElement {

    imgUrl=HeroHero;
    imgUrl1=fastset;
    imgUrl2=userIcon;
    imgUrl3=res;
    imgUrl4=Reclamation;
    partner1=par1;
    partner2=par2;
    partner3=par3;
    partner4=par4;


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



}