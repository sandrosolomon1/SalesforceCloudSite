/**
 * @description       : 
 * @author            : ChangeMeIn@UserSettingsUnder.SFDoc
 * @group             : 
 * @last modified on  : 02-16-2022
 * @last modified by  : ChangeMeIn@UserSettingsUnder.SFDoc
**/
public with sharing class SF_accountDetails {
    @AuraEnabled
    public string name { get; set; }
        
    @AuraEnabled
    public string shippingStreet { get; set; }
        
    @AuraEnabled
    public string shippingCountry { get; set; }

    @AuraEnabled
    public string shippingPostalCode { get; set; }

    @AuraEnabled
    public string shippingState { get; set; }
}
