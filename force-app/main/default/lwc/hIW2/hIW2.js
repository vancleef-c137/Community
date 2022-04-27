import { LightningElement } from 'lwc';
import { loadStyle, loadScript } from 'lightning/platformResourceLoader';
import bootstrapcss from '@salesforce/resourceUrl/bootstrapcss';
import dwer from '@salesforce/resourceUrl/Circles';
import res from '@salesforce/resourceUrl/Responsive';
import fastset from '@salesforce/resourceUrl/FastSetup';
import userIcon from '@salesforce/resourceUrl/UserExperience';
import Reclamation from '@salesforce/resourceUrl/UserSupport';
import homeimg from '@salesforce/resourceUrl/homeimg';


export default class HIW2 extends LightningElement {

    imgUrl= homeimg;
    imgUrl1=fastset;
    imgUrl2=userIcon;
    imgUrl3=res;
    imgUrl4=Reclamation;


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