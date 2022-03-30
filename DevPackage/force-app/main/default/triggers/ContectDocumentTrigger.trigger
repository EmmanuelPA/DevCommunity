trigger ContectDocumentTrigger on ContentDocumentLink (before insert, before update) {

    for(ContentDocumentLink content: Trigger.New){
        content.Visibility = 'AllUsers';
        System.debug(content.Visibility);
    }
}