import { LightningElement, wire, api, track} from 'lwc';

import getRelatedUsers from '@salesforce/apex/relatedUsersController.getRelatedUsers';

export default class RelatedUsers extends LightningElement {

@wire (getRelatedUsers) _user;



@track ranger;
	@track left;
	@track top;





showPopoverr(event){
    console.log(event.target.dataset.id);
    this.ranger = event.target.dataset.id;
    this.left = event.clientX;
    this.top=event.clientY;
}

hidePopoverr(event)
{	this.ranger = "";}
    
}