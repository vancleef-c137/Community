public with sharing class uploadSalariesContoller {
    @AuraEnabled
    public static list<Contact> uploadSalaries(Id contentDocumentId){
        list<Contact> accountInsertList = new list<Contact>();
        if(contentDocumentId != null) {
            
            // Fetch File Data based on the basic of document id 
            ContentVersion contentVersionObj = [SELECT Id, VersionData FROM ContentVersion WHERE ContentDocumentId =:contentDocumentId];
            // split the file data
            list<String> csvRecordsList = contentVersionObj.VersionData.toString().split('\n');

            for(Integer i = 1; i < csvRecordsList.size(); i++){
                Contact accountObj = new Contact();
                list<String> csvRowData = csvRecordsList[i].split(',');
                System.debug('csvRowData====> '+csvRowData);
                accountObj.FirstName = csvRowData[0]; 
                accountObj.LastName = csvRowData[1]; // accName
              //  accountObj.AccountSource = csvRowData[1];
           //    accountObj.CIN__c = csvRowData[2];
                accountObj.Title = csvRowData[2];
                //accountObj.Birthdate = csvRowData[3];
              //  accountObj.nbrChild__c = csvRowData[4];
                accountObj.Salutation__c = csvRowData[3];
                accountObj.Email = csvRowData[4];
                accountObj.Phone = csvRowData[5];
                accountObj.State__c = csvRowData[6];
                accountObj.Department = csvRowData[7];
               
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
}