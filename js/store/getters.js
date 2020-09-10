export const getters = {
    'is_auth': (state) => state['is_authentication'] ? state['is_authentication'] : false,
    'roles': (state) => state['roles'] ? state['roles'] : []
}