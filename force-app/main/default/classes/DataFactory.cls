@isTest public with sharing class DataFactory {
    public static List<Product2> getAllCars(Integer counter){
        List<Product2> listOfProducts = new List<Product2>();
        for (Integer i = 0; i < counter; i++) {
            Product2 prod = new Product2();
            prod.Name = 'FT-1';
            prod.Brand__c = 'BMW';
            prod.Price__c = 10000;
            prod.Has_Promotion__c = TRUE;
            listOfProducts.add(prod);
        }
        insert listOfProducts;
        return listOfProducts;
    }
    public static void getNoPromoCars(Integer counter){
        List<Product2> listOfProducts = new List<Product2>();
        for (Integer i = 0; i < counter; i++) {
            Product2 prod = new Product2();
            prod.Name = 'FT-1';
            prod.Brand__c = 'BMW';
            prod.Price__c = 10000;
            //prod.Has_Promotion__c = TRUE;
            listOfProducts.add(prod);
        }
        insert listOfProducts;
        //return listOfProducts;
    }
}