import { LitElement, html } from 'lit-element';

class CherryButton extends LitElement {
    static get properties() {
        return {
            label: {type: String}
        };
    }

    constructor() {
        super();

        this.label = '';
    }

    render() {
        return html`
            <style>
                .button-container {
                    background-color: hsl(0, 100%, 30%);
                    color: white;
                    min-height: 20px;
                    border-radius: 10px;
                }
            </style>
            <div class="button-container">
                <slot></slot>
            </h1>
        `;
    }
}

customElements.define('cherry-button', CherryButton);