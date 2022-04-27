import { LightningElement } from 'lwc';
import {loadStyle, loadScript} from 'lightning/platformResourceLoader';
import bootstrapcss from'@salesforce/resourceUrl/bootstrapcss';
export default class Footer2 extends LightningElement {
    renderedCallback(){
        Promise.all([
            loadStyle(this, bootstrapcss)
        ]).then(()=> {
            console.log("css loaded");
        }).catch(error =>{
            console.log("error");
        })
       
    }
}