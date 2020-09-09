# Single Page Application without JS frameworks or libraries: a Todolist example

<p align="center">
    <img src="images/readme/todolist_app.png" width="300">
    <p align="center"> Preview of the todolist application </p>
</p>

## Run the application

```
git clone https://github.com/PAJEAN/spa_without_framework
cd spa_without_framework
node server.js
```

And go to http://localhost:8000/.

<p align="justify">
The application makes a ajax call to get fake todos on <a href="https://jsonplaceholder.typicode.com/guide.html">jsonplaceholder</a>, the returned json includes 200 todos from 10 different users (20 todos / user).
</p>

```
{
  "userId": 10,
  "id": 191,
  "title": "temporibus atque distinctio omnis eius impedit tempore molestias pariatur",
  "completed": true
}
```

Application allows to:
* Add new todos to a specific user.
* Delete a todo from the list.
* Check / Uncheck a todo.
* Filter todo by title.
* Filter todo by user.
* See details of a todo by clicking on it.

## Some context

<p align="justify">
This project aims to build a full <i>single page application</i> in vanilla Javascript without any frameworks or libraries with : i) a component-based approach (using <i>customElements</i> objects, templates and shadow root), ii) a central state manager (derived from the Vuex logic) and iii) a router to navigate between pages.
It allowed me to demystify some aspects of modern frameworks and at the same time to program my own adjustable JS architecture to develop future (little and modest) projects.
One of my initial motivations was to see if is it possible to not depend of modern frameworks, with a component-based approach and a scalable architecture. This desire comes from with the multiplication of JS development Frameworks (Angular, React, Vue, Ember, Svelte, etc. - who is next ?) and their fast updates where some of them ask to developers to refactoring pieces of codes. I'm not here to demonize them, it offers different ways to neatly think and build a project and it facilitates some aspects of the development. However, we can easily be lost in the choice of the needed technology (some subjective benchmarks don't help us) and developers can be quickly submitted by clients/companies to learn (again and again) a new technology (to do a thing that it can develop otherwise) or by the technology itself (with it's fast obsolescence).
I will not lie, I only used Vuejs and a little bit of ReactJs, so I'm not here to share religious words. I'm just a curious programer with the will to discover more about what's under the hood.
</p>

<p align="justify">
My initial researches about this project led me to the interesting Nicholas C. Zakas's talk (<a href="https://fr.slideshare.net/nzakas/scalable-javascript-application-architecture">ref</a>) about scalable JS applications. This talk dates from 2009 so, long before ES6 and modern frameworks, but it's a really good reading on how to modularize and extend a Javascript project (if you are interesting by some implementations: <a href="https://code.tutsplus.com/tutorials/writing-modular-javascript--net-14746">Andrew Burgess</a>, <a href="http://scaleapp.org/">scaleapp</a> by Markus Kohlhase, <a href="https://github.com/valentin-lozev/justcore">justcore</a> by Valentin Lozev or <a href="https://github.com/aurajs/aura">aura</a> by Addy Osmani - at the same time I recommend you <a href="https://addyosmani.com/resources/essentialjsdesignpatterns/book/">Learning JavaScript Design Patterns</a> by Addy Osmani).
Then, I started to deepen specifications that I fixed for this project and I begun by the component-based constraint.
</p>

### *customElements* as (reusable) web components

<p align="justify">
<i>customElements</i> specifications offer to us a really good way to design reusable components. Indeed, <i>customElements</i> object allow us to build our own HTML tags with their own logic and allowing us to access to life cycle functions of tags to control what the elements does when it created and when it destroyed. I advise you about a good reading by <a href="https://developers.google.com/web/fundamentals/web-components/customelements">Eric Bidelman</a>. Also, one of the particular benefits is to use shadow root and template tag (with slot) to <u>isolate</u> and stylize our element. I refer you to the Google Chrome Labs post <a href="https://github.com/GoogleChromeLabs/howto-components">howto-components</a> (an enriching read).
</p>

<p align="justify">
Here, my boilerplate to create a new <i>customElements</i>.
</p> 

```
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
```

<p align="justify">
The interest of using self-invoking functions is to declare some specific constants especially our template that we clone after in the shadow root inside our element.
</p>

```
try {
    (function() {
        const COMPONENT_NAME = '';

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
```

<p align="justify">
<i>Nota Bene</i>, we can use css variables of the main css file (here: "./styles/style.css") inside on it.
</p>

<p align="justify">
<i>customElements</i> are universal (it can be included in any recent JS project) and it can be seen like a React component or a Vue component. In my project, I try, as I can, to differentiate reusable <i>UI elements</i> ("./js/components/ui/"), <i>elements dedicated</i> to the application ("./js/components/") and <i>pages</i> ("./js/pages/").
UI elements are elements that I can use in every project without modification (or very light style modifications). A good thing is to use <i>&ltslot name=""&gt</i> tag to then fill in my element with corresponding data.
Concerning elements dedicated to the application, usually it uses my store to dispatch some actions (to edit my state through mutations) and it subscribes to an event to be alert when a modification is done on the state in order to re-render the view.
Finally, pages mix UI and dedicated elements and are inputs of the router. I try to avoid a full re-render of the page when the state is update. I prefer to delegate that to elements using the state.
</p>

### State manager

<p align="justify">
The state manager used for this project is inspired by the article of Andy Bell (<a href="https://css-tricks.com/build-a-state-management-system-with-vanilla-javascript/">ref</a>) on "css-tricks.com". It follows the logic of Vuex where:
<ul>
<li> <i>components</i> can dispatch actions (and subscribe to events) </li>
<li> <i>actions</i> call mutations and can make some asynchronous API calls </li>
<li> <i>mutations</i> change the state which is the single source of truth </li>
</ul>
</p>

<p align="justify">
To make reactive components, the state is wrapped into a <i>Proxy</i> Javascript object that publish a new event when the state has been updated (with the PubSub class). So, all components subscribed to this event can catch it to re-render their view (<i>Nota bene</i>: To call the handle "set" function of a Proxy and be reactive, a reassignment of the state is necessary).
</p>

<p align="center">
    <img src="images/readme/vuex.png" width="300">
    <p align="center"> Vuex workflow </p>
</p>

<p align="justify">
I made some adaptations to the initial code. First, "<i>subscribe()</i>" method of the PubSub class return the unsubscribe method. Then, returns of actions are now a Promise to know in the component context when the action is done. Finally, I added <u>getters</u> and <u>modules</u> notions to the state manager.
The aim of a getter is to return a specific data from our state. To add getters of my application, I changed the handle "get" property of the Proxy object.
</p>

```
get: params.hasOwnProperty('getters')
    ? (state, key) => {
        return key in params.getters ? params.getters[key](state, key) : state[key];
    }
    : (state, key) => state[key]
```

<p align="justify">
Thus, a getter has to be a function with two parameters: state and key where state is a reference of our state and key is the name of our getter.
</p>

```
/* Return the length of the todolist */
itemsLength: (state, key) => state.todo_items.length
```

<p align="justify">
To add modules, I edited the initialisation of the store to add state, actions, mutations and getters of my modules. I kept "state.js", "actions.js" and "mutations.js" files to allow me to put all things unrelated to a specific module.
</p>

```
import { module as todo } from './modules/todo.js';
export const store = new Store({
    'actions': Object.assign(actions, todo.actions),
    'mutations': Object.assign(mutations, todo.mutations),
    'getters': Object.assign(getters, todo.getters),
    'state': Object.assign(state, todo.state)
});
// Object.assign(cible, ...sources).
```

<p align="justify">
Clarification, module notion is near to the Vuex module notion but in this implementation I don't have the concept of <i>local and root state</i>. However to be sure, that all keys of state, actions, mutations and getters objects are unique, I applied a namespacing with the dynamic keys name property of objects.
</p>

```
const NAMESPACE = 'todo';

export const module = {
    state: {
        [NAMESPACE + '_items']: []
    },
    actions: {
        [NAMESPACE + 'AddItem'](context, payload) {
            context.commit(NAMESPACE + 'ADD_ITEM', payload);
        }
    },
    mutations: {
        [NAMESPACE + 'ADD_ITEM'](state, payload) {
            state.todo_items = [payload, ...state.todo_items];
        }
    },
    getters: {
        [NAMESPACE + 'ItemsLength']: (state, key) => state.todo_items.length
    }
}
```

### Router

<p align="justify">
The router is inspired by the Jasim implementation (<a href="https://medium.com/@jasim/declarative-router-with-web-components-43ddcebc9dbc">ref</a>). I just adapted some pieces of code. First, I didn't use the "<i>pushState()</i>" function, I opted to a "#" URL style. The main reason is about the initial "<i>updateLinks()</i>" method. This method can't update links when pages make asynchonous calls. A possible solution is to use a "MutationObserver" object to check when a specific attribute on the component page (<i>e.g.</i> "is-loading") changes his value. Second adaptation was to add an authentication/role checking to some pages (but I need to make some additional tests for this functionality). Finally, I defined a "is-default" attribute to redirect users in a default page when a link doesn't exit.
</p>

```
<app-router>
    <app-route
        path = "/home"
        title = "Home"
        component = "home-page"
        is-default>
    </app-route>
    <app-route
        path = "/todo/:todo-id"
        title = "Todo detail"
        component = "todo-detail-page">
    </app-route>
    <!-- <app-route
        path = "/about"
        title = "About"
        component = "about-page"
        roles = "manager/admin">
    </app-route> -->
    <app-outlet></app-outlet>
</app-router>
```