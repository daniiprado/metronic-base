import {Model} from "../Model";
import {API} from "../Api";

export class Permission extends Model {
    constructor ( data, options = {} ) {
        super( API.END_POINTS.SECURITY.PERMISSIONS.ROOT, data, options );
    }
}
