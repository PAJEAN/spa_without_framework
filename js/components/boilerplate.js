try {
    (function() {
        const COMPONENT_NAME = '';
        
        window.customElements.define(COMPONENT_NAME, class extends HTMLElement {
            constructor() {
                super();
            }
          
            connectedCallback() {
            }
          
            disconnectedCallback() {
            }
        });
    })()
}
catch (err) {
    console.error(err);
}