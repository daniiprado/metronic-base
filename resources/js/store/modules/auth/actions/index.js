import {API} from "../../../../services/Api";
import {Form} from "../../../../services/Form";

const actions = {

    login: ({commit}, user) => {

        let api = new Form({
            grant_type: API.GRANT_TYPE,
            client_id: API.CLIENT_ID,
            client_secret: API.CLIENT_SECRET,
            username: user.email,
            password: user.password
        });

        return new Promise((resolve, reject) => {
            api.post('/oauth/token')
                .then((response) => {
                    response.expires_in = parseInt(response.expires_in) + Date.now();
                    commit('LOGIN', response);
                    resolve( response );
                })
                .catch(error => reject(error))
        })
    },

    logout: ({commit}) => {
        commit('LOGOUT')
    },

    auth_user: ({commit}, user) => {
        return new Promise((resolve, reject) => {
            axios.get('/user')
                .then((response) => {
                    console.log()
                    commit('USER', response.data);
                    if (response.data.permissions) {
                        commit('PERMISSIONS', response.data.permissions)
                    }
                    resolve(response.data)
                })
        })
    }
};

export default actions
