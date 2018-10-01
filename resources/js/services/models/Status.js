import {Model} from "../Model";
import {API} from "../Api";

export class Status extends Model {
    constructor ( data, options = {} ) {
        super( API.END_POINTS.PURCHASE.STATUS.ROOT, data, options );
    }
}
