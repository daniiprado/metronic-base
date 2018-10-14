import {Model} from "../Model";
import {API} from "../Api";

export class ProductOrderIssue extends Model{
    constructor(id, data, options = {}) {
        super( API.END_POINTS.PURCHASE.PRODUCTS_ORDER.PRODUCTS_ORDER_ISSUE(id), data, options );
    }
}