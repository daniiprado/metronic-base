import {Model} from "../Model";
import {API} from "../Api";

export class PurchaseOrderProductOrder extends Model {
    constructor ( id, data, options = {} ) {
        super( API.END_POINTS.PURCHASE.PURCHASE_ORDER.PRODUCTS_ORDER(id), data, options );
    }
}
