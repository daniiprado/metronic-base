import {Model} from "../Model";
import {API} from "../Api";

export class BusinessUnity extends Model {
    constructor ( data, options = {} ) {
        super( API.END_POINTS.CUSTOMERS.UNITY.ROOT, data, options );
    }

    datatable(){
        return this.get( API.END_POINTS.CUSTOMERS.UNITY.DATATABLE )
    }
}
