export const getters = {
    'is_auth': (state, key) => state['is_authentication'] ? state['is_authentication'] : false,
    'roles': (state, key) => state['roles'] ? state['roles'] : []
}