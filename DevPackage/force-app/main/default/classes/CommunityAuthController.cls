public without sharing class CommunityAuthController {
    public CommunityAuthController() {

    }

    @AuraEnabled
    public static string doLogin(String username, String password){
        try {
            
            String startUrl = System.Label.Web;
            ApexPages.PageReference pageRef = Site.login(username, password, startUrl);

            if(pageRef != null) return pageRef.getUrl();

            throw new CalloutException();


        } catch (Exception e) {
            system.debug('e.getMessagelogin+   '+e.getMessage());
            throw new AuraHandledException(e.getMessage());

        }
    }

}