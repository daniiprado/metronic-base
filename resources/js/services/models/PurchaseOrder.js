import {Model} from "../Model";
import {API} from "../Api";

export class PurchaseOrder extends Model {
    constructor ( data, options = {} ) {
        super( API.END_POINTS.PURCHASE.PURCHASE_ORDER.ROOT, data, options );
    }

    datatable(){
        return this.get( API.END_POINTS.PURCHASE.PURCHASE_ORDER.DATATABLE )
    }
}
