import { LitElement, html } from 'lit-element';

class CherryLogo extends LitElement {

    static get properties() {
        return {
            width: {type: Number},
            height: {type: Number},
        };
    }

    constructor() {
        super();

        this.width = 100;
        this.height = 100;
    }

    connectedCallback() {
        super.connectedCallback();
    }

    render() {
        return html`
            <svg width="${this.width}" height="${this.height}">
                
            </svg>
        `;
    }
}

customElements.define('cherry-logo', CherryLogo);