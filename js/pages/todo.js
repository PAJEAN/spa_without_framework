import { store } from '../store/index.js';

try {
    (function() {
        const name = 'todo-detail-page';

        const TEMPLATE = document.createElement('template');
        TEMPLATE.innerHTML = `
            <style>
            :root {
                --component-width: 650px;
            }
            * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
            }
            .details {
                width: var(--component-width);
                margin: 15px auto;
                padding: 15px;
                border: 1px dashed #c1c1c1;
                background: #ecf2fe;
            }
            legend {
                text-transform: uppercase;
            }
            ul {
                list-style-type: none;
            }
            div.back {
                width: 100%;
                text-align: center;
            }
            </style>
            <div id="main"></div>
        `;

        window.customElements.define(name, class extends HTMLElement {
            constructor() {
                super();
                this.todo_id;
            }

            render() {
                this.appendChild(TEMPLATE.content.cloneNode(true));
                let content = this.querySelector('#main');

                
                const items = store.state.todo_items;
                let i = 0, found = false, item;
                while(i < items.length && !found) {
                    if (items[i].id == this.todo_id) {
                        item = items[i];
                        found = true;
                    }
                    i += 1;
                }

                if (item) {
                    content.innerHTML = `
                    <h1> Detail </h1>
                    <fieldset class="details">
                        <legend>Todo</legend>
                        <ul>
                            <li> <b>ID</b>: ${item.id} </li>
                            <li> <b>User ID</b>: ${item.userId} </li>
                            <li> <b>Title</b>: ${item.title} </li>
                            <li> <b>Completed</b>: ${item.completed} </li>
                        </ul>
                    </fieldset>
                    <div class="back">
                        <a href="#/home"> Revenir à la <i>todolist</i> </a>
                    </div>
                    `;
                }
                
            }
          
            connectedCallback() {
                /* If user come directly here, todo are not loaded */
                if (this.hasAttribute('todo-id')) {
                    this.todo_id = parseInt(this.getAttribute('todo-id'));
                }
                store.state.todo_items.length > 0 ? this.render() : window.location = '#';
            }
          
            disconnectedCallback() {}
        });
    })()
}
catch (err) {
    console.error(err);
}