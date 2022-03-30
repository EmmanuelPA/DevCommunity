public with sharing class productCreationHandler {
    @AuraEnabled
    public static String uploadFile(String product, String base64, String filename, String recordId) {
        JSON2Apex productApex = parse(product);
        Id prodId = createProduct(productApex);
        System.debug('returned Id ' + prodId);
        FileUploaderClass files = new FileUploaderClass();
        Id values = FileUploaderClass.uploadFile1(base64, filename, prodId);
        return values;
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
      
    public class JSON2Apex {

        public String id;
        public String model;
        public String brand;
        public Decimal price;
        public String color;
        public Boolean active;
      
      }
}