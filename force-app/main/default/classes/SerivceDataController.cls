public with sharing class SerivceDataController {
    
        @AuraEnabled(cacheable=true)
        public static List<Product2> getServices(){
            return [SELECT Id, NAME, duration__c, DESCRIPTION, Picture_URL__c, provider__c FROM Product2 WITH SECURITY_ENFORCED];
        }

         @AuraEnabled(cacheable=true)
         public static List<Opportunity> getRelatedServices(){
         return [SELECT (SELECT PricebookEntry.Product2Id FROM OpportunityLineItems) FROM Opportunity WHERE Id = '0068d000004WhiOAAS'];
         }

        @AuraEnabled(cacheable=true)
        public static List<OpportunityLineItem> getRelatedPriceBook()
        {
            return [SELECT PricebookEntry.Product2.Name, PricebookEntry.Product2.provider__c, PricebookEntry.Product2.Description, PricebookEntry.Product2.Picture_URL__c FROM OpportunityLineItem WHERE OpportunityId = '0068d000004WhiOAAS'];
        }
        @AuraEnabled(cacheable=true)
        public static List<Product2> GetServiceById(id ProductId)
        {
            return [SELECT NAME, duration__c,  provider__c, PICTURE_URL__C, Description, family FROM PRODUCT2 WHERE Id = :ProductId];
        }

  
  
        @AuraEnabled
        public static string getOppo()
            {
                list<ServiceSubscription__c> oppoList = new list<ServiceSubscription__c>();
                oppoList = [SELECT id, Product2Id__c, EndDate__c, name from ServiceSubscription__c where Contact__c = '0038d000006KcwYAAS'];
                return JSON.serialize(oppoList); 
            }
        

        @AuraEnabled(cacheable=true)
        public static List<Product2> GetServiceBySubscription(id ContactId)
        {
             List<ServiceSubscription__c> ProductIds = [SELECT Product2Id__c from ServiceSubscription__c where Contact__c = '0038d00000835VOAAY'];
            // Set<String> ProdIdSet = new Set<String>();
            
            List<Product2> Products = new List<Product2>();
            for(Integer i = 0; i < ProductIds.size(); i++){
                ID ProdIds =  ProductIds.get(i).Product2Id__c;
                List<Product2> Product = [SELECT NAME, duration__c, provider__c, PICTURE_URL__C, description FROM PRODUCT2 WHERE Id = :ProdIds];
                Products.add(Product.get(0));
            } 
            
            return Products;
        }

        @AuraEnabled(cacheable=true)
        public static List<ServiceSubscription__c> getSubscriptionDetails(id ContactId){
            return [SELECT Product2Id__c, EndDate__c, productName__c, StartDate__c from ServiceSubscription__c where Contact__c = :ContactId];
        }

        @AuraEnabled(cacheable=true)
        public static List<PRODUCT2> getCategoryServices(id CategoryId){
            return [SELECT NAME, duration__c,  provider__c, PICTURE_URL__C, Description FROM PRODUCT2 WHERE Category__c = :CategoryId];
        }

        @AuraEnabled(cacheable=true)
        public static String getContactId (String userId)

    {

        List<User> users = [Select ContactId from User where Id =: userId];

        Id contactid = users.get(0).ContactId;

        return contactid;

    }




        @AuraEnabled(cacheable=true)
        public static List<Product_Review__c> getServiceReviews(id ProductId)
        {
            return [SELECT id, review__c,likes__c, dislikes__c,commercialExternalInfo__c FROM Product_Review__c WHERE Product__c = :ProductId];
        }

        @AuraEnabled(cacheable=true)
        public static List<Category__c> getCategories() {
        return [SELECT Id, Name, image__c FROM Category__c];
        }

        @AuraEnabled(cacheable=true)
        public static List<Comment__c> getComments() {
         return [SELECT CreatedById, Name ,user2__c, LastModifiedById, CreatedDate ,OwnerId FROM Comment__c order by CreatedById];
    
        
        }

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
        public static List<AggregateResult> getServiceReviews()
        {
            return [SELECT COUNT(Id) FROM Product2 where category__c = 'a0y8d000000UNWFAA4'];


            //id CategoryId


        }




        // @AuraEnabled(cacheable=true)
        // public static List<ServiceSubscription__c> GetSubscription(String ProductId)
        // {
        //     return [SELECT NAME, provider__c, PICTURE_URL__C FROM PRODUCT2 WHERE Id = :ProductId];
        // }


// SELECT FIELDS(ALL) FROM Product_Review__c LIMIT 200
        
     //select name from commercialExternalInfos__c where id ='a058d000002eeKlAAI'a058d000002eLbKAAU
    
}