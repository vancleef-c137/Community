public with sharing class ServiceController {

    @AuraEnabled(Cacheable=true)
    public static Product2[] getAllServices() {
        return [
            SELECT
                Id,
                Family,
                Name,
                Description,
                Picture_URl__c
            FROM Product2
            WITH SECURITY_ENFORCED
            ORDER BY Name
            LIMIT 50
        ];
    }

    @AuraEnabled(Cacheable=true)
    public static Product2[] getAvailableServices(String contactid){
        List<serviceSubscription__c> productsIds = [Select Product2Id__c from serviceSubscription__c  where Contact__c =: contactid];
        List<Product2> products = new List<Product2>();
        for(Integer i = 0; i < productsIds.size(); i++){

           Id ProdIds =  productsIds.get(i).Product2Id__c;

            List<Product2> Product = [SELECT Id, Family, Name, Description,Picture_Url__c , IsActive FROM PRODUCT2 WHERE Id = :ProdIds];

            products.add(Product.get(0));

        }

       

        return products;
    }


    @AuraEnabled(Cacheable=true)
    public static List<User> getUserDetails(){
        return [SELECT Id, Name, Email FROM User];
    }

    @AuraEnabled(cacheable=true)
    public static list<contact> getContactListFunction(string searchKey) {
        string searchKeyword = '%' + searchKey + '%';
		
       // create contact list to store search result 
        list<contact> contactListRecord = new list<contact>();
     
	   // query contact records
        for(contact conObj : [Select id,Name,Email,FirstName,LastName,Phone
                            From Contact
                            WHERE name LIKE : searchKeyword]){
           contactListRecord.add(conObj);
        }
        
         if(contactListRecord.size() == 0){
            throw new AuraHandledException('No Record Found..'); 
         }
        return contactListRecord;
    }


    /*@AuraEnabled
    public static Clickedservice__c createClickedService(string serviceID, string userID){
        Clickedservice__c clickedServiceObj = new Clickedservice__c();
        clickedServiceObj.ClickedserviceId__c=serviceID;
        clickedServiceObj.UserId__c=userID;
        
        insert clickedServiceObj;
        return clickedServiceObj;
    }*/
@AuraEnabled(cacheable=true)



public static List<Product2> getAccountRecordMethod(String accNameParamInApex) {



    String accNameKey = '%'+accNameParamInApex+'%';



List<Product2> accList=[SELECT Id, Name,Family,Description ,picture_URL__c
    FROM Product2
        Where Name Like: accNameKey];
        return accList;
    }

    @AuraEnabled(Cacheable = true)
    public static list<Product2> retriveService(String strAccName) {
        strAccName = '%' + strAccName + '%';
        list<Product2> lstAccs = [SELECT  Id, Name, Family From Product2 WHERE Name LIKE :strAccName];

        if(lstAccs.isEmpty()) {
            throw new AuraHandledException('No Record Found..');
        }
        return lstAccs; 
    }
    
    /*@AuraEnabled(cacheable=true)
    public static Product2[] getDetailsService( String serviceId) {
        return [
            SELECT
                Family,
                Name,
                Description,
                Picture_URL__c
            FROM Product2
            WHERE Id = : serviceId
            LIMIT 1
            ];
    } */
    
    /*@AuraEnabled(cacheable=true)
    public static Clickedservice__c getLastServiceId( String userId) {
        return [
            SELECT 
                ClickedserviceId__c 
            FROM Clickedservice__c  
            WHERE UserId__c = : userId 
            ORDER BY Clickedservice__c.Name 
            DESC LIMIT 1
            ];
    } */

     @AuraEnabled(cacheable=true)
    public static Product2[] getDetailsService( String serviceId) {
        return [
            SELECT
                Family,
                Name,
                Description
            FROM Product2
            WHERE Id = : serviceId
            LIMIT 1
            ];
    }


    /*@AuraEnabled(cacheable=true)
    public static string doLogin(String username, String password){
        try {

            //String startUrl = System.currentPageReference().getParameters().get('startURL');
            String startUrl = System.Label.Community_Url;
            //String startUrl ='oursite-developer-edition.um8.force.com/TestcustomSite/';
            ApexPages.PageReference pageRef = Site.login(username, password, startUrl);

            if(pageRef != null) return pageRef.getUrl();

            throw new CalloutException();

            return null;


        } catch (Exception e) {
            system.debug('e.getMessagelogin+   '+e.getMessage());
            throw new AuraHandledException(e.getMessage());

            return null;
        }
    }*/


    @AuraEnabled(cacheable=true)
    public static List<Contact> getUserList(String accountId) {
        return [SELECT Id, FirstName,LastName, Phone, Email
            FROM Contact WHERE AccountId = : accountId];
    }
    @AuraEnabled(cacheable=true)
    public static List<Contact> retrieveContactData(string keySearch, String userId){
        List<User> users = [Select ContactId from User where Id =: userId];
        Id contactid = users.get(0).ContactId;
        List<Contact> contacts =  [Select AccountId from Contact where Id =: contactid];
        Id accountid = contacts.get(0).AccountId;      
        String contactName = '%' + keySearch + '%';
        List<Contact> contactList = [Select Id, FirstName, LastName, Email, Phone, Account.Name From Contact Where AccountId = : accountId and (FirstName Like:contactName or LastName Like:contactName or Phone Like:contactName or Account.Name Like:contactName)];
        return contactList;

    }
    @AuraEnabled(cacheable=true)
    public static String getContactId (String userId)
    {
        List<User> users = [Select ContactId from User where Id =: userId];
        Id contactid = users.get(0).ContactId;
        return contactid;
    }
    
    @AuraEnabled(cacheable=true)
    public static String getAccountId (String contactid)
    {
         List<Contact> contacts =  [Select AccountId from Contact where Id =: contactid];
         Id accountid = contacts.get(0).AccountId;
         return accountid;
    }
    @AuraEnabled
    public static void deleteContacts(list<Id> lstConIds){
        try {
            list<Contact> lstConsToDelete = new list<Contact>();
            System.debug('lstConIds ====> '+lstConIds);
            for(Id idCon : lstConIds) {
                lstConsToDelete.add(new Contact(Id = idCon));
            }
            if(!lstConsToDelete.isEmpty()) {
                delete lstConsToDelete;
            }
        }
        catch(Exception ex) {
            throw new AuraHandledException(ex.getMessage());
        }
    }

    @AuraEnabled(Cacheable = true)
    public static List<Contact> getContacts(){
        return [SELECT Id, FirstName,LastName, Phone, Email FROM Contact ORDER BY Name limit 10];
    }

      
        //custom lookup lwc
    @AuraEnabled(cacheable=true)
    public static List<Account> getCustomLookupAccount (String actName){
       List<Account> accLookupList =  new List<Account>();
       if(actName != ''){
           String accountName = '%' + actName + '%';
           accLookupList = [Select Id, Name  From Account Where Name like:accountName];
           return accLookupList;
       }
       return accLookupList;
    }   
    @AuraEnabled
    public static void enableLastCreatedContact() {
        List <Contact> LastCreatedContact = [ SELECT Id , FirstName , LastName, Email , Phone, account.Name FROM Contact ORDER BY Contact.Id DESC LIMIT 1];
        Id contactId = LastCreatedContact.get(0).Id;
        String contactFName = LastCreatedContact.get(0).FirstName;
        String contactLName = LastCreatedContact.get(0).LastName;
        String contactEmail = LastCreatedContact.get(0).Email;
        String contactPhone = LastCreatedContact.get(0).Phone;
        String contactAccoutName = LastCreatedContact.get(0).account.Name;
        Profile portalProfile = [SELECT Id FROM Profile WHERE Name='EmployeeProfil' Limit 1];
        User user1 = new User(
            UserName = contactEmail,
            FirstName = contactFName,
            LastName = contactLName,
            Alias = 'guest',
            email = contactEmail,
            ContactId = contactId,
            ProfileId = portalProfile.Id,
            EmailEncodingKey = 'UTF-8',
            CommunityNickname = contactFName+contactLName,
            TimeZoneSidKey = 'America/Los_Angeles',
            LocaleSidKey = 'en_US',
            LanguageLocaleKey = 'en_US'
        );
        insert(user1);
    }
    @AuraEnabled
    public static list<Account> csvFileRead(Id contentDocumentId){
        list<Account> accountInsertList = new list<Account>();
        if(contentDocumentId != null) {
            
            // Fetch File Data based on the basic of document id 
            ContentVersion contentVersionObj = [SELECT Id, VersionData FROM ContentVersion WHERE ContentDocumentId =:contentDocumentId];
            // split the file data
            list<String> csvRecordsList = contentVersionObj.VersionData.toString().split('\n');

            for(Integer i = 1; i < csvRecordsList.size(); i++){
                Account accountObj = new Account();
                list<String> csvRowData = csvRecordsList[i].split(',');
                System.debug('csvRowData====> '+csvRowData);
                accountObj.Name = csvRowData[0]; // accName
              //  accountObj.AccountSource = csvRowData[1];
                accountObj.Site = csvRowData[1];
                accountObj.Type = csvRowData[2];
                accountObj.Website = csvRowData[3];
                
                accountInsertList.add(accountObj);
            }

            try{    
                if(!accountInsertList.isEmpty()) {
                    insert accountInsertList;
                }
            }
            catch (Exception ex) {
                throw new AuraHandledException(ex.getMessage());
            } 
        }
        return accountInsertList;    
    }


    @AuraEnabled
    public static string doLogin(String username, String password){
        try {    

            
          //  String startUrl = System.Label.Community_Url;
          String startUrl = 'https://curious-unicorn-wolf-developer-edition.um8.force.com/ServitumCommuity/s/';
            ApexPages.PageReference pageRef = Site.login(username, password, startUrl);

            if(pageRef != null) return pageRef.getUrl();

           // throw new CalloutException();

           return null;


        } catch (Exception e) {
            system.debug('e.getMessagelogin+   '+e.getMessage());
          //  throw new AuraHandledException(e.getMessage());

            return null;
        }
    }


    @AuraEnabled
    public static boolean isEmailExist(String username){
        try {
            boolean a;
            List<User> userList = new List<User>();
            userList = [Select Id, Name From User Where Username = :username];

          //  throw new CalloutException();

            return ( !userList.isEmpty());


        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());

           // return null;
        }
    }

    @AuraEnabled(cacheable=true)
    public static List<Comment__c> getComments() {
     return [SELECT CreatedById, Name ,user2__c, LastModifiedById, CreatedDate ,OwnerId FROM Comment__c order by CreatedById];
    /*
 @AuraEnabled(cacheable=true)
    public static List<User> getUserName(String userId) {
        return [SELECT Id, Name
            FROM User WHERE Id = : userId];
 */
    
    }


    @AuraEnabled(cacheable=true)
    public static String getUserName (String userId)
    {
         List<User> contacts =  [Select Id from User where Id =: userId];
         Id accountid = contacts.get(0).Id;
         return accountid;
    }
    
    /*@AuraEnabled(cacheable=true)
    public static String getAccountId (String contactid)
    {
         List<Contact> contacts =  [Select AccountId from Contact where Id =: contactid];
         Id accountid = contacts.get(0).AccountId;
         return accountid;
    } */

 


    @AuraEnabled
    public static Comment__c insertCommentMethod(String username, String name){
        try {
            Comment__c comm = new Comment__c();
            comm.Name = name;
            comm.user__c= username;
            insert comm;
            return comm;
        } catch (Exception exp) {
            throw new AuraHandledException(exp.getMessage());
        }
    }
    @AuraEnabled(cacheable=true)
    public static List<Category__c> getCategories() {
    return [SELECT Id, Name, image__c FROM Category__c];
    }
      
    @AuraEnabled(cacheable=true)

    public static List<Product2> getProductRecordMethod(String accNameParamInApex) {

        String accNameKey = '%'+accNameParamInApex+'%';

    List<Product2> accList=[SELECT Id, Name , Category__c , Picture__c , Family

        FROM Product2 

        Where name Like: accNameKey];

        return accList;


    }

    @AuraEnabled(cacheable=true)
    public static List<Product2> getAllServices1() {
    return [SELECT Id, Name, Picture_Url__c FROM Product2];
    }
}