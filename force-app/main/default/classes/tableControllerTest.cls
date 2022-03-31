@isTest public with sharing class tableControllerTest {
    @IsTest
    static void noRecordFoundTest(){
        
        test.startTest();
            DataFactory.getAllCars(10);
            try{
                List<Product2> prods = tableController.getCars('Boss 302', 'Mustang', 'Black');
            } catch (Exception ex) {
            }  
            test.stopTest();
        
    }
    @IsTest
    static void firstLoadTest(){
        
        test.startTest();
            DataFactory.getAllCars(10);
            try{
                List<Product2> prods = tableController.getCars('', '', '');
            } catch (Exception ex) {
            }  
            test.stopTest();
        
    }
    @IsTest
    static void carModelTest(){
        
        test.startTest();
            DataFactory.getAllCars(10);
            try{
                List<Product2> prods = tableController.getCarModel();
            } catch (Exception ex) {
            }  
            test.stopTest();
        
    }

    @IsTest
    static void carModelNoDataTest(){
        
        test.startTest();
            //DataFactory.getAllCars(10);
            try{
                List<Product2> prods = tableController.getCarModel();
            } catch (Exception ex) {
            }  
            test.stopTest();
        
    }

    @IsTest
    static void changeStatusTest(){
        
        test.startTest();
            List<Product2> listProd = DataFactory.getAllCars(10);
            try{
                Boolean result = tableController.changeStatus(listProd.get(0).Id);
                System.assertNotEquals(listProd.get(0).Has_Promotion__c, result);
            } catch (Exception ex) {
            }  
            test.stopTest();
        
    }

    @IsTest
    static void changeStatusToTrueTest(){
        
        test.startTest();
            List<Product2> listProd = DataFactory.getNoPromoCars(10);
            try{
                Boolean result = tableController.changeStatus(listProd.get(0).Id);
                System.assertNotEquals(listProd.get(0).Has_Promotion__c, result);
            } catch (Exception ex) {
            }  
            test.stopTest();
        
    }

    @IsTest
    static void changeStatusErrorTest(){
        
        test.startTest();
            List<Product2> listProd = DataFactory.getAllCars(10);
            try{
                Boolean result = tableController.changeStatus('');
                System.assertNotEquals(listProd.get(0).Has_Promotion__c, result);
            } catch (Exception ex) {
            }  
            test.stopTest();
        
    }
}