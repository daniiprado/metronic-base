import {Model} from "../Model";
import {API} from "../Api";

export class UserRole extends Model {
    constructor (role_id, data, perm_id = null, options = {} ) {
        super( API.END_POINTS.SECURITY.USER_ROLE(role_id, perm_id), data, options );
    }
}
