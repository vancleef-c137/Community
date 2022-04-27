public with sharing class OpportynityC {
    public OpportynityC() {

    }
    @AuraEnabled(cacheable=true)
    public static String getAccountName(){
        List<Contact> Contacts = [SELECT AccountId FROM Contact WHERE Id = '0038d000006KcwYAAS'];
        ID acctId = Contacts.get(0).AccountId;
        //List<Account> accounts = [select Name from Account where Id=:acctId];
        return acctId;
        }

    /* TO DO requete get account id */
    /* requete get account name  */ 
}