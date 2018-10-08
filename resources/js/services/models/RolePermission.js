import {Model} from "../Model";
import {API} from "../Api";

export class RolePermission extends Model {
    constructor (role_id, data, perm_id = null, options = {} ) {
        super( API.END_POINTS.SECURITY.ROLE_PERMISSIONS(role_id, perm_id), data, options );
    }
}
