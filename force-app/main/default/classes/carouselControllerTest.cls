@isTest
public with sharing class carouselControllerTest {

    @isTest
    static void methodName(){
        Product2 prod = new Product2();
        prod.Name = 'FT-1';
        prod.Brand__c = 'BMW';
        prod.Has_Promotion__c = TRUE;
        insert prod;
        Test.startTest();
        List<Product2> prods = carouselController.getProductList();
        Test.stopTest();
        System.assertEquals(prod.Name, prods.get(0).Name);
        
    }
    @IsTest
    static void errorTest(){
        Product2 prod = new Product2();
        prod.Name = 'FT-1';
        prod.Brand__c = 'BMW';
        //prod.Has_Promotion__c = TRUE;
        insert prod;
        test.startTest();
        
            try{
                List<Product2> prods = carouselController.getProductList();
            } catch (Exception ex) {
                //System.assertEquals('Something went wrong. Try to refresh. Please contact an administrator if the problem continues', ex.getMessage());
            }  
            test.stopTest();
        
    }
}