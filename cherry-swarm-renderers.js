class SwarmRenderer {
  render(canvasContext, swarm) {
      throw new Error('this should be overridden...');
  }
}

class SingleColoredSquareRenderer extends SwarmRenderer {
  constructor({bgColor, color, size}) {
    super();

    this.color = color;
    this.size = size;
    this.bgColor = bgColor || 'white';
  }

  render(canvasContext, swarm) {
    const canvasWidth = canvasContext.canvas.width;
    const canvasHeight = canvasContext.canvas.height;
    const particleSize = canvasWidth * this.size / 1000;

    // clear canvas
    canvasContext.fillStyle = this.bgColor;
    canvasContext.fillRect(0, 0, canvasWidth, canvasHeight);

    // render particles
    canvasContext.fillStyle = this.color;
    swarm.particles.forEach((particle) => {
        canvasContext.fillRect(particle.x, particle.y, particleSize, particleSize);
    });
  }
}

class MultiColoredRectsRenderer extends SwarmRenderer {
  constructor({bgColor, colors, size}) {
    super();

    this.colors = colors;
    this.size = size;
    this.bgColor = bgColor || 'white';
  }

  render(canvasContext, swarm) {
    const canvasWidth = canvasContext.canvas.width;
    const canvasHeight = canvasContext.canvas.height;
    const particleSize = canvasWidth * this.size / 1000;

    // clear canvas
    canvasContext.fillStyle = this.bgColor;
    canvasContext.fillRect(0, 0, canvasWidth, canvasHeight);

    // render particles
    canvasContext.fillStyle = this.color;
    swarm.particles.forEach((particle, index) => {
      canvasContext.fillStyle = this.colors[index % this.colors.length];
      canvasContext.fillRect(particle.x, particle.y, particleSize, particleSize);
    });
  }
}

class CusotmSwarmRenderer extends SwarmRenderer {
  constructor({customRenderCallback}) {
    super();

    this.customRenderCallback = customRenderCallback;
  }

  render(canvasContext, swarm) {
    this.customRenderCallback(canvasContext, swarm);
  }
}

function generateSwarmRenderer(renderProps) {
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