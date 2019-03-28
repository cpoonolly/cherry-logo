class SwarmRenderer {
  render(canvasContext, swarm) {
      throw new Error('this should be overridden...');
  }
}

//`hsl(0, 100%, ${getRandomInt(60, 90)}%)`

class SingleColoredSquareRenderer extends SwarmRenderer {
  constructor({color, size}) {
    super();

    this.color = color;
    this.size = size;
  }

  render(canvasContext, swarm) {
    let size = canvasContext.canvas.width * this.size / 1000;
    canvasContext.fillStyle = this.color;

    swarm.particles.forEach((particle) => {
        canvasContext.fillRect(particle.x, particle.y, size, size);
    });
  }
}

class MultiColoredRectsRenderer extends SwarmRenderer {
  constructor({colors, size}) {
    super();

    this.colors = colors;
    this.size = size;
  }

  render(canvasContext, swarm) {
    let size = canvasContext.canvas.width * this.size / 1000;

    canvasContext.fillStyle = this.color;

    swarm.particles.forEach((particle, index) => {
      canvasContext.fillStyle = this.colors[index % this.colors.length];
      canvasContext.fillRect(particle.x, particle.y, size, size);
    });
  }
}

class CusotmSwarmRenderer extends SwarmRenderer {
  constructor({customRenderCallback}) {
    super();

    this.customRenderCallback = customRenderCallback;
  }

  render(canvasContext, swarm) {
    swarm.particles.forEach((particle, index) => this.customRenderCallback(canvasContext, particle, index));
  }
}

function generateSwarmRenderer(renderProps) {
  console.log(`generating renderer: ${JSON.stringify(renderProps)}`);
  switch (renderProps.name) {
    case 'single-colored-rect':
        return new SingleColoredSquareRenderer(renderProps);
    case 'multi-colored-rect':
        return new MultiColoredRectsRenderer(renderProps);
    case 'custom':
        return new CusotmSwarmRenderer(renderProps);
    default:
        return new SingleColoredSquareRenderer(renderProps);
  }
}

export {
  SwarmRenderer,
  CusotmSwarmRenderer,
  generateSwarmRenderer,
}