import { api, LightningElement } from 'lwc';

export default class Sf_cartLineItem extends LightningElement {
    qty;
    _qty;
    price;
    desc;
    _product;
    disableSave=false;
    disableAction=false;

    @api
    get product() {
        return this._product;
    };

    set product(product) {
        this._product = product;
        this.price = product.Price__c;
        this.qty = product.Quantity__c;
    }

    handleQtyChange(e) {
        this._qty = e.detail.value;
    }

    handleSave(e) {
        this.disableSave = true;

        const saveQtyEvent = new CustomEvent('saveqty', {
            detail: {
                qty: this._qty,
                id: this._product.Id
            }
        })
        this.dispatchEvent(saveQtyEvent);
    }

    handleAction() {
        this.disableAction = true;

        const deleteItemEvent = new CustomEvent('removecartitem', {
            detail: this._product.Id
        })
        this.dispatchEvent(deleteItemEvent);
    }
}