/**
 * @description       : 
 * @author            : ChangeMeIn@UserSettingsUnder.SFDoc
 * @group             : 
 * @last modified on  : 02-19-2022
 * @last modified by  : ChangeMeIn@UserSettingsUnder.SFDoc
**/
public with sharing class SF_cartController {
    public class cartDetails {
        @AuraEnabled
        public ID id {get;set;} 

        @AuraEnabled
        public String name {get;set;} 

        @AuraEnabled
        public String status {get;set;} 
        
        @AuraEnabled 
        public Decimal totalQty {get;set;} 
    }

    @AuraEnabled(Cacheable=true)
    public static cartDetails getCartDetails() {
        Cart__c cart = SF_cartController.getCart();
        cartDetails cartdetails = new cartDetails();

        cartdetails.id = cart.Id;
        cartdetails.name = cart.Name;
        cartdetails.status = cart.Status__c;
        cartdetails.totalQty = cart.Total_Quantity__c;

        return cartdetails;
    }

    @AuraEnabled(Cacheable=true)
    public static List<Cart_Line_Item__c> getCartLineItems() {
        Cart__c cart = SF_cartController.getCart();

        return [
            SELECT Id,Cart__c,Product__c,Price__c,Quantity__c,
            Total_Price__c,Product_Description__c
            FROM Cart_Line_Item__c
            WHERE Cart__c = :cart.Id
        ];
    }

    @AuraEnabled()
    public static Cart__c getCart() {
        Account acc = SF_accountController.getAccount();

        return [
            SELECT Id, Name, CreatedById, LastModifiedById, Status__c,
            Total_Quantity__c, Total_Price__c, Account__c
            FROM Cart__c
            WHERE Account__c = :acc.Id
        ];
    }

    @AuraEnabled()
    public static void createCart() {}

    @AuraEnabled()
    public static void addProductToCart() {}
}
