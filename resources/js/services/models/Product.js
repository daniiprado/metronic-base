import {Model} from "../Model";
import {API} from "../Api";

export class Product extends Model {
    constructor ( data, options = {} ) {
        super( API.END_POINTS.CUSTOMERS.PRODUCT.ROOT, data, options );
    }

    datatable(){
        return this.get( API.END_POINTS.CUSTOMERS.PRODUCT.DATATABLE )
    }
}
