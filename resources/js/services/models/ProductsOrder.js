import {Model} from "../Model";
import {API} from "../Api";

export class ProductsOrder extends Model {
    constructor ( data, options = {} ) {
        super( API.END_POINTS.SECURITY.ROLES.ROOT, data, options );
    }

    status() {
        return this.patch( API.END_POINTS.PURCHASE.PRODUCTS_ORDER.STATUS )
    }
}
