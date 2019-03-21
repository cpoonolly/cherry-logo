import { LitElement, html } from 'lit-element';

const ANIMATION_DURATION = 5;

class CherryBrackets extends LitElement {
    static get properties() {
        return {
            currentSlot: {type: Number}
        }
    }

    constructor() {
        super();

        this.currentSlot = 1;
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
                    from { max-width: calc(0vw); }
                    to { max-width: calc(100vw); }
                }

                .brackets-container {
                    display: flex;animation-name: cherries-rotation;
                    animation-duration: 4s;
                    align-items: center;
                    justify-content: center;
                }

                .bracket {
                    stroke: hsl(0, 100%, 30%);
                    stroke-width: 5px;
                    fill: none;
                }

                .bracket-left-container, .bracket-right-container {
                    flex-grow: 1;
                }

                #brackets-content {
                    overflow: hidden;
                }

                .brackets-content-animated {
                    animation-name: brackets-animation;
                    animation-duration: ${ANIMATION_DURATION}s;
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