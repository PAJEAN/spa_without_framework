import { actions } from './actions.js';
import { mutations } from './mutations.js';
import { getters } from './getters.js';
import { state } from './state.js';
import { Store } from './store.js';
/* Modules */
import { module as todo } from './modules/todo.js';

export const store = new Store({
    'actions': Object.assign(actions, todo.actions), // Object.assign(cible, ...sources).
    'mutations': Object.assign(mutations, todo.mutations),
    'getters': Object.assign(getters, todo.getters),
    'state': Object.assign(state, todo.state)
});