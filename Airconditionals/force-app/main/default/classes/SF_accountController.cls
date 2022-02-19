/**
 * @description       : 
 * @author            : ChangeMeIn@UserSettingsUnder.SFDoc
 * @group             : 
 * @last modified on  : 02-17-2022
 * @last modified by  : ChangeMeIn@UserSettingsUnder.SFDoc
**/
public with sharing class SF_accountController {
    @AuraEnabled(Cacheable=true)
    public static SF_accountDetails getAccountDetails() {
        Account acc = SF_accountController.getAccount();

        SF_accountDetails accDetails = new SF_accountDetails();

        accDetails.name = acc.Name;

        accDetails.shippingStreet = acc.Shipping_Street__c;

        accDetails.shippingCountry = acc.Shipping_Country__c;

        accDetails.shippingPostalCode = acc.Shipping_Postal_Code__c;
        
        accDetails.shippingState = acc.Shipping_State__c;

        return accDetails;
    }

    @AuraEnabled()
    public static void updateAccountDetails(SF_accountDetails accDetails) {
        Account acc = SF_accountController.getAccount();
        
        try {
            acc.Name = accDetails.name;

            acc.Shipping_Street__c = accDetails.shippingStreet;

            acc.Shipping_Country__c = accDetails.shippingCountry;

            acc.Shipping_Postal_Code__c = accDetails.shippingPostalCode;
            
            acc.Shipping_State__c = accDetails.shippingState;
            
            update acc;  
        } catch (DmlException e) {
            System.debug('An unexpected error has occurred: ' + e.getMessage());
        } 
    }

    public static Account getAccount() {
        return [
            SELECT Id,Name,Shipping_Street__c,Shipping_State__c,Shipping_Country__c,Shipping_Postal_Code__c
            FROM Account
            WHERE Id = '0018c00002A65OxAAJ'
        ];
    }
}
