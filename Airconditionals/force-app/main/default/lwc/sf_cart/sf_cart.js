import { LightningElement, track, wire } from 'lwc';
import { deleteRecord, updateRecord, getFieldValue } from 'lightning/uiRecordApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import getCartLineItems from '@salesforce/apex/SF_cartController.getCartLineItems';
import getCartDetails from '@salesforce/apex/SF_cartController.getCartDetails';
import QUANTITY_FIELD from '@salesforce/schema/Cart_Line_Item__c.Quantity__c';
import ID_FIELD from '@salesforce/schema/Cart_Line_Item__c.Id';

export default class Sf_cart extends LightningElement {
    @track
    cartLineItems=[];
    name;
    status;
    totalQty;

    cart;
    errors;

    @wire(getCartLineItems)
    wiredItems({error, data}) {
        if(data) {
            this.cartLineItems = data;     
        } else {
            this.errors = error;
        } 
    } 

    @wire(getCartDetails)
    wiredDetails({error, data}) {
        if(data) {
            this.cart = data;
            this.name = data.name; 
            this.status = data.status; 
            this.totalQty = data.totalQty; 
        } else {
            this.errors = error;
        } 
    }
    
    handleOrder() {}

    handleRemoveCart() {}

    async handleSaveCartLineItemQty(e) {
        let quantity = 0;
        const fields = {};
        fields[QUANTITY_FIELD.fieldApiName] = e.detail.qty;
        fields[ID_FIELD.fieldApiName] = e.detail.id;

        try {
            const record = await updateRecord({fields}); 
            
            this.cartLineItems.forEach((item) => { 
                if(item.Id === record.id) {
                    item.Quantity__c = record.fields.Quantity__c.value; 
                }
                quantity += item.Quantity__c;
            })

            this.totalQty = quantity;
        } catch (error) {
            console.log(error);
        }
    }

    async handleRemoveCartLineItem(e) {
        try {
            await deleteRecord(e.detail);

            this.cartLineItems = this.cartLineItems.filter(el => {
                if (el.Id !== e.detail) {
                    return true;
                } else {
                    this.totalQty -= el.Quantity__c;
                    
                    return false;
                }
            });

            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Success',
                    message: 'Record deleted',
                    variant: 'success'
                })
            );
        } catch (error) {
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Error deleting record',
                    message: error.body.message,
                    variant: 'error'
                })
            );
        }
    }
}