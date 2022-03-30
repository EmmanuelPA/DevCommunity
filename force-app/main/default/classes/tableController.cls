public with sharing class tableController {
    @AuraEnabled(cacheable=false)
    public static List<Product2> getCars(String model, String brand, String color){
        List<Product2> activeProducts = new List<Product2>();
        String modelF = '%' + model + '%';
        System.debug('entry');
        try {
            
            if(String.isEmpty(model) || String.isEmpty(brand) || String.isEmpty(color)){
                activeProducts = [SELECT Id, Brand__c, Color__c, Price__c, Name, ContentId__c, Has_Promotion__c FROM Product2 WHERE Car_Type__c = 'Car'];
            }else{
                activeProducts = [SELECT Id, Brand__c, Color__c, Price__c, Name, ContentId__c, Has_Promotion__c FROM Product2 WHERE Car_Type__c = 'Car' AND ((Brand__c =:brand) OR (Color__c =:color) OR (Name like :modelF))];
            }
            
            if(activeProducts.size() > 0) return activeProducts;

            throw new CalloutException();


        } catch (Exception e) {
            throw new AuraHandledException('There is no record that matches the entry criteria');

        }

    }

    @AuraEnabled(cacheable=true)
    public static List<Product2> getCarModel(){
        List<Product2> activeProducts = new List<Product2>();
        try {
            
                activeProducts = [SELECT Id, Price__c, Name FROM Product2 WHERE Car_Type__c = 'Car'];
            
            if(activeProducts.size() > 0) return activeProducts;

            throw new CalloutException();


        } catch (Exception e) {
            throw new AuraHandledException('There is no record that matches the entry criteria');

        }

    }

    @AuraEnabled
    public static Boolean changeStatus(String prodId){
        try {
            
                Product2 activeProducts = [SELECT Id, Price__c, Name, Has_Promotion__c FROM Product2 WHERE Id=:prodId];
                if(activeProducts.Has_Promotion__c){
                    activeProducts.Has_Promotion__c = FALSE;
                } else{
                    activeProducts.Has_Promotion__c = TRUE;

                }
                update activeProducts;
                if(activeProducts.Id != null) return activeProducts.Has_Promotion__c;

            throw new CalloutException();


        } catch (Exception e) {
            throw new AuraHandledException('Try it later.');

        }

    }
}