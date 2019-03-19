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

    // connectedCallback() {
    //     super.connectedCallback();
    // }

    render() {
        return html`
            <style>
                @keyframes cherry-rotation {
                    from { transform: rotateY(0deg); }
                    to { transform: rotateY(360deg); }
                }
        
                #cherry-logo-cherries {
                    transform-origin: center;
                    animation-name: cherry-rotation;
                    animation-duration: 4s;
                    animation-iteration-count: infinite;
                    animation-delay: 2s;
                    stroke: red;
                    stroke-width: 10px;
                    fill: none;
                }
        
                #cherry-logo-brackets {
                    stroke: hsl(0, 100%, 30%);
                    stroke-width: 20px;
                    fill: none;
                }
            </style>
            <svg width="${this.width}" height="${this.height}" viewbox="0 0 256 256">
                <path id="cherry-logo-brackets" d="M 176.00,14.33 C 268.00,14.33 176.00,124.33 246.00,124.33 176.00,124.33 266.00,234.33 176.00,234.33M 80.00,14.33 C -12.00,14.33 80.00,124.33 10.00,124.33 80.00,124.33 -10.00,234.33 80.00,234.33"></path>
                <path id="cherry-logo-cherries" d="M 119.67,88.67 C 119.33,75.33 141.00,50.00 175.00,67.00 162.00,105.00 128.00,108.00 119.67,88.67 Z M 150.25,78.69 C 150.25,78.69 119.56,88.88 119.56,88.88M 113.67,154.33 C 100.00,108.33 119.69,90.33 119.69,89.00M 119.81,89.06 C 119.81,89.06 108.91,110.00 130.91,131.82M 123.12,121.12 C 134.18,111.45 150.73,118.00 154.88,129.31 157.81,143.25 147.25,156.38 135.75,153.00M 110.88,140.38 C 126.75,138.50 138.10,149.15 136.73,162.27 135.12,172.50 128.12,184.25 114.12,185.12 87.00,185.75 80.25,154.62 96.50,145.62"></path>
            </svg>
        `;
    }
}

customElements.define('cherry-logo', CherryLogo);