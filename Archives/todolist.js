import { store } from '../store/index.js';

/*
    Supprimer le store et la fonction render. Jouer uniquement avec les slot (et les names).
    La logique s'effectue au niveau de la page.
*/

try {
    (function() {
        const TODOLIST = 'app-todolist';
    
        const todo_list_template = document.createElement('template');
        todo_list_template.innerHTML = `
            <style>
            :host {
                color: green;
            }
            div {
                border: 1px green dashed;
            }
            </style>
            <div></div>
        `;
    
        window.customElements.define(TODOLIST, class extends HTMLElement {
            static get observedAttributes() {
                return ['max'];
            }

            constructor() {
                super();
                this.attachShadow({mode: 'open'});
                this.shadowRoot.appendChild(todo_list_template.content.cloneNode(true));
                this.content = this.shadowRoot.querySelector('div');
                /* Binding this */
                this.render = this.render.bind(this);
            }

            get min() {
                return parseInt(this.getAttribute('min')) || 0;
            }

            get max() {
                return parseInt(this.getAttribute('max')) || 5;
            }
        
            render() {
                const items = store.state.todo_items;
                
                if (items.length === 0) {
                    this.content.innerHTML = `<p> No item found </p>`;
                    return;
                }
        
                let li_tags = '';
                for (let i = this.min; i < this.max; i++) {
                    li_tags += `<li> ${items[i].title} <button data-delete="${items[i].id}"> Del </button> </li>`;
                }
                this.content.innerHTML = `
                    <ul>
                        ${li_tags}
                    </ul>
                    <button data-preceding> <-- </button> <button data-next> --> </button>
                `;
        
                this.shadowRoot.querySelectorAll('button[data-delete]').forEach((button) => {
                    button.addEventListener('click', () => {
                        store.dispatch('clearItem', button.getAttribute('data-delete')).then((data) => {
                            console.log(`Object ${data}`);
                        }).catch(() => console.log('lol'));
                    });
                });
                this.shadowRoot.querySelector('button[data-preceding]').addEventListener('click', () => {
                    this.setAttribute('min', this.min > 5 ? this.min - 5 : 0);
                    this.setAttribute('max', this.max <= 5 ? this.max : this.max - 5);
                });
                this.shadowRoot.querySelector('button[data-next]').addEventListener('click', () => {
                    this.setAttribute('min', this.min + 5);
                    this.setAttribute('max', this.max + 5);
                });
            }
          
            connectedCallback() {
                // Promise.all([
                //     window.customElements.whenDefined('app-pagination')
                // ])
                // .then(_ => {
                //     console.log("???????");
                // });
                this.render();
                this.unsubscribe = store.events.subscribe('stateChange', this.render);
            }
          
            disconnectedCallback() {
                this.unsubscribe();
            }

            attributeChangedCallback(name, oldValue, newValue) {
                this.render();
            }
        });
    
    })()
}
catch (err) {
    console.error(err);
}