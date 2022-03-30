trigger contentVersionTrigger on contentVersion  (after insert, after update) {

    if(Trigger.IsInsert && Trigger.IsAfter){
        ContentVersionTriggerHandler.doAfterInsert(Trigger.New);
    }
}