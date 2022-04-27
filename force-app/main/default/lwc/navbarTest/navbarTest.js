import { LightningElement } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';

export default class Navbar extends NavigationMixin (LightningElement)  {



    myFunction() {
        var x = document.getElementById("myTopnav");
        if (x.className === "topnav") {
          x.className += " responsive";
        } else {
          x.className = "topnav";
        }
    }

    
    
    GoLogIn(){
     
      
      this[NavigationMixin.GenerateUrl]({

"type": "standard__webPage",       
"attributes": {
  url: "/ServitumCommuity/s/logincustom"
},

      }).then((generatedUrl)=>{
          window.open(generatedUrl,'_top');
      });
  }

  GoProfil(){
     
      
    this[NavigationMixin.GenerateUrl]({

"type": "standard__webPage",       
"attributes": {
url: "/ServitumCommuity/s/profil"

},
    }).then((generatedUrl)=>{
        window.open(generatedUrl,'_top');
    });
}
GoHome(){
     
      
  this[NavigationMixin.GenerateUrl]({

"type": "standard__webPage",       
"attributes": {
url: "/ServitumCommuity/s/"

},
  }).then((generatedUrl)=>{
      window.open(generatedUrl,'_top');
  });
}
GoEmployee(){
     
      
  this[NavigationMixin.GenerateUrl]({

"type": "standard__webPage",       
"attributes": {
url: "/ServitumCommuity/s/employee"

},
  }).then((generatedUrl)=>{
      window.open(generatedUrl,'_top');
  });
}
GoFeedbacks(){
     
      
  this[NavigationMixin.GenerateUrl]({

"type": "standard__webPage",       
"attributes": {
url: "/ServitumCommuity/s/feedbacks"

},
  }).then((generatedUrl)=>{
      window.open(generatedUrl,'_top');
  });
}
GoAboutUs(){
     
      
  this[NavigationMixin.GenerateUrl]({

"type": "standard__webPage",       
"attributes": {
url: "/ServitumCommuity/s/aboutus"

},
  }).then((generatedUrl)=>{
      window.open(generatedUrl,'_top');
  });
}
GoServices(){
     
      
  this[NavigationMixin.GenerateUrl]({

"type": "standard__webPage",       
"attributes": {
url: "/ServitumCommuity/s/myservices"

},
  }).then((generatedUrl)=>{
      window.open(generatedUrl,'_top');
  });
}

}