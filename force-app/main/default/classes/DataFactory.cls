@isTest public with sharing class DataFactory {
    public static List<Product2> getAllCars(Integer counter){
        List<Product2> listOfProducts = new List<Product2>();
        for (Integer i = 0; i < counter; i++) {
            Product2 prod = new Product2();
            prod.Name = 'FT-1';
            prod.Brand__c = 'BMW';
            prod.Price__c = 10000;
            prod.Car_Type__c = 'Car';
            prod.Has_Promotion__c = TRUE;
            listOfProducts.add(prod);
        }
        insert listOfProducts;
        return listOfProducts;
    }
    public static List<Product2> getNoPromoCars(Integer counter){
        List<Product2> listOfProducts = new List<Product2>();
        for (Integer i = 0; i < counter; i++) {
            Product2 prod = new Product2();
            prod.Name = 'FT-1';
            prod.Brand__c = 'BMW';
            prod.Price__c = 10000;
            prod.Color__c = 'White';
            prod.Car_Type__c = 'Car';
            //prod.Has_Promotion__c = TRUE;
            listOfProducts.add(prod);
        }
        insert listOfProducts;
        return listOfProducts;
    }

    public static user createPartnerUser(){  
        Id setAccountId = createAccount();
        Id contactIds = createContact(setAccountId);
        

        Profile p = [SELECT Id FROM Profile WHERE Name = 'Partner User' LIMIT 1];

        user u = New User(
            UserName = 'test'  + math.random() +  '@emma.com',
            FirstName = 'Test-First',
            LastName = 'Test-Last',
            Alias = 'test',
            email = 'test' + math.random() + '@test.com',
            CommunityNickName = string.valueOf(math.random()).substring(0,6),
            ProfileID = p.id,
            TimeZoneSidKey = 'America/New_York', 
            LocaleSidKey = 'en_US', 
            EmailEncodingKey = 'UTF-8', 
            LanguageLocaleKey = 'en_US',
            ContactID = contactIds

            );

            
            insert u;
            system.debug('User = ' + u);
            return u;


    }
    private static Id createAccount(){
        Account acc = new Account();
        acc.Name = 'Community Test';
        insert acc;
        return acc.Id;
    }
    private static Id createContact(Id accountIds){
        Contact c = New Contact(LastName = 'Test', AccountID = accountIds);
        insert c;
        return c.Id;
    }
}