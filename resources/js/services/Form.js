import {Errors} from "./Errors";

export class Form {

    constructor(data) {
        this.originalData = data;

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
            axios[method]( url, this.data() )
                .then( (response) => {
                    this.onSuccess( response.data );
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

    onSuccess(response) {
        this.reset();
    }

    onFail(errors) {
        this.errors.record( errors.error )
    }
}
