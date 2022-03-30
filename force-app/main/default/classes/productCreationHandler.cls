public with sharing class productCreationHandler {
    @AuraEnabled
    public static String uploadFile(String product, String base64, String filename) {
        JSON2Apex productApex = parse(product);
        Id prodId = createProduct(productApex);
        System.debug('returned Id ' + prodId);
        Id values = FileUploaderClass.uploadFile1(base64, filename, prodId);
        return values;
  }
  @AuraEnabled
  public static void updateRecord(String product, String base64, String filename, String recordId) {
      JSON2Apex productApex = parse(product);
      updateProduct(productApex);
      System.debug('returned Id ' + recordId);
      if(!String.isEmpty(base64)){
        Id values = FileUploaderClass.uploadFile1(base64, filename, recordId);
      }
}
    public static JSON2Apex parse(String json) {
        return (JSON2Apex) System.JSON.deserialize(json, JSON2Apex.class);
      }

      public static Id createProduct(JSON2Apex product){
        System.debug('record' + product);
        Product2 newProduct = new Product2();
        newProduct.Name = product.model;
        newProduct.Brand__c = product.brand;
        newProduct.Color__c = product.color;
        newProduct.Price__c = product.price;
        newProduct.Has_Promotion__c = product.active;
        newProduct.Car_Type__c = 'Car';
        insert newProduct;
        return newProduct.Id;
      }
      public static void updateProduct(JSON2Apex product){
        System.debug('record' + product);
        Product2 newProduct = [SELECT Id, Brand__c, Color__c, Price__c, Name, Has_Promotion__c FROM Product2 WHERE Id = :product.id];         
        newProduct.Name = product.model;
        newProduct.Brand__c = product.brand;
        newProduct.Color__c = product.color;
        newProduct.Price__c = product.price;
        newProduct.Has_Promotion__c = product.active;
        update newProduct;
      }
    public class JSON2Apex {

        public String id;
        public String model;
        public String brand;
        public Decimal price;
        public String color;
        public Boolean active;
      
      }
}