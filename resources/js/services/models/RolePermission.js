import {Model} from "../Model";
import {API} from "../Api";

export class RolePermission extends Model {
    constructor (id, data, options = {} ) {
        super( API.END_POINTS.SECURITY.ROLE_PERMISSIONS(id), data, options );
    }
}
