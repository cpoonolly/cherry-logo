import { LitElement, html } from 'lit-element';
import { getRandomInt } from './utils';
import { generateSwarmAnimator } from './cherry-swarm-animators';
import { generateSwarmRenderer } from './cherry-swarm-renderers';

const CHERRY_SWARM_CANVAS_ID = 'cherry-swarm-canvas-id';

class SwarmParticle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.dx = 0;
    this.dy = 0;
  }
}

class Swarm {
  constructor(xMax, yMax, particleCount) {
    this.particles = new Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      this.particles[i] = new SwarmParticle(getRandomInt(0, xMax), getRandomInt(0, yMax));
    }
  }
}

class CherrySwarmCanvas extends LitElement {

  static get properties() {
    return {
      particleCount: { type: Number },
      animationProps: { type: Object, reflect: true },
      renderProps: { type: Object, reflect: true }
    };
  }

  constructor() {
    super();

    this.particleCount = 1000;
    this.animationProps = { name: 'orbit', orbitX: 0, orbitY: 0, radius: 50, xMax: 0, yMax: 0 };
    this.renderProps = { name: 'single-colored-rect', color: 'black', size: 3 };

    this.swarm = null;
    this.lastAnimationFrameTime = null;
    this.numAnimationUpdates = 0;
    this.animator = null;
    this.renderer = null;

    this.width = 0;
    this.height = 0;
    this.onResize();
  }

  onResize() {
    let oldWidth = this.width;
    let oldHeight = this.height;

    this.width = Math.max(1, this.shadowRoot.host.clientWidth);
    this.height = Math.max(1, this.shadowRoot.host.clientHeight);

    if (this.animator) {
      this.animator.onCanvasResize(oldWidth, oldHeight, this.width, this.height);
    }

    // https://stackoverflow.com/a/3078427
    const canvas = this.shadowRoot.getElementById(CHERRY_SWARM_CANVAS_ID);
    if (canvas) {
      canvas.width = this.width;
      canvas.height = this.height;
    }
  }

  connectedCallback() {
    super.connectedCallback();

    this.swarm = new Swarm(this.width, this.height, this.particleCount);
    this.animationProps = {
      name: 'orbit',
      orbitX: Math.floor(this.width / 2),
      orbitY: Math.floor(this.height / 2),
      radius: 50,
      xMax: this.width,
      yMax: this.height,
    };

    this.animator = generateSwarmAnimator(this.animationProps);
    this.renderer = generateSwarmRenderer(this.renderProps);

    requestAnimationFrame((timestamp) => this.updateCherry(timestamp));
    window.addEventListener('resize', () => this.onResize());
  }

  updateCherry(currentTime) {
    if (!this.lastAnimationFrameTime) this.lastAnimationFrameTime = currentTime;

    const canvas = this.shadowRoot.getElementById(CHERRY_SWARM_CANVAS_ID);
    if (!canvas) return;

    const dt = currentTime - this.lastAnimationFrameTime;
    const canvasContext = canvas.getContext('2d');

    this.animator.animate(this.swarm, dt, currentTime);
    this.renderer.render(canvasContext, this.swarm);

    this.lastAnimationFrameTime = currentTime;
    requestAnimationFrame((timestamp) => this.updateCherry(timestamp));
  }

  updated() {
    this.animator = generateSwarmAnimator(this.animationProps);
    this.renderer = generateSwarmRenderer(this.renderProps);
  }

  render() {
    return html`
      <canvas id="${CHERRY_SWARM_CANVAS_ID}" width="${this.width}" height="${this.height}"></canvas>
    `;
  }
}

customElements.define('cherry-swarm', CherrySwarmCanvas);