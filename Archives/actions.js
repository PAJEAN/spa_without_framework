export const actions = {
    todoAddItem(context, payload) {
        context.commit('TODO_ADD_ITEM', payload);
    },
    clearItem(context, payload) {
        context.commit('CLEAR_ITEM', payload);
    },
    checkItem(context, payload) {
        context.commit('CHECK_ITEM', payload);
    },
    getTodoItems(context) {
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open('GET', `https://jsonplaceholder.typicode.com/todos`);
            xhr.onload = () => {
                context.commit('getTodoItems', JSON.parse(xhr.responseText));
                resolve();
            }
            xhr.onerror = () => reject(xhr.statusText);
            xhr.send();
        });
    }
}