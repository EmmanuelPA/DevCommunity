public with sharing class ContentVersionTriggerHandler {
    public static void doAfterInsert(List<ContentVersion> cvList) {
        Set<Id> ids = new Set<Id>();
        Set<Id> products = new Set<Id>();
        if(!cvList.IsEmpty()){
            List<ContentDistribution> cdListToInsert = new List<ContentDistribution>();
            List<Product2> listToInsert = new List<Product2>();

            for(ContentVersion cv : cvList){
                cdListToInsert.add(new ContentDistribution(
                    ContentVersionId = cv.Id,
                    Name = cv.Title
                ));
                ids.add(cv.Id);
                products.add(cv.FirstPublishLocationId);
            }
            if(!cdListToInsert.IsEmpty())INSERT cdListToInsert;
            ContentDistribution c = [SELECT Id, Name, ContentDocumentId, ContentDownloadUrl FROM ContentDistribution WHERE ContentVersionId IN:ids LIMIT 1];
            List<Product2> dataProduct = [SELECT ContentId__c From Product2 WHERE Id IN:products];
            for(Product2 d: dataProduct ){
                d.ContentId__c = c.ContentDownloadUrl;
                System.debug(d.ContentId__c);
                listToInsert.add(d);
            }
            if(!listToInsert.IsEmpty())update listToInsert;
        }
    }
}
