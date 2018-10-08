import {Model} from "../Model";
import {API} from "../Api";

export class Module extends Model {

    constructor ( data, options = {} ) {
        super( API.END_POINTS.SECURITY.MODULES.ROOT, data, options );
    }

    datatable(){
        return this.get( API.END_POINTS.SECURITY.MODULES.DATATABLE )
    }

    permissions(){
        return this.get( API.END_POINTS.SECURITY.MODULES.PERMISSIONS )
    }
}
