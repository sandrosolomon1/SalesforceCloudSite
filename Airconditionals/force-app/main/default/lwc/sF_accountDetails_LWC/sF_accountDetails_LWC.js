import { LightningElement , wire } from 'lwc';
import getAccountDetails from '@salesforce/apex/SF_accountController.getAccountDetails';
import updateAccountDetails from '@salesforce/apex/SF_accountController.updateAccountDetails';

const NAME = 'name';
const STREET = 'street';
const COUNTRY = 'country';
const STATE = 'state';
const CODE = 'code';

export default class SF_accountDetails_LWC extends LightningElement {
    disabled = true;
    actionButtonLabel = 'edit';
    errors=[];
    _accountDetails={};
    edit='edit';
    save='save';

 
    name;
    shippingStreet;
    shippingCountry;
    shippingPostalCode;
    shippingState;

    @wire(getAccountDetails)
    wiredAccount({ error, data }) {
        if (data) { 
            this.updateDetails(data);
        } else if (error) {
            this.errors.push(error);
        }
    }

    updateDetails(data) {
        this.name = data.name;
        this.shippingCountry = data.shippingCountry;
        this.shippingPostalCode = data.shippingPostalCode; 
        this.shippingState = data.shippingState;
        this.shippingStreet = data.shippingStreet;
        
        this._accountDetails = {...data};
    }

    handleChange(e) {
        let val = e.detail.value;

        switch(e.target.name) { 
            case NAME:
                this._accountDetails.name = val;
              break;
            case STREET:
                this._accountDetails.shippingStreet = val;
                break;
            case COUNTRY:
                this._accountDetails.shippingCountry = val;
                break;
            case STATE:
                this._accountDetails.shippingState = val;
                break;
            case CODE:
                this._accountDetails.shippingPostalCode = val;
                break;
        }
    }

    handleAction() {
        if(this.actionButtonLabel === this.save) {
            updateAccountDetails({accDetails : this._accountDetails})
                .then(() => {
                    this.actionButtonLabel = this.edit;
                })
                .catch(error => {
                    this.errors.push(error);
                })
        } else {
            this.actionButtonLabel = this.save; 
        } 
        this.disabled = this.disabled ? false : true;
    }
}