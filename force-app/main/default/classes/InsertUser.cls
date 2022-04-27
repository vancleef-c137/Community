public class InsertUser
{
    @future 
    public static void insertU(String idCont)
    {
            Contact contact=[select id,email,name,title from contact where cin__c=:idCont];   
        	
        	User user =new User();
           // user.name=contact.name;
            user.email=contact.email;
            user.username=contact.email;
            user.alias=contact.name.substring(0,8);
            user.CommunityNickname=contact.name;
            user.title=contact.title;
            user.UserRoleId='00E8d000000He98EAC';
            user.ProfileId='00e8d000000MKvIAAW';
            //user.Profile.UserLicenseId='1008d000001Ju2ZAAS';
            
    insert user;
    
    }
}