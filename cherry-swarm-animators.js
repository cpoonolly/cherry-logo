import { getRandomInt } from './utils';

class SwarmAnimator {
  animate(swarm, dt, currentTime) {
    throw new Error('this should be overridden...');
  }

  onCanvasResize(oldWidth, oldHeight, newWidth, newHeight) {
    throw new Error('this should be overriden...');
  }
}

function generateSwarmAnimator(animationProps) {
  console.log('hello world');
  console.log(`generating animation: ${JSON.stringify(animationProps)}`);
  switch (animationProps.name) {
    case 'orbit':
      return new OrbitPointSwarmAnimator(animationProps);
    case 'random':
      return new RandomMotionSwarmAnimator(animationProps);
    case 'freeze':
      return new FreezeSwarmAnimator(animationProps);
    case 'sequence':
      return new SequencedSwarmAnimator(animationProps);
    case 'custom':
      return new CustomSwarmAnimator(animationProps);
    default:
      return new OrbitPointSwarmAnimator(animationProps);
  }
}

/**
*  Define Pre-Built Swarm Animators
*/

class OrbitPointSwarmAnimator extends SwarmAnimator {
  static validateParams(orbitX, orbitY, radius, xMax, yMax) {
    if (orbitX === undefined || orbitX === null) throw Error('invalid orbit animation - orbitX is null/undefined');
    if (orbitY === undefined || orbitY === null) throw Error('invalid orbit animation - orbitY is null/undefined');
    if (radius === undefined || radius === null) throw Error('invalid orbit animation - radius is null/undefined');
    if (xMax === undefined || xMax === null) throw Error('invalid orbit animation - xMax is null/undefined');
    if (yMax === undefined || yMax === null) throw Error('invalid orbit animation - yMax is null/undefined');
  }

  constructor({orbitX, orbitY, radius, xMax, yMax}) {
    super();
    
    OrbitPointSwarmAnimator.validateParams(orbitX, orbitY, radius, xMax, yMax);

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

class RepelPointSwarmAnimator extends SwarmAnimator {
  static validateParams(repelX, repelY) {
    if (repelX === undefined || repelX === null) throw Error('invalid orbit animation - repelX is null/undefined');
    if (repelY === undefined || repelY === null) throw Error('invalid orbit animation - repelY is null/undefined');
  }

  constructor({repelX, repelY}) {
    super();

    RepelPointSwarmAnimator.validateParams(repelX, repelY);

    this.repelX = repelX;
    this.repelY = repelY;
  }

  animate(swarm, dt, currentTime) {
    throw new Error('this should be overridden...');
  }

  onCanvasResize() {
    // noop
  }
}

class RandomMotionSwarmAnimator extends SwarmAnimator {
  static validateParams(xMax, yMax) {
    if (xMax === undefined || xMax === null) throw Error('invalid orbit animation - xMax is null/undefined');
    if (yMax === undefined || yMax === null) throw Error('invalid orbit animation - yMax is null/undefined');
  }

  constructor({xMax, yMax}) {
    super();

    RandomMotionSwarmAnimator.validateParams(xMax, yMax);

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

class FreezeSwarmAnimator extends SwarmAnimator {
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

class CustomSwarmAnimator extends SwarmAnimator {
  constructor({onAnimate, onCanvasResize}) {
    super();

    if (!onAnimate || !onCanvasResize)
      throw new Error('custom animation - missing or invalid callbacks');

    this.onAnimateCallback = onAnimate;
    this.onCanvasResizeCallback = onCanvasResize;
  }

  animate(swarm) {
    swarm.particles.forEach((particle) => this.animateParticleCallback(particle, dt, currentTime));
  }

  onCanvasResize(oldWidth, oldHeight, newWidth, newHeight) {
    this.onCanvasResize(oldWidth, oldHeight, newWidth, newHeight);
  }
}

class SequencedSwarmAnimator extends SwarmAnimator {
  // should be an array of objects with signature: {animationProps, duration}
  constructor({animationSequence}) {
    super();

    if (!animationSequence || animationSequence.length <= 0)
        throw Error('sequence animation - invalid animation sequence');

    let atTime = 0;
    this.animations = [];
    animationSequence.forEach(({animationProps, duration}, index) => {
      let animation = generateSwarmAnimator(animationProps); // will throw an exception if incorrect
      this.animations.push({animation, atTime})

      if (index < animationSequence.length - 1) {
        if (duration === null || duration === undefined)
          throw new Error(`sequence animation - invalid animation #${index + 1} in sequence invalid`)
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

export {
  SwarmAnimator,
  OrbitPointSwarmAnimator,
  RandomMotionSwarmAnimator,
  FreezeSwarmAnimator,
  SequencedSwarmAnimator,
  CustomSwarmAnimator,
  RepelPointSwarmAnimator,
  generateSwarmAnimator,
}