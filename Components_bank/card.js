try {
    (function() {
        /*
         * Source: https://www.youtube.com/watch?v=ela-oNuFlzM
         */
        const COMPONENT_NAME = 'user-card';

        const COMPONENT_TEMPLATE = document.createElement('template');
        COMPONENT_TEMPLATE.innerHTML = `
            <style>
            .center {
                position: absolute;
                top: 50%;
                left: 50%;
                -webkit-transform: translate(-50%, -50%);
            }

            .card {
                width: 450px;
                height: 250px;
                background-color: #fff;
                background: linear-gradient(#f8f8f8, #fff);
                box-shadow: 0 8px 16px -8px rgba(0,0,0,0.4);
                border-radius: 6px;
                overflow: hidden;
                position: relative;
            }
              
            .card h1 {
                text-align: center;
            }
              
            .card .additional {
                position: absolute;
                width: 150px;
                height: 100%;
                background: linear-gradient(#dE685E, #EE786E);
                transition: width 0.4s;
                overflow: hidden;
                z-index: 2;
            }              
              
            .card:hover .additional {
                width: 100%;
                border-radius: 0 5px 5px 0;
            }
              
            .card .additional .user-card {
                width: 150px;
                height: 100%;
                position: relative;
                float: left;
            }
              
            .card .additional .user-card::after {
                content: "";
                display: block;
                position: absolute;
                top: 10%;
                right: -2px;
                height: 80%;
                border-left: 2px solid rgba(0,0,0,0.025);*/
            }
              
            .card .additional .user-card .level,
             .card .additional .user-card .points {
                top: 15%;
                color: #fff;
                text-transform: uppercase;
                font-size: 0.75em;
                font-weight: bold;
                background: rgba(0,0,0,0.15);
                padding: 0.125rem 0.75rem;
                border-radius: 100px;
                white-space: nowrap;
            }
              
            .card .additional .user-card .points {
                top: 85%;
            }
              
            .card .additional .user-card svg {
                top: 50%;
            }
              
            .card .additional .more-info {
                width: 300px;
                float: left;
                position: absolute;
                left: 150px;
                height: 100%;
            }
              
            .card .additional .more-info h1 {
                color: #fff;
                margin-bottom: 0;
            }
              
            .card .additional .coords {
                margin: 0 1rem;
                color: #fff;
                font-size: 1rem;
            }
              
            .card .additional .coords span + span {
                float: right;
            }
              
            .card .additional .stats {
                font-size: 2rem;
                display: flex;
                position: absolute;
                bottom: 1rem;
                left: 1rem;
                right: 1rem;
                top: auto;
                color: #fff;
            }
              
            .card .additional .stats > div {
                flex: 1;
                text-align: center;
            }
              
            .card .additional .stats i {
                display: block;
            }
              
            .card .additional .stats div.title {
                font-size: 0.75rem;
                font-weight: bold;
                text-transform: uppercase;
            }
              
            .card .additional .stats div.value {
                font-size: 1.5rem;
                font-weight: bold;
                line-height: 1.5rem;
            }
              
            .card .additional .stats div.value.infinity {
                font-size: 2.5rem;
            }
              
            .card .general {
                width: 300px;
                height: 100%;
                position: absolute;
                top: 0;
                right: 0;
                z-index: 1;
                box-sizing: border-box;
                padding: 1rem;
                padding-top: 0;
            }
              
            .card .general .more {
                position: absolute;
                bottom: 1rem;
                right: 1rem;
                font-size: 0.9em;
            }

            img {
                top: 50%;
                border-radius: 50%;
                width: 110px;
                height: 110px;
            }
            </style>

            <div class="card">
                <div class="additional">
                    <div class="user-card">
                        <div class="level center">
                            Level <slot name="level"></slot>
                        </div>
                        <div class="points center">
                            <slot name="points"></slot> Points
                        </div>
                        <slot name="image"><img class="center" src="images/img_avatar.png" alt="avatar"></slot>
                    </div>
                    <div class="more-info">
                        <h1>Jane Doe</h1>
                        <div class="coords">
                            <span>Group Name</span>
                            <span>Joined January 2019</span>
                        </div>
                        <div class="coords">
                            <span><slot name="role">Position/Role</slot></span>
                            <span><slot name="country"></slot></span>
                        </div>
                        <div class="stats">
                            <div>
                                <div class="title">Awards</div>
                                <i class="fa fa-trophy"></i>
                                <div class="value">2</div>
                            </div>
                            <div>
                                <div class="title">Matches</div>
                                <i class="fa fa-gamepad"></i>
                                <div class="value">27</div>
                            </div>
                            <div>
                                <div class="title">Pals</div>
                                <i class="fa fa-group"></i>
                                <div class="value">123</div>
                            </div>
                            <div>
                                <div class="title">Coffee</div>
                                <i class="fa fa-coffee"></i>
                                <div class="value infinity">∞</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="general">
                    <h1>Jane Doe</h1>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce a volutpat mauris, at molestie lacus. Nam vestibulum sodales odio ut pulvinar.</p>
                    <span class="more">Mouse over the card for more info</span>
                </div>
            </div>
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