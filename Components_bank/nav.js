try {
    (function() {
        const COMPONENT_NAME = 'app-nav';

        const COMPONENT_TEMPLATE = document.createElement('template');
        COMPONENT_TEMPLATE.innerHTML = `
        <style>
            :host {
                --transition-speed: 600ms;
            }
            .navbar {
                position: fixed;
                background-color: var(--bg-primary);
                transition: width 200ms ease;
                z-index: 9999;
            }
            .navbar-nav {
                list-style: none;
                margin: 0;
                padding: 0;
                display: flex;
                flex-direction: column;
                align-items: center;
                height: 100%;
            }
            .nav-item {
                width: 100%;
            }
            .nav-item:last-child {
                margin-top: auto;
            }
            .nav-link {
                display: flex;
                align-items: center;
                height: 4rem;
                color: var(--text-primary);
                text-decoration: none;
                filter: grayscale(100%) opacity(0.7);
                transition: var(--transition-speed);
            }
            .nav-link:hover {
                filter: grayscale(0%) opacity(1);
                background: var(--bg-secondary);
            }
            .link-text {
                display: none;
                margin-left: 1rem;
            }
            .nav-link svg {
                min-width: 1.5rem;
                margin: 0 1.25rem;
            }
            .fa-primary {
                color: var(--text-hover-primary);
            }
            .fa-secondary {
                color: var(--text-hover-secondary);
            }
            .fa-primary,
            .fa-secondary {
                transition: var(--transition-speed);
            }
            .logo {
                font-weight: bold;
                margin-bottom: 1rem;
                text-align: center;
                color: var(--text-secondary);
                background: var(--bg-secondary);
                font-size: 1.5rem;
                text-transform: uppercase;
                letter-spacing: 0.3ch;
                width: 100%;
            }
            .logo svg {
                transform: rotate(0deg);
                transition: transform var(--transition-speed);
            }
            .navbar:hover .logo svg {
                transform: rotate(-180deg);
            }

            @media only screen and (max-width:600px) {
                .navbar {
                    bottom: 0;
                    width: 100vw;
                    height: 4rem;
                }
                .logo {
                    display: none;
                }
                .navbar-nav {
                    flex-direction: row;
                }
                .nav-link {
                    justify-content: center;
                }
            }

            @media only screen and (min-width:600px) {
                .navbar {
                    top: 0;
                    width: 4rem;
                    height: 100vh;
                }
                .navbar:hover {
                    width: 15rem;
                }
                .navbar:hover .link-text {
                    display: inline;
                    transition: opacity var(--transition-speed);
                }
            }
        </style>
        <nav class="navbar">
            <ul class="navbar-nav">
                <li class="logo">
                    <a href="#" class="nav-link">
                        <span class="link-text">Fireship</span>
                        <svg aria-hidden="true" focusable="false" data-prefix="fad" data-icon="angle-double-right" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                            <g class="fa-group">
                            <path
                                fill="currentColor"
                                d="M224 273L88.37 409a23.78 23.78 0 0 1-33.8 0L32 386.36a23.94 23.94 0 0 1 0-33.89l96.13-96.37L32 159.73a23.94 23.94 0 0 1 0-33.89l22.44-22.79a23.78 23.78 0 0 1 33.8 0L223.88 239a23.94 23.94 0 0 1 .1 34z"
                                class="fa-secondary"
                            ></path>
                            <path
                                fill="currentColor"
                                d="M415.89 273L280.34 409a23.77 23.77 0 0 1-33.79 0L224 386.26a23.94 23.94 0 0 1 0-33.89L320.11 256l-96-96.47a23.94 23.94 0 0 1 0-33.89l22.52-22.59a23.77 23.77 0 0 1 33.79 0L416 239a24 24 0 0 1-.11 34z"
                                class="fa-primary"
                            ></path>
                            </g>
                        </svg>
                    </a>
                </li>
                <li class="nav-item">
                    <a href="#/about" class="nav-link">
                        <svg aria-hidden="true" focusable="false" data-prefix="fab" data-icon="jedi-order" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                            <path class="fa-primary" fill="currentColor" d="M398.5 373.6c95.9-122.1 17.2-233.1 17.2-233.1 45.4 85.8-41.4 170.5-41.4 170.5 105-171.5-60.5-271.5-60.5-271.5 96.9 72.7-10.1 190.7-10.1 190.7 85.8 158.4-68.6 230.1-68.6 230.1s-.4-16.9-2.2-85.7c4.3 4.5 34.5 36.2 34.5 36.2l-24.2-47.4 62.6-9.1-62.6-9.1 20.2-55.5-31.4 45.9c-2.2-87.7-7.8-305.1-7.9-306.9v-2.4 1-1 2.4c0 1-5.6 219-7.9 306.9l-31.4-45.9 20.2 55.5-62.6 9.1 62.6 9.1-24.2 47.4 34.5-36.2c-1.8 68.8-2.2 85.7-2.2 85.7s-154.4-71.7-68.6-230.1c0 0-107-118.1-10.1-190.7 0 0-165.5 99.9-60.5 271.5 0 0-86.8-84.8-41.4-170.5 0 0-78.7 111 17.2 233.1 0 0-26.2-16.1-49.4-77.7 0 0 16.9 183.3 222 185.7h4.1c205-2.4 222-185.7 222-185.7-23.6 61.5-49.9 77.7-49.9 77.7z">
                            </path>
                        </svg>
                        <span class="link-text">About</span>
                    </a>
                </li>
                <li class="nav-item">
                    <a href="#" class="nav-link">
                        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                            <path class="fa-secondary" fill="currentColor" d="M256,448c-23.521,0-42.667-19.135-42.667-42.667c0-5.896-4.771-10.667-10.667-10.667
                                c-5.896,0-10.667,4.771-10.667,10.667c0,35.292,28.708,64,64,64c5.896,0,10.667-4.771,10.667-10.667
                                C266.667,452.77,261.896,448,256,448z">
                            </path>
                            <path class="fa-primary" fill="currentColor" d="M512,64c0-23.875-20.75-55.698-23.125-59.25C486.167,0.666,481-1,476.458,0.604c-4.604,1.625-7.521,6.167-7.083,11.031
                                c5.167,56.771-28.083,73.635-63.271,91.49c-30.354,15.406-64.771,32.854-64.771,78.208c0,22.417,5.438,34.594,10.708,46.354
                                c5.458,12.229,10.625,23.771,10.625,49.646c0,33.223-16.763,50.956-26.438,58.477c-19.573-22.557-48.092-37.143-80.229-37.143
                                c-32.132,0-60.648,14.583-80.221,37.134c-9.615-7.492-26.445-25.241-26.445-58.467c0-25.875,5.167-37.417,10.625-49.646
                                c5.271-11.76,10.708-23.938,10.708-46.354c0-45.354-34.417-62.802-64.771-78.208C70.708,85.27,37.458,68.406,42.625,11.635
                                c0.438-4.865-2.479-9.406-7.083-11.031C30.938-0.98,25.833,0.687,23.125,4.75C20.75,8.302,0,40.125,0,64
                                c0,20.906,0.375,24.24,9,41.802c-4.063,7.26-9,20.781-9,43.531c0,28.594,20.729,49.333,31.083,57.896
                                c-2,18.427,3.167,48.167,33.604,66.146c3.105,14.852,19.409,47.967,97.827,81.676c-8.135,15.052-13.181,32.007-13.181,50.283
                                C149.333,464.145,197.188,512,256,512s106.667-47.854,106.667-106.667c0-18.279-5.048-35.236-13.185-50.289
                                c78.405-33.704,94.725-66.819,97.831-81.669c30.417-17.979,35.604-47.719,33.604-66.146C491.271,198.666,512,177.927,512,149.333
                                c0-22.75-4.938-36.271-9-43.531C511.625,88.239,512,84.906,512,64z M136.167,318.427c-49.979-28.521-50.854-50.792-50.875-50.792
                                c0.396-4.375-1.917-8.542-5.854-10.51c-34.229-17.104-26.75-50.521-26.417-51.875c1.083-4.344-0.688-8.927-4.417-11.438
                                c-0.271-0.188-27.271-18.719-27.271-44.479c0-25.833,7.583-35.146,7.542-35.146v0.01c3.25-3.25,4.042-8.208,2-12.313
                                C21.333,82.812,21.333,82.812,21.333,64c0-4.021,1.042-8.75,2.667-13.677c10.417,40.469,44.021,57.51,72.25,71.833
                                c32.917,16.698,53.083,28.49,53.083,59.177c0,17.865-4.104,27.031-8.854,37.646C134.625,232.073,128,246.906,128,277.333
                                C128,293.802,131.333,307.385,136.167,318.427z M256,490.666c-47.063,0-85.333-38.281-85.333-85.333
                                C170.667,358.281,208.938,320,256,320s85.333,38.281,85.333,85.333C341.333,452.385,303.063,490.666,256,490.666z
                                    M482.854,113.927c0.083,0.083,7.813,9.323,7.813,35.406c0,25.76-27,44.292-27.271,44.479c-3.729,2.51-5.5,7.094-4.417,11.438
                                c0.354,1.406,8.208,34.573-26.417,51.875c-3.604,1.802-5.875,6-5.875,10.031c0,0.281-0.771,22.656-50.854,51.26
                                c4.854-11.052,8.167-24.625,8.167-41.083c0-30.427-6.625-45.26-12.479-58.354c-4.75-10.615-8.854-19.781-8.854-37.646
                                c0-30.688,20.167-42.479,53.083-59.177c28.229-14.323,61.833-31.365,72.25-71.833c1.625,4.927,2.667,9.656,2.667,13.677
                                c0,18.813,0,18.813-9.542,37.885C479.208,105.739,480.042,110.666,482.854,113.927z">
                            </path>
                        </svg>
                        <span class="link-text">Contact</span>
                    </a>
                </li>
                <li class="nav-item">
                    <a href="#" class="nav-link">
                        <svg aria-hidden="true" focusable="false" data-prefix="fab" data-icon="galactic-republic" class="svg-inline--fa fa-galactic-republic fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512">
                            <path class="fa-primary" fill="currentColor" d="M248 504C111.25 504 0 392.75 0 256S111.25 8 248 8s248 111.25 248 248-111.25 248-248 248zm0-479.47C120.37 24.53 16.53 128.37 16.53 256S120.37 487.47 248 487.47 479.47 383.63 479.47 256 375.63 24.53 248 24.53zm27.62 21.81v24.62a185.933 185.933 0 0 1 83.57 34.54l17.39-17.36c-28.75-22.06-63.3-36.89-100.96-41.8zm-55.37.07c-37.64 4.94-72.16 19.8-100.88 41.85l17.28 17.36h.08c24.07-17.84 52.55-30.06 83.52-34.67V46.41zm12.25 50.17v82.87c-10.04 2.03-19.42 5.94-27.67 11.42l-58.62-58.59-21.93 21.93 58.67 58.67c-5.47 8.23-9.45 17.59-11.47 27.62h-82.9v31h82.9c2.02 10.02 6.01 19.31 11.47 27.54l-58.67 58.69 21.93 21.93 58.62-58.62a77.873 77.873 0 0 0 27.67 11.47v82.9h31v-82.9c10.05-2.03 19.37-6.06 27.62-11.55l58.67 58.69 21.93-21.93-58.67-58.69c5.46-8.23 9.47-17.52 11.5-27.54h82.87v-31h-82.87c-2.02-10.02-6.03-19.38-11.5-27.62l58.67-58.67-21.93-21.93-58.67 58.67c-8.25-5.49-17.57-9.47-27.62-11.5V96.58h-31zm183.24 30.72l-17.36 17.36a186.337 186.337 0 0 1 34.67 83.67h24.62c-4.95-37.69-19.83-72.29-41.93-101.03zm-335.55.13c-22.06 28.72-36.91 63.26-41.85 100.91h24.65c4.6-30.96 16.76-59.45 34.59-83.52l-17.39-17.39zM38.34 283.67c4.92 37.64 19.75 72.18 41.8 100.9l17.36-17.39c-17.81-24.07-29.92-52.57-34.51-83.52H38.34zm394.7 0c-4.61 30.99-16.8 59.5-34.67 83.6l17.36 17.36c22.08-28.74 36.98-63.29 41.93-100.96h-24.62zM136.66 406.38l-17.36 17.36c28.73 22.09 63.3 36.98 100.96 41.93v-24.64c-30.99-4.63-59.53-16.79-83.6-34.65zm222.53.05c-24.09 17.84-52.58 30.08-83.57 34.67v24.57c37.67-4.92 72.21-19.79 100.96-41.85l-17.31-17.39h-.08z">
                            </path>
                        </svg>
                        <span class="link-text">Dogs</span>
                    </a>
                </li>
            </ul>
        </nav>
        `;

        window.customElements.define(COMPONENT_NAME, class extends HTMLElement {
            constructor() {
                super();
                this.attachShadow({mode: 'open'});
                this.shadowRoot.appendChild(COMPONENT_TEMPLATE.content.cloneNode(true));
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