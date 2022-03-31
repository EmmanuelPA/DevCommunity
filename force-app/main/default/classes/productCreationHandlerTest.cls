@isTest public with sharing class productCreationHandlerTest {
    @IsTest
    static void updateRecordTest(){
        Product2 prod = DataFactory.createOneProduct();
        String jsonData = '{"id" : "'+ prod.Id +'","model" : "FT-2", "brand" : "BMW", "color" : "White","price" : '+ 12 +', "active" : '+ TRUE +' } ';
        Test.startTest();
        productCreationHandler.updateRecord(jsonData, '', '', prod.Id);
        Test.stopTest();
        
    }
    @IsTest
    static void createRecordTest(){
        Product2 prod = DataFactory.createOneProduct();
        String base64 = EncodingUtil.base64Encode(Blob.valueof('File test data'));
        String jsonData = '{"id" : "","model" : "FT-2", "brand" : "BMW", "color" : "White","price" : '+ 12 +', "active" : '+ TRUE +' } ';
        Test.startTest();
        productCreationHandler.uploadFile(jsonData, base64, 'FileTest');
        Test.stopTest();
        
    }
}