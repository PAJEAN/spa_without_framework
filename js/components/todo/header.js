import { store } from '../../store/index.js';

try {
    (function() {
        const COMPONENT_NAME = 'todo-header';
        
        const TEMPLATE = document.createElement('template');
        TEMPLATE.innerHTML = `
            <style>
            :root {
                --component-width: 650px;
                --input-height: 30px;
            }
            * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
            }
            #main {
                width: var(--component-width);
                margin: 0 auto 0 auto;
                display: flex;
            }
            input[type=text] {
                width: 100%;
                padding-left: 5px;
                border-radius: var(--border-radius) var(--border-radius) 0 0;
            }
            input[type=text]::placeholder {
                font-family: var(--font-family);
            }
            select,
            input[type=text] {
                height: var(--input-height);
            }
            input[type=text],
            select,
            select option {
                font-family: var(--font-family);
            }
            </style>
            <div id="main"></div>
        `;

        window.customElements.define(COMPONENT_NAME, class extends HTMLElement {
            constructor() {
                super();
                /* Shadow Root */
                this.attachShadow({mode: 'open'});
                this.shadowRoot.appendChild(TEMPLATE.content.cloneNode(true));
                this.content = this.shadowRoot.querySelector('#main');
            }

            render() {
                /* Header */
                let select_tag = document.createElement('select');
                let option_tag = document.createElement('option');
                option_tag.setAttribute('value', '');
                option_tag.innerHTML = `-- Filter by user --`;
                select_tag.appendChild(option_tag);
                store.state.todoUsersId.forEach((user_id) => {
                    option_tag = document.createElement('option');
                    option_tag.setAttribute('value', user_id);
                    option_tag.innerHTML = `User n°${user_id}`;
                    if (user_id == store.state.todo_filterUserId) {
                        option_tag.setAttribute('selected', '');
                    }
                    select_tag.appendChild(option_tag);
                })

                let input_filter_tag = document.createElement('input');
                input_filter_tag.setAttribute('type', 'text');
                input_filter_tag.setAttribute('value', store.state.todo_filterText);
                input_filter_tag.setAttribute('placeholder', 'Search a todo');

                this.content.appendChild(input_filter_tag);
                this.content.appendChild(select_tag);

                input_filter_tag.addEventListener('input', () => {
                    store.dispatch('todoEditFilterText', input_filter_tag.value);
                })

                select_tag.addEventListener('change', () => {
                    store.dispatch('todoEditFilterUserId', select_tag.value);
                });
            }

            connectedCallback() {
                this.render();
            }
          
            disconnectedCallback() {
            }
        });
    })()
}
catch (err) {
    console.error(err);
}