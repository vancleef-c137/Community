public with sharing class relatedUsersController {
    public relatedUsersController() {

    }
    @AuraEnabled(cacheable=true)
        public static List<User> getRelatedUsers(){
            return [SELECT FirstName, LastName, Name, CommunityNickName, SmallPhotoUrl, FullPhotoUrl FROM User WHERE Profile.Name ='myProjectCommunity'];
        }
}