import {Model} from "../Model";
import {API} from "../Api";

export class PurchaseOrder extends Model {
    constructor ( data, options = {} ) {
        super( API.END_POINTS.PURCHASE.PURCHASE_ORDER.ROOT, data, options );
    }

    datatable(){
        return this.get( API.END_POINTS.PURCHASE.PURCHASE_ORDER.DATATABLE )
    }

    status( id ) {
        return this.patch( API.END_POINTS.PURCHASE.PURCHASE_ORDER.PURCHASE_ORDER_STATUS(id) )
    }
}
