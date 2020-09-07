try {
    (function() {
        const ROUTER = 'app-router';
        const ROUTE = 'app-route';
        const OUTLET = 'app-outlet';

        /* /animaux/felins/chats */
        function parseTokens(uri) {
            return uri
                .split('/')
                .filter(token => {
                    return token !== '';
                });
        }

        window.customElements.define(ROUTER, class extends HTMLElement {
            constructor() {
                super();
                this.current_route;
                this._handlePopstate = this._handlePopstate.bind(this);
            }

            get routes() {    
                return Array.from(this.querySelectorAll(ROUTE))
                    .filter(node => node.parentNode === this)      
                    .map(node => ({
                        path: node.getAttribute('path'),
                        title: node.getAttribute('title'), 
                        component: node.getAttribute('component')
                    }));
            }

            get defaultRoute() {
                let default_route = null;
                let route = this.querySelector(`${ROUTE}[is-default]`);
                if (route) {
                    default_route = {
                        path: route.getAttribute('path'),
                        title: route.getAttribute('title'),
                        component: route.getAttribute('component')
                    };
                }
                return default_route; 
            }

            get outlet() {
                return this.querySelector(OUTLET);
            }

            _navigate(url) {
                let matched_route = this._match(url);
                if (matched_route) {
                    this.current_route = matched_route;
                    window.history.pushState(null, null, url);
                    this._update();
                }
                else if (this.defaultRoute) {
                    // window.history.replaceState(null, null, `${window.location.origin}${this.defaultRoute.path}`);
                    console.log('isDefault');
                    this.current_route = this.defaultRoute;
                    this._update();
                }
                else {
                    console.warn(`No matched page found`);
                }
            }

            _match(uri) {
                const param_re = /^:(.+)/;
                const [uri_pathname] = uri.split('?');
                const uri_tokens = parseTokens(uri_pathname);
                console.log(uri);
                let match, route_tokens, max, uri_token, route_token, missed, params, dynamic_match;
                for (let route of this.routes) {
                    console.log(route.path, uri_tokens);
                    route_tokens = parseTokens(route.path);
                    max = Math.max(route_tokens.length, uri_tokens.length);
                    missed = false;
                    params = {};
                    for (let i = 0; i < max; i++) {
                        uri_token = uri_tokens[i];
                        route_token = route_tokens[i];
                        if (uri_token === undefined) {
                            missed = true;
                            break;
                        }

                        dynamic_match = param_re.exec(route_token);
                        if (dynamic_match) {
                            params[dynamic_match[1]] = uri_token;
                        }
                        else if (uri_token !== route_token) {
                            missed = true;
                            break;
                        }
                    }

                    if (!missed) {
                        match = {params, ...route};
                        break;
                    }
                }
                return match;
            }

            _update() {
                const {component, title, params = {}} = this.current_route;
                if (component) {
                    this.outlet.textContent = '';
                    const view = document.createElement(component);
                    document.title = title || document.title;
                    for (let param in params) {
                        view.setAttribute(param, params[param]);
                    }
                    this.outlet.appendChild(view);
                }
            }
          
            connectedCallback() {
                console.log(window.location.pathname);
                this._navigate(window.location.pathname);
                this.addEventListener('popstate', this._handlePopstate);
            }
          
            disconnectedCallback() {
                this.removeEventListener('popstate', this._handlePopstate);
            }

            _handlePopstate() {
                this._navigate(window.location.pathname);
            }
        });
    
    })()
}
catch (err) {
    console.error(err);
}