import { LitElement, html } from 'lit-element';

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);

    return Math.floor(Math.random() * (max - min + 1)) + min;
}

class SwarmParticle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.dx = 0;
        this.dy = 0;
    }
}

class Swarm {
    constructor(xMax, yMax, particleCount, color) {
        this.xMax = xMax;
        this.yMax = yMax;
        this.particles = new Array(particleCount);
        this.color = color;

        for (let i = 0; i < particleCount; i++) {
            this.particles[i] = new SwarmParticle(getRandomInt(0, xMax), getRandomInt(0, yMax));
        }
    }

    renderSwarm(canvasContext) {
        canvasContext.fillStyle = this.color;

        this.particles.forEach((particle) => {
            canvasContext.fillRect(particle.x, particle.y, 5, 5);
        });
    }
}

const CHERRY_SWARM_CANVAS_ID = 'cherry-swarm-canvas-id';

class SwarmAnimation {
    animate(swarm, dt, currentTime) {
        throw new Error('this should be overridden...');
    }

    onCanvasResize(oldWidth, oldHeight, newWidth, newHeight) {
        throw new Error('this should be overriden...');
    }
}

class OrbitPointSwarmAnimation extends SwarmAnimation {
    static validateParams(orbitX, orbitY, radius, xMax, yMax) {
        if (orbitX === undefined || orbitX === null) throw Error('invalid orbit animation - orbitX is null/undefined');
        if (orbitY === undefined || orbitY === null) throw Error('invalid orbit animation - orbitY is null/undefined');
        if (radius === undefined || radius === null) throw Error('invalid orbit animation - radius is null/undefined');
        if (xMax === undefined || xMax === null) throw Error('invalid orbit animation - xMax is null/undefined');
        if (yMax === undefined || yMax === null) throw Error('invalid orbit animation - yMax is null/undefined');
    }

    constructor({orbitX, orbitY, radius, xMax, yMax}) {
        super();
        
        OrbitPointSwarmAnimation.validateParams(orbitX, orbitY, radius, xMax, yMax);

        this.orbitX = orbitX;
        this.orbitY = orbitY;
        this.radius = radius;
        this.xMax = xMax;
        this.yMax = yMax;
    }

    animate(swarm, dt) {
        let { orbitX, orbitY, radius, xMax, yMax } = this;

        swarm.particles.forEach((particle) => {
            particle.x += dt * particle.dx / 1000;
            particle.y += dt * particle.dy / 1000;

            particle.x = Math.min(Math.max(-10, particle.x), xMax + 10);
            particle.y = Math.min(Math.max(-10, particle.y), yMax + 10);

            let vx = orbitX - particle.x;
            let vy = orbitY - particle.y;
            let vLength = Math.sqrt((vx*vx) + (vy*vy));

            let vxNorm = vx / vLength;
            let vyNorm = vy / vLength;

            particle.dx += (vLength > radius ? 10 * vxNorm : 0.5 * vxNorm);
            particle.dy += (vLength > radius ? 10 * vyNorm : 0.5 * vyNorm);

            let vxPerpNorm = vy / vLength;
            let vyPerpNorm = -1 * vx / vLength;

            particle.dx += vxPerpNorm;
            particle.dy += vyPerpNorm;

            // console.log(`x=${particle.x}\ty=${particle.y}\tdx=${particle.dx}\tdy=${particle.dy}`);
        });
    }

    onCanvasResize(oldWidth, oldHeight, newWidth, newHeight) {
        this.xMax = newWidth;
        this.yMax = newHeight;
        this.orbitX = newWidth * (this.orbitX / oldWidth);
        this.orbitY = newHeight * (this.orbitY / oldHeight);
        console.log(`orbit animation - handling canvas resize: {orbitX: ${this.orbitX}, orbitY: ${this.orbitY}}`);
    }
}

class RandomMotionSwarmAnimation extends SwarmAnimation {
    static validateParams(xMax, yMax) {
        if (xMax === undefined || xMax === null) throw Error('invalid orbit animation - xMax is null/undefined');
        if (yMax === undefined || yMax === null) throw Error('invalid orbit animation - yMax is null/undefined');
    }

    constructor({xMax, yMax}) {
        super();

        RandomMotionSwarmAnimation.validateParams(xMax, yMax);

        this.xMax = xMax;
        this.yMax = yMax;
    }

    animate(swarm, dt) {
        let { xMax, yMax } = this;

        swarm.particles.forEach((particle) => {
            particle.x += dt * particle.dx / 1000;
            particle.y += dt * particle.dy / 1000;

            particle.x = Math.min(Math.max(-10, particle.x), xMax + 10);
            particle.y = Math.min(Math.max(-10, particle.y), yMax + 10);

            let vx = getRandomInt(0, xMax) - particle.x;
            let vy = getRandomInt(0, yMax) - particle.y;
            let vLength = Math.sqrt((vx*vx) + (vy*vy));

            let vxNorm = vx / vLength;
            let vyNorm = vy / vLength;

            particle.dx += 100 * vxNorm;
            particle.dy += 100 * vyNorm;

            // console.log(`x=${particle.x}\ty=${particle.y}\tdx=${particle.dx}\tdy=${particle.dy}`);
        });
    }

    onCanvasResize(oldWidth, oldHeight, newWidth, newHeight) {
        this.xMax = newWidth;
        this.yMax = newHeight;
        console.log(`random animation - handling canvas resize: {orbitX: ${this.orbitX}, orbitY: ${this.orbitY}}`);
    }
}

class FreezeSwarmAnimation extends SwarmAnimation {
    constructor() {
        super();
    }

