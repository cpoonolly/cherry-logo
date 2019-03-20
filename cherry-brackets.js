import { LitElement, html } from 'lit-element';

class CherryBrackets extends LitElement {
    constructor() {
        super();
    }

    render() {
        return html`
            <style>
                .brackets-container {
                    display: flex;
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

                .brackets-content {
                    flex-grow: 10;
                }
            </style>
            <div class="brackets-container">
                <div class="bracket-left-container">
                    <svg width="100%" height="100%" viewbox="0 0 50 100" preserveAspectRatio="none">
                        <path id="bracket-left" class="bracket" d="M 40.00,10.00 C 0.00,10.00 50.00,50.00 10.00,50.00 50.00,50.00 0.00,90.00 40.00,90.00"></path>
                    </svg>
                </div>
                <div class="brackets-content">
                    <slot></slot>
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