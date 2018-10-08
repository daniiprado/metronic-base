import {Model} from "../Model";
import {API} from "../Api";

export class ModuleSubmodule extends Model {

    constructor ( id, data, options = {} ) {
        super( API.END_POINTS.SECURITY.MODULE_SUBMODULE(id), data, options );
    }
}
