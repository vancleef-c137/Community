import { LightningElement } from 'lwc';
import { loadStyle, loadScript } from 'lightning/platformResourceLoader';
import bootstrapcss from '@salesforce/resourceUrl/bootstrapcss';



export default class HIW4 extends LightningElement {







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