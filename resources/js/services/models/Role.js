import {Model} from "../Model";
import {API} from "../Api";

export class Role extends Model {
    constructor ( data, options = {} ) {
        super( API.END_POINTS.SECURITY.ROLES.ROOT, data, options );
    }
}
