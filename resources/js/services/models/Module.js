import {Model} from "../Model";

export class Module extends Model {

    constructor ( data ) {
        super( '/api/module', data );
    }

}
