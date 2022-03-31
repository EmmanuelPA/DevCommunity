@isTest
public with sharing class carouselControllerTest {

    @isTest
    static void methodName(){
        Test.startTest();
        List<Product2> prod = DataFactory.getAllCars(10);
        List<Product2> prods = carouselController.getProductList();
        Test.stopTest();
        System.assertEquals(prod.get(0).Name, prods.get(0).Name);
        
    }
    @IsTest
    static void errorTest(){
        
        test.startTest();
            DataFactory.getNoPromoCars(10);
            try{
                List<Product2> prods = carouselController.getProductList();
            } catch (Exception ex) {
                //System.assertEquals('Something went wrong. Try to refresh. Please contact an administrator if the problem continues', ex.getMessage());
            }  
            test.stopTest();
        
    }
}