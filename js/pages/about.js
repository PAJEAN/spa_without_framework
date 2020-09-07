try {
    (function() {
        const name = 'about-page';

        window.customElements.define(name, class extends HTMLElement {
            constructor() {
                super();
            }

            render() {
                this.innerHTML = `
                    <h1> About page </h1>
                    <a href="#/home">Home</a>
                `;
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