    animate(swarm) {
        swarm.particles.forEach((particle) => {
            particle.dx = 0;
            particle.dy = 0;
        });
    }

    onCanvasResize() {
        // noop
    }
}

class SwarmAnimationSequence extends SwarmAnimation {
    // should be an array of objects with signature: {animationProps, duration}
    constructor({animationSequence}) {
        super();

        if (!animationSequence || animationSequence.length <= 0)
            throw Error('sequence animation - invalid animation sequence');

        let atTime = 0;
        this.animations = [];
        animationSequence.forEach(({animationProps, duration}, index) => {
            let animation = generateSwarmAnimation(animationProps); // will throw an exception if incorrect
            this.animations.push({animation, atTime});

            if (index < animationSequence.length - 1) {
                if (duration === null || duration === undefined)
                    throw new Error(`sequence animation - invalid animation #${index + 1} in sequence invalid`);

                atTime += duration; // doesn't matter for the last one   
            }
        })
        
        this.timeStarted = null;
        this.timeElapsed = 0;
        this.indexOfCurrentAnimation = 0;
        this.currenAnimation = this.animations[this.indexOfCurrentAnimation].animation;
    }

    updateCurrentTime(currentTime) {
        if (this.timeStarted === null) this.timeStarted = currentTime;
        this.timeElapsed = currentTime - this.timeStarted;

        for (let i = this.indexOfCurrentAnimation + 1; i < this.animations.length; i++) {
            if (this.timeElapsed < this.animations[i].atTime) break;

            this.indexOfCurrentAnimation = i;
            this.currenAnimation = this.animations[this.indexOfCurrentAnimation].animation;
        }
    }

    animate(swarm, dt, currentTime) {
        this.updateCurrentTime(currentTime);
        this.currenAnimation.animate(swarm, dt, currentTime);
    }

    onCanvasResize(oldWidth, oldHeight, newWidth, newHeight) {
        this.currenAnimation.onCanvasResize(oldWidth, oldHeight, newWidth, newHeight);
    }
}

function generateSwarmAnimation(animationProps) {
    console.log(`generating animation: ${JSON.stringify(animationProps)}`);
    switch (animationProps.name) {
        case 'orbit':
            return new OrbitPointSwarmAnimation(animationProps);
        case 'random':
            return new RandomMotionSwarmAnimation(animationProps);
        case 'freeze':
            return new FreezeSwarmAnimation(animationProps);
        case 'sequence':
            return new SwarmAnimationSequence(animationProps);
        default:
            return new OrbitPointSwarmAnimation(animationProps);
    }
}

class CherrySwarmCanvas extends LitElement {

    static get properties() {
        return {
            particleCount: {type: Number},
            swarmCount: {type: Number},
            animationProps: {type: Object, reflect: true}
        };
    }

    constructor() {
        super();

        this.particleCount = 1000;
        this.swarmCount = 1;
        this.animationProps = {name: 'orbit', orbitX: 0, orbitY: 0, radius: 50, xMax: 0, yMax: 0};
        
        this.swarms = [];
        this.lastAnimationFrameTime = null;
        this.numAnimationUpdates = 0;
        this.animation = null;

        this.width = 0;
        this.height = 0;
        this.onResize();
    }

    onResize() {
        let oldWidth = this.width;
        let oldHeight = this.height;

        this.width = Math.max(1, this.shadowRoot.host.clientWidth);
        this.height = Math.max(1, this.shadowRoot.host.clientHeight);
        
        if (this.animation) {
            this.animation.onCanvasResize(oldWidth, oldHeight, this.width, this.height);
        }

        // https://stackoverflow.com/a/3078427
        const canvas = this.shadowRoot.getElementById(CHERRY_SWARM_CANVAS_ID);
        if (canvas) {
            canvas.width = this.width;
            canvas.height = this.height;
        }

        // this.updateSwarmAnimations();
    }

    connectedCallback() {
        super.connectedCallback();
        
        for (let i = 0; i < this.swarmCount; i++) {
            this.swarms.push(new Swarm(this.width, this.height, this.particleCount, `hsl(0, 100%, ${getRandomInt(60, 90)}%)`));
        }
        
        this.animationProps = {
            name: 'orbit',
            orbitX: Math.floor(this.width / 2),
            orbitY: Math.floor(this.height / 2),
            radius: 50,
            xMax: this.width,
            yMax: this.height,
        };

        this.animation = generateSwarmAnimation(this.animationProps);

        requestAnimationFrame((timestamp) => this.updateCherry(timestamp));
        window.addEventListener('resize', () => this.onResize());
    }
    
    updateCherry(currentTime) {
        if (!this.lastAnimationFrameTime) this.lastAnimationFrameTime = currentTime;

        const canvas = this.shadowRoot.getElementById(CHERRY_SWARM_CANVAS_ID);
        if (!canvas) return;

        const dt = currentTime - this.lastAnimationFrameTime;
        const canvasContext = canvas.getContext('2d');

        canvasContext.fillStyle = 'white';
        canvasContext.fillRect(0, 0, this.width, this.height);
        
        this.swarms.forEach((swarm) => {
            this.animation.animate(swarm, dt, currentTime);
            swarm.renderSwarm(canvasContext);
        });

        this.lastAnimationFrameTime = currentTime;
        requestAnimationFrame((timestamp) => this.updateCherry(timestamp));
    }

    updated() {
        this.animation = generateSwarmAnimation(this.animationProps);
    }

    render() {
        return html`
            <canvas id="${CHERRY_SWARM_CANVAS_ID}" width="${this.width}" height="${this.height}"></canvas>
        `;
    }
}

customElements.define('cherry-swarm', CherrySwarmCanvas);