import {Model} from "../Model";
import {API} from "../Api";

export class Issue extends Model {
    constructor ( data, options = {} ) {
        super( API.END_POINTS.PURCHASE.ISSUE.ROOT, data, options );
    }
}
