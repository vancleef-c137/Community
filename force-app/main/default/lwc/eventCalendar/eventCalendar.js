import { LightningElement, wire, api, track } from "lwc";
import { loadScript, loadStyle } from 'lightning/platformResourceLoader';
import FullCalendarJS from '@salesforce/resourceUrl/FullCalendarJS';
import getOppo from '@salesforce/apex/SerivceDataController.getOppo';
import getContactId from "@salesforce/apex/SerivceDataController.getContactId";
import heySfLogo from '@salesforce/resourceUrl/ServitiumLogo';
import Id from '@salesforce/user/Id';

export default class EventCalendar extends LightningElement {

    @track returnedOppo = [] ;
    @track finalOppo = [] ;
    SfLogo = heySfLogo ;

    ididid="";
    userId = Id;

    @wire(getContactId, {userId : '$userId'})loggedinid({error,data}) {
        if (data) {
            this.ididid = data;
            console.log("1");
            console.log(data);
        } else if (error) {
            this.error = error;
            console.log("erreur1")
            console.log(JSON.stringify(error));
        }
    
    }
    renderedCallback() {
      Promise.all([
        loadScript(this, FullCalendarJS + '/FullCalendarJS/jquery.min.js'),
        loadScript(this, FullCalendarJS + '/FullCalendarJS/moment.min.js'),
        loadScript(this, FullCalendarJS + '/FullCalendarJS/fullcalendar.min.js'),
        loadStyle(this, FullCalendarJS + '/FullCalendarJS/fullcalendar.min.css'),
        // loadStyle(this, FullCalendarJS + '/fullcalendar.print.min.css')
      ])
      .then(() => {
        // Initialise the calendar configuration
        this.getTasks();
      })
      .catch(error => {
        // eslint-disable-next-line no-console
        console.error({
          message: 'Not Loading FullCalendarJS',
          error
        });
      })
    }
    initialiseFullCalendarJs() {
      var str = window.location.href;
      var pos = str.indexOf(".com/");
      var last = pos + 4;
      var tDomain = str.slice(0,last);
      for(var i = 0 ; i < this.returnedOppo.length ; i++)
      {
          console.log("ICI OPP WEDRACHNOWA ");
          console.log(tDomain);
          console.log("END OPP WEDRACHNOWA");
        this.finalOppo.push({
          start : this.returnedOppo[i].EndDate__c,
          title : this.returnedOppo[i].Name,
          url : tDomain+'/TheFrontCommunity/s/singleservice/?blogId='+this.returnedOppo[i].Product2Id__c
      });
      }
      const ele = this.template.querySelector('div.fullcalendarjs');
      // eslint-disable-next-line no-undef
      $(ele).fullCalendar({
        header: {
            left: 'prev,next today',
            center: 'title',
            right: 'month,basicWeek,basicDay'
        },
       // defaultDate: '2020-03-12',
        defaultDate: new Date(), // default day is today
        navLinks: true, // can click day/week names to navigate views
        editable: true,
        eventLimit: true, // allow "more" link when too many events
        events : this.finalOppo
      });
    }
    getTasks(){
      getOppo()
          .then(result =>{   
             this.returnedOppo = JSON.parse(result);
              this.initialiseFullCalendarJs();
              this.error = undefined;
              console.log("result");
              console.log(result);
          })
          .catch(error => {
              this.error = error;
              this.outputResult = undefined;
          });
    }




















}