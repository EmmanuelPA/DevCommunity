public without sharing class carouselController {
    @AuraEnabled(cacheable=true)
    public static List<Product2> getProductList() {
        try {
            List<Product2> activeProducts  = [SELECT Id, Brand__c, Color__c, Price__c, Name, ContentId__c, Has_Promotion__c FROM Product2 WHERE Has_Promotion__c = TRUE];          
            if(activeProducts.size() > 0) return activeProducts;

            throw new CalloutException();

        } catch (Exception e) {
            throw new AuraHandledException('Something went wrong. Try to refresh. Please contact an administrator if the problem continues');

        }
    }
    
}