import {Model} from "../Model";
import {API} from "../Api";

export class Submodule extends Model {

    constructor( data ) {
        super( API.END_POINTS.SECURITY.SUBMODULES.ROOT, data );
    }

}
