import {Model} from "../Model";
import {API} from "../Api";

export class User extends Model {
    constructor ( data, options = {} ) {
        super( API.END_POINTS.SECURITY.USERS.ROOT, data, options );
    }

    datatable(){
        return this.get( API.END_POINTS.SECURITY.USERS.DATATABLE )
    }
}
