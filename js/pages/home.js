import { store } from '../store/index.js';

try {
    (function() {
        const name = 'home-page';

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
            .add-todo {
                width: var(--component-width);
                margin: 15px auto 0 auto;
                display: flex;
                align-items: center;
                text-align: center;
                box-shadow: var(--box-shadow);
                border-radius: var(--border-radius);
            }
            hr {
                margin: 20px;
            }
            input[type=text] {
                width: 100%;
                height: var(--input-height);
                padding-left: 5px;
                border-radius: var(--border-radius) 0 0 var(--border-radius);                
            }
            select, 
            button {
                height: var(--input-height);
                cursor: pointer;
            }
            button {
                background: #87aa25;
                padding: 0 40px 0 40px;
                border: 1px solid #87aa25;
                border-radius: 0 var(--border-radius) var(--border-radius) 0;
            }
            </style>
            <div id="main"></div>
        `;

        const SVG_VALID = `
        <svg viewBox="0 -36 509.248 509" height="11pt" width="11pt" xmlns="http://www.w3.org/2000/svg">
            <path d="m171.902344 438.074219-171.902344-171.902344 100.625-100.609375 71.277344 71.296875 236.722656-236.734375 100.621094 100.621094zm0 0" fill="#addb31"/>
            </svg>
        `

        window.customElements.define(name, class extends HTMLElement {
            constructor() {
                super();
                this.render = this.render.bind(this);
            }

            render() {
                /* https://html.spec.whatwg.org/multipage/custom-elements.html#custom-element-conformance */
                this.appendChild(TEMPLATE.content.cloneNode(true));
                let content = this.querySelector('#main');
                
                let select_tag = document.createElement('select');
                let option_tag = document.createElement('option');
                store.state.todoUsersId.forEach((user_id) => {
                    option_tag = document.createElement('option');
                    option_tag.setAttribute('value', user_id);
                    option_tag.innerHTML = `User n°${user_id}`;
                    select_tag.appendChild(option_tag);
                })                

                content.innerHTML = `
                    <main>
                        <h1> TodoList </h1>
                        <div class="add-todo">
                            <input id="todoText" type="text" placeholder="Add a todo">
                            ${select_tag.outerHTML}
                            <button id="addTodo"> ${SVG_VALID} </button>
                        </div>

                        <hr>

                        <div class="todo-list">
                            <todo-header></todo-header>
                            <todo-list></todo-list>
                        </div>
                    </main>
                `;

                content.querySelector("#addTodo").addEventListener('click', () => {
                    select_tag = content.querySelector("select");
                    console.log(select_tag.value);
                    store.dispatch('todoAddItem', {
                        userId: select_tag.value,
                        title: document.querySelector('#todoText').value,
                        id: store.state.todoLastId + 1,
                        completed: false
                    });
                });
            }
          
            /*
                On peut rapidement surcharger une page de cette manière si on déporte tout dessus ?
                Dans vue.js on peut créer des composants intermédiaires qui peuvent réagir aux changements d'état et avoir un store.
                Sinon, si plusieurs éléments ont une pagination, on ne va s'en sortir sur la page.
                Décomposer 'component' par UI et une autre catégorie qui exploite les UI (qui n'emploient pas de store).
                Ou alors, les composants ont accès au store ?
                Sinon, la réactivité doit s'effectuer sur un élément plus haut (surcharge potentiel de plusieurs éléments non nécessaires).
                Ou encore une fois avoir des éléments intermédiaires ?
                -> Qui regroupent des sous-ensembles. <-
            */
            connectedCallback() {
                if (store.state.todoItemsLength === 0) {
                    store.dispatch('todoGetTodoItems').then(() => {
                        this.render();
                    })
                    .catch(err => console.error(err));
                }
                else {
                    this.render();
                }
            }
          
            disconnectedCallback() {}
        });
    })()
}
catch (err) {
    console.error(err);
}

