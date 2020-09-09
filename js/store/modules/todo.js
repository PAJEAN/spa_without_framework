const NAMESPACE = 'todo';

export const module = {
    state: {
        [NAMESPACE + '_items']: [],
        [NAMESPACE + '_filterText']: '',
        [NAMESPACE + '_filterUserId']: ''
    },
    actions: {
        [NAMESPACE + 'AddItem'](context, payload) {
            context.commit(NAMESPACE + 'ADD_ITEM', payload);
        },
        [NAMESPACE + 'ClearItem'](context, payload) {
            context.commit('CLEAR_ITEM', payload);
        },
        [NAMESPACE + 'CheckItem'](context, payload) {
            context.commit('CHECK_ITEM', payload);
        },
        [NAMESPACE + 'GetTodoItems'](context) {
            return new Promise((resolve, reject) => {
                const xhr = new XMLHttpRequest();
                xhr.open('GET', `https://jsonplaceholder.typicode.com/todos`);
                xhr.onload = () => {
                    context.commit(NAMESPACE + 'GET_TODO_ITEMS', JSON.parse(xhr.responseText));
                    resolve();
                }
                xhr.onerror = () => reject(xhr.statusText);
                xhr.send();
            });
        },
        [NAMESPACE + 'EditFilterText'](context, payload) {
            context.commit(NAMESPACE + 'EDIT_FILTER_TEXT', payload);
        },
        [NAMESPACE + 'EditFilterUserId'](context, payload) {
            context.commit(NAMESPACE + 'EDIT_FILTER_ID', payload);
        }
    },
    mutations: {
        [NAMESPACE + 'ADD_ITEM'](state, payload) {
            state.todo_items = [payload, ...state.todo_items];
        },
        CLEAR_ITEM(state, payload) {
            payload = parseInt(payload);
            state.todo_items = state.todo_items.filter(item => item.id !== payload);
        },
        CHECK_ITEM(state, payload) {
            payload = parseInt(payload);
            let todo_items = Object.assign([], state.todo_items);
            let i = 0, found = false;
            while (i < todo_items.length && !found) {
                if (todo_items[i].id == payload) {
                    todo_items[i].completed = !todo_items[i].completed;
                    found = true;
                }
                i += 1;
            }
            state.todo_items = todo_items;
        },
        [NAMESPACE + 'GET_TODO_ITEMS'](state, payload) {
            state.todo_items = payload;
        },
        [NAMESPACE + 'EDIT_FILTER_TEXT'](state, payload) {
            state.todo_filterText = payload;
        },
        [NAMESPACE + 'EDIT_FILTER_ID'](state, payload) {
            state.todo_filterUserId = payload;
        }
    },
    getters: {
        [NAMESPACE + 'ItemsLength']: (state, key) => state.todo_items.length,
        // [NAMESPACE + 'LastId']: (state, key) => state.todo_items[(state.todo_items.length - 1)].id,
        [NAMESPACE + 'LastId']: (state, key) => state.todo_items.reduce((acc, elmt) => parseInt(elmt.id) > parseInt(acc) ? elmt.id : acc, state.todo_items.length > 0 ? state.todo_items[0].id : 0),
        [NAMESPACE + 'UsersId']: (state, key) => state.todo_items.reduce((acc, item) => {
            if (acc.indexOf(parseInt(item.userId)) == -1)
                acc.push(parseInt(item.userId))
            return acc;
        }, []).sort((a,b) => a - b)
    }
}