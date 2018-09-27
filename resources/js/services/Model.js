import {Form} from "./Form";


export class Model extends Form {

    constructor( url, data ) {
        super(data);
        this.url = url;
    }

    index () {
        return this.get( this.url )
    }

    show (id) {
        return this.get(`${this.url}/${id}`)
    }

    store() {
        return this.post( this.url );
    }

    update( id ) {
        return this.put( `${this.url}/${id}` );
    }

    destroy( id ) {
        return this.delete( `${this.url}/${id}` ) ;
    }
}
