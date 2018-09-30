import {Model} from "../Model";
import {API} from "../Api";

export class Company extends Model {
    constructor ( data, options = {} ) {
        super( API.END_POINTS.CUSTOMERS.COMPANY.ROOT, data, options );
    }

    datatable(){
        return this.get( API.END_POINTS.CUSTOMERS.COMPANY.DATATABLE )
    }
}
