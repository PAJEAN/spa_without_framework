try {
    (function() {
        const COMPONENT_NAME = 'app-pagination';
        
        const COMPONENT_TEMPLATE = document.createElement('template');
        COMPONENT_TEMPLATE.innerHTML = `
            <style>
                * {
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                }
                #main {
                    min-width: min-content;
                }
                ul {
                    margin: 0 auto;
                    display: flex;
                    justify-content: center;
                    list-style-type: none;
                    background: linear-gradient(#dfe4ea, #c2c7cc);
                    border-radius: 0 0 var(--border-radius) 0;
                }
                ul li {
                    padding: 5px 10px 5px 10px;
                    text-align: center;
                    margin: 5px;
                    border-radius: 5px;
                    box-shadow: inset   0 5px 10px rgba(0,0,0,0.1),
                                        0 2px 5px rgba(0,0,0,0.5);
                    background: #dfe4ea;
                    cursor: pointer;
                }
                ul li:first-child {
                    border-radius: 20px 0 0 20px;
                }
                ul li:last-child {
                    border-radius: 0px 20px 20px 0px;
                }
                ul li.active,
                ul li:hover {
                    background: linear-gradient(#74a4d5, #316cb0);
                    color: #fff;
                }
            </style>
            <div id="main"></div>
        `;

        window.customElements.define(COMPONENT_NAME, class extends HTMLElement {
            constructor() {
                super();
                this.attachShadow({mode: 'open'});
                this.shadowRoot.appendChild(COMPONENT_TEMPLATE.content.cloneNode(true));
                this.content = this.shadowRoot.querySelector('#main');
            }

            get perPage() {
                return parseInt(this.getAttribute('per-page')) || 10;
            }

            get currentPage() {
                return parseInt(this.getAttribute('current-page')) || 1;
            }

            set currentPage(new_value) {
                this.setAttribute('current-page', new_value);
            }

            get totalRows() {
                return parseInt(this.getAttribute('total-rows')) || 1;
            }

            get nbPage() {
                return Math.ceil(this.totalRows / this.perPage);
            }

            render() {
                let ul_tag = document.createElement('ul');
                let li_tag = document.createElement('li');
                li_tag.textContent = '<';
                ul_tag.appendChild(li_tag);

                for(let i = 0; i < this.nbPage; i++) {
                    li_tag = document.createElement('li');
                    if ((i + 1) == this.currentPage) {
                        li_tag.classList.add('active');
                    }
                    li_tag.setAttribute('data-page', (i+1));
                    li_tag.textContent = i + 1;
                    ul_tag.appendChild(li_tag);
                }

                li_tag = document.createElement('li');
                li_tag.textContent = '>';
                ul_tag.appendChild(li_tag);

                this.content.appendChild(ul_tag);

                this.shadowRoot.querySelector('li:first-child').addEventListener('click', () => {
                    this.currentPage > 1 ? this.currentPage -= 1 : null;
                });
                this.shadowRoot.querySelector('li:last-child').addEventListener('click', () => {
                    this.currentPage < this.nbPage ? this.currentPage += 1 : null;
                });

                this.shadowRoot.querySelectorAll('li[data-page]').forEach((li) => {
                    li.addEventListener('click', () => {
                        this.currentPage = li.getAttribute('data-page');
                    });
                });
            }
          
            connectedCallback() {
                this.render();
            }
          
            disconnectedCallback() {}
        });
    })()
}
catch (err) {
    console.error(err);
}