import { store } from '../../store/index.js';

try {
    (function() {
        const COMPONENT_NAME = 'todo-list';

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
                margin: 0 auto;
                background-color: #fff;
                border: 1px solid #c1c1c1;
                border-radius: 0 0 var(--border-radius) 0;
            }
            ul {
                list-style-type: none;
            }
            li {
                padding: 5px;
                display: flex;
                align-items: center;
            }
            .odd-line {
                background-color: #ecf2fe;
            }
            a {
                text-decoration: none;
                color: black;
            }
            a:hover {
                text-decoration: underline;
            }
            input[type=checkbox] {
                width: 1.25rem;
                height: 1.25rem;
                margin-right: 5px;
            }
            .delete {
                text-align: center;
                margin-right: 20px;
                background: #ff6f47;
                border: none;
                border-radius: var(--border-radius);
                box-shadow: var(--box-shadow);
                cursor: pointer;
            }
            .delete svg {
                width: 1.25rem;
                height: 1.25rem;
            }
            </style>
            <div id="main"></div>
        `;

        const SVG_TRASH = `
        <svg viewBox="-75 -70 512 512" xmlns="http://www.w3.org/2000/svg">
            <path fill="white" d="m232.398438 154.703125c-5.523438 0-10 4.476563-10 10v189c0 5.519531 4.476562 10 10 10 5.523437 0 10-4.480469 10-10v-189c0-5.523437-4.476563-10-10-10zm0 0"></path>
            <path fill="white" d="m114.398438 154.703125c-5.523438 0-10 4.476563-10 10v189c0 5.519531 4.476562 10 10 10 5.523437 0 10-4.480469 10-10v-189c0-5.523437-4.476563-10-10-10zm0 0"></path>
            <path fill="white" d="m28.398438 127.121094v246.378906c0 14.5625 5.339843 28.238281 14.667968 38.050781 9.285156 9.839844 22.207032 15.425781 35.730469 15.449219h189.203125c13.527344-.023438 26.449219-5.609375 35.730469-15.449219 9.328125-9.8125 14.667969-23.488281 14.667969-38.050781v-246.378906c18.542968-4.921875 30.558593-22.835938 28.078124-41.863282-2.484374-19.023437-18.691406-33.253906-37.878906-33.257812h-51.199218v-12.5c.058593-10.511719-4.097657-20.605469-11.539063-28.03125-7.441406-7.421875-17.550781-11.5546875-28.0625-11.46875h-88.796875c-10.511719-.0859375-20.621094 4.046875-28.0625 11.46875-7.441406 7.425781-11.597656 17.519531-11.539062 28.03125v12.5h-51.199219c-19.1875.003906-35.394531 14.234375-37.878907 33.257812-2.480468 19.027344 9.535157 36.941407 28.078126 41.863282zm239.601562 279.878906h-189.203125c-17.097656 0-30.398437-14.6875-30.398437-33.5v-245.5h250v245.5c0 18.8125-13.300782 33.5-30.398438 33.5zm-158.601562-367.5c-.066407-5.207031 1.980468-10.21875 5.675781-13.894531 3.691406-3.675781 8.714843-5.695313 13.925781-5.605469h88.796875c5.210937-.089844 10.234375 1.929688 13.925781 5.605469 3.695313 3.671875 5.742188 8.6875 5.675782 13.894531v12.5h-128zm-71.199219 32.5h270.398437c9.941406 0 18 8.058594 18 18s-8.058594 18-18 18h-270.398437c-9.941407 0-18-8.058594-18-18s8.058593-18 18-18zm0 0"></path>
            <path fill="white" d="m173.398438 154.703125c-5.523438 0-10 4.476563-10 10v189c0 5.519531 4.476562 10 10 10 5.523437 0 10-4.480469 10-10v-189c0-5.523437-4.476563-10-10-10zm0 0"></path>
        </svg>`;
    
        window.customElements.define(COMPONENT_NAME, class extends HTMLElement {
            constructor() {
                super();
                /* Shadow Root */
                this.attachShadow({mode: 'open'});
                this.shadowRoot.appendChild(TEMPLATE.content.cloneNode(true));
                this.content = this.shadowRoot.querySelector('#main');
                /* Local Attributes */
                this.current_page = 1;
                this.per_page = 20;
                /* Binding */
                this.render = this.render.bind(this);
            }

            render() {
                /*
                    Ajouter une barre de recherche et un filtre sur les utilisateurs.
                    Lien clicable sur les titres pour aller sur une autre page.
                    Ajout d'une nouvelle todo (en fonction d'un utilisateur).
                */
                this.content.innerHTML = '';
                let items = store.state.todo_items;
                if (store.state.todo_filterUserId !== '') {
                    items = items.filter((item) => item.userId == parseInt(store.state.todo_filterUserId));
                }
                if (store.state.todo_filterText !== '') {
                    items = items.filter((item) => item.title.indexOf(store.state.todo_filterText) >= 0);
                }

                /* Update current_page when user delete all data from a page */
                let nb_page = Math.ceil(items.length / this.per_page);
                if (nb_page > 0 && this.current_page > nb_page) {
                    this.current_page = nb_page;
                }

                let min = (this.current_page - 1) * this.per_page;
                let max = (this.current_page * this.per_page) < items.length ? (this.current_page * this.per_page) :  items.length ;
                
                if (items.length === 0) {
                    this.content.innerHTML = `<p> No item found </p>`;
                    return;
                }
        
                let pagination = document.createElement('app-pagination');
                pagination.setAttribute('current-page', this.current_page);
                pagination.setAttribute('per-page', this.per_page);
                pagination.setAttribute('total-rows', items.length);

                let ul_tag = document.createElement('ul');
                let li_tag;
                for (let i = min; i < max; i++) {
                    li_tag = document.createElement('li');
                    if ((i % 2) == 1) {
                        li_tag.classList.add('odd-line');
                    }
                    li_tag.innerHTML = `
                        <input type="checkbox" value="${items[i].id}" ${items[i].completed ? 'checked': ''}>
                        <button class="delete" data-delete="${items[i].id}"> ${SVG_TRASH} </button>
                        <div class="todo-title"><a href="#/todo/${items[i].id}">${items[i].completed ? `<s>${items[i].title}</s>` : items[i].title}</a></div>`;
                    ul_tag.appendChild(li_tag);
                }
                
                this.content.appendChild(ul_tag);
                this.content.appendChild(pagination);

                /* Events */
                this.shadowRoot.querySelectorAll('input[type=checkbox]').forEach((input) => {
                    input.addEventListener('change', () => {
                        store.dispatch('todoCheckItem', input.getAttribute('value'));
                    });
                });

                this.shadowRoot.querySelectorAll('.delete').forEach((button) => {
                    button.addEventListener('click', () => {
                        store.dispatch('todoClearItem', button.getAttribute('data-delete'));
                    });
                });

                let observer = new MutationObserver((mutations) => {
                    mutations.forEach((mutation) => {
                        if (mutation.type == 'attributes') {
                            if (mutation.attributeName == 'current-page') {
                                this.current_page = pagination.getAttribute('current-page');
                                this.render();
                            }
                        }
                    });
                });
                observer.observe(pagination, {
                    attributeFilter: ['current-page'] // Configure it to listen to attribute changes.
                });
            }
          
            connectedCallback() {
                this.render();
                this.unsubscribe = store.events.subscribe('stateChange', this.render);
            }
          
            disconnectedCallback() {
                this.unsubscribe();
            }
        });
    })()
}
catch (err) {
    console.error(err);
}