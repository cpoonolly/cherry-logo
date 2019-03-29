import { LitElement, html } from 'lit-element';

class CherryBrackets extends LitElement {
    static get properties() {
        return {
            currentSlot: {type: Number},
            color: {type: String },
            animationDuration: {type: Number},
        }
    }

    constructor() {
        super();

        this.currentSlot = 1;
        this.color = 'black';
        this.animationDuration = 5;
    }

    updated(changedProperties) {
        if (changedProperties.currentSlot !== this.currentSlot) {
            this.animateBrackets();
        }
    }

    firstUpdated() {
        let bracketsContentEl = this.shadowRoot.getElementById('brackets-content');

        bracketsContentEl.addEventListener('animationstart', () => console.log('animation started on brackets'));
        bracketsContentEl.addEventListener('animationend', () => console.log('animation ended on brackets'));

        this.animateBrackets();
    }

    animateBrackets() {
        let bracketsContentEl = this.shadowRoot.getElementById('brackets-content');

        bracketsContentEl.classList.remove('brackets-content-animated');

        // weird trick to to "trigger reflow" i.e. make the css animation restart
        // https://css-tricks.com/restart-css-animation/#article-header-id-0
        void bracketsContentEl.offsetWidth;

        bracketsContentEl.classList.add('brackets-content-animated');
    }

    render() {
        return html`
            <style>
                @keyframes brackets-animation {
                    0% { max-width: calc(100vw); visibility: hidden; }
                    30% { max-width: calc(0vw); visibility: hidden; }
                    100% { max-width: calc(100vw); visibility: visible; }
                }

                .brackets-container {
                    display: flex;
                    animation-name: cherries-rotation;
                    animation-duration: 4s;
                    align-items: center;
                    justify-content: center;
                }

                .bracket {
                    stroke: ${this.color};
                    stroke-width: 5px;
                    fill: none;
                }

                .bracket-left-container, .bracket-right-container {
                    flex-shrink: 1;
                }

                #brackets-content {
                    flex-grow: 1;
                }

                .brackets-content-animated {
                    animation-name: brackets-animation;
                    animation-duration: ${this.animationDuration}s;
                }

                /* SVGs inside webcomponents seems buggy in Firefox... */
                @-moz-document url-prefix() {
                  .bracket-left-container, .bracket-right-container {
                    max-width: 100px;
                  }
                }

            </style>
            <div class="brackets-container">
                <div class="bracket-left-container">
                    <svg width="100%" height="100%" viewbox="0 0 50 100" preserveAspectRatio="none">
                        <path id="bracket-left" class="bracket" d="M 40.00,10.00 C 0.00,10.00 50.00,50.00 10.00,50.00 50.00,50.00 0.00,90.00 40.00,90.00"></path>
                    </svg>
                </div>
                <div id="brackets-content" >
                    <slot name="slot${this.currentSlot}"></slot>
                </div>
                <div class="bracket-right-container">
                    <svg width="100%" height="100%" viewbox="0 0 50 100" preserveAspectRatio="none">
                        <path id="bracket-left" class="bracket" d="M 10.00,10.00 C 50.00,10.00 0.00,50.00 40.00,50.00 0.00,50.00 50.00,90.00 10.00,90.00"></path>
                    </svg>
                </div>
            </div>
        `;
    }
}

customElements.define('cherry-brackets', CherryBrackets);