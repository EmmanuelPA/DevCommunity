@isTest public with sharing class CommunityAuthControllerTest {
    
    @IsTest
    static void loginTest(){
        
        Test.startTest();
        User communityUser = DataFactory.createPartnerUser();
        try{
            System.setPassword(communityUser.Id, 'Natalia117!');
            String url = CommunityAuthController.doLogin(communityUser.UserName, 'Natalia117!');
            System.debug(url);
        } catch (Exception ex) {
        }  
        Test.stopTest();
        
    }
}