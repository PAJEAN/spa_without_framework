# Single Page Todolist Application without JS frameworks or libraries

<p align="center">
    <img src="images/readme/todolist_app.png" width="300">
    <p align="center"> Preview of the application </p>
</p>

<p align="justify">
This project aims to build a full *single page application* without any JS frameworks or libraries with : i) a component-based approach (using *customElements* objects and templates), ii) a central state manager (derived from the Vuex logic) and iii) a router to navigate between pages. 
It allowed me to demystify some aspects of modern frameworks and at the same time to program my own adjustable JS architecture to develop future (little and modest) projects.
One of my initial motivations was to see if is it possible to not depend of modern frameworks, with a component-based approach and a scalable architecture. This desire comes from with the multiplication of JS developement Frameworks (Angular, React, Vue, Ember, Svelte, etc. - who is next ?) and their fast updates where some of them ask to developers to refactoring pieces of codes. I'm not here to demonize them, it offers different ways to neatly think and build a project and it facilitates some aspects of the developement. However, we can easily be lost in the choise of the needed technology (and some subjective benchmarks don't help us) and developers can be quickly sumitted by clients/companies to learn (again and again) a new technology (to do a thing that it can develop otherwise) or by the technology itself (with it's fast obsolescence).
Here, I'm just a programer curious to discover more about what's under the hood.
</p>

<p align="justify">
My researches led me first to the interesting Nicholas C. Zakas's talk (<a href="https://fr.slideshare.net/nzakas/scalable-javascript-application-architecture">ref</a>) about scalable JS applications. This talk dates from 2009 (so, long before ES6) but it's a really good reading on how to modularize and extend a Javascript project (if you are interesting by some implementations: <a href="https://code.tutsplus.com/tutorials/writing-modular-javascript--net-14746">Andrew Burgess</a>, <a href="http://scaleapp.org/">scaleapp</a> by Markus Kohlhase, <a href="https://github.com/valentin-lozev/justcore">justcore</a> by Valentin Lozev or <a href="https://github.com/aurajs/aura">aura</a> by Addy Osmani). This reading introduces me to the pattern architecture in JS (where <a href="https://addyosmani.com/resources/essentialjsdesignpatterns/book/">Learning JavaScript Design Patterns</a> by Addy Osmani is really good reading).
</p>



Lorem Ipsum todos : https://jsonplaceholder.typicode.com/guide.html

# References

* State manager inpired by Andy Bell ([ref](https://css-tricks.com/build-a-state-management-system-with-vanilla-javascript/)).
* Router inspired by Jasim ([ref](https://medium.com/@jasim/declarative-router-with-web-components-43ddcebc9dbc)).