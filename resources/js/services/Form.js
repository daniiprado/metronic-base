import {Errors} from "./Errors";

export class Form {

    constructor(data, options = {}) {
        this.originalData = data;
        this.options = options;

        for (let field in data) {
            this[field] = data[field];
        }
        this.errors = new Errors()
    }

    reset() {
        for (let field in this.originalData) {
            if ( typeof this[field] === 'boolean') {
                this[field] = false;
            } else {
                this[field] = null;
            }
        }
        this.errors.clear();
    }

    data() {
        let data = {};
        for (let property in this.originalData){
            data[property] = this[property]
        }
        return data;
    }

    submit(method, url) {
        return new Promise((resolve, reject) => {
            method = method.toLowerCase();
            let request = ( method === 'get' || method === 'delete' )
                        ? axios[method]( url, this.options )
                        : axios[method]( url, this.data(), this.options );

            request.then( (response) => {
                    this.onSuccess();
                    resolve( response.data );
                } )
                .catch( (error)  => {
                    if ( error.hasOwnProperty('response') ) {
                        this.onFail( error.response.data );
                        reject( error.response.data );
                    }
                    reject(error);
                })
        })
    }

    post(url) {
        return this.submit('POST', url);
    }

    get(url) {
        return this.submit('GET', url);
    }

    put(url) {
        return this.submit('PUT', url);
    }

    delete(url) {
        return this.submit('DELETE', url)
    }

    patch(url) {
        return this.submit('PATCH', url);
    }

    onSuccess() {
        this.reset();
    }

    onFail(errors) {
        this.errors.record( errors.error )
    }
}
