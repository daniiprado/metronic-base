const getters = {
    getToken: (state) => {
        if (!state.access_token) { return null }
        return 'Bearer ' + state.access_token
    },
    getHeaders: (state) => {
        if (!state.access_token) { return null }
        return {
            'Accept': 'application/json',
            'Content/Type': 'application/json',
            'Authorization': 'Bearer ' + state.access_token
        }
    },
    getExpiresIn: (state) => (state.expires_in) ? state.expires_in : 0,
    authUser: (state)   =>  {
        return {
            id: state.user_id,
            name: state.user_name,
            email: state.email ,
            company: state.company,
        }
    },
    userPermissions: (state) => state.permissions,
    userRoles: (state) => state.roles,
};

export default getters;
