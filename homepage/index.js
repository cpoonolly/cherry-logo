import '../index';
import '@webcomponents/webcomponentsjs/webcomponents-loader';
import '@webcomponents/webcomponentsjs/custom-elements-es5-adapter';

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomShadeOfRed() {
  return `hsl(0, 100%, ${getRandomInt(60, 90)}%)`;
}

function spinLogo() {
  let cherryLogoEl = document.getElementById('cherry-logo');

  cherryLogoEl.spin = true;
}

function swarmSetColors() {
  let cherrySwarmEl = document.getElementById('cherry-bg-swarm');

  let colors = [];
  for (let i = 0; i < 5; i++) {
    colors.push(getRandomShadeOfRed());
  }

  cherrySwarmEl.renderProps = {
    name: 'multi-colored-rect',
    colors: colors,
    size: 5,
  };
}

function swarmDissipate() {
  let cherrySwarmEl = document.getElementById('cherry-bg-swarm');

  let swarmRect = cherrySwarmEl.getBoundingClientRect();
  let xMax = swarmRect.right;
  let yMax = swarmRect.bottom;
  let xMid = ((swarmRect.right - swarmRect.left) / 2);
  let yMid = ((swarmRect.bottom - swarmRect.top) / 2);

  let animationSequence = [];

  // first freeze .1s
  animationSequence.push({
    duration: 100,
    animationProps: { name: 'freeze' }
  });

  // then go grazy for 1s
  animationSequence.push({
    duration: 1000,
    animationProps: {
      name: 'random',
      xMax: xMax,
      yMax: yMax
    }
  });

  // then freeze for another .1s
  animationSequence.push({
    duration: 100,
    animationProps: { name: 'freeze' }
  });

  // then orbit back around new point
  animationSequence.push({
    duration: 1000,
    animationProps: {
      name: 'orbit',
      orbitX: xMid,
      orbitY: yMid,
      radius: 50,
      xMax: xMax,
      yMax: yMax
    }
  });

  // then release
  animationSequence.push({
    animationProps: { name: 'release' }
  });

  cherrySwarmEl.animationProps = {
    name: 'sequence',
    animationSequence: animationSequence
  };

  setTimeout(() => window.location.href = "info.html", 4000);
}

function playExitAnimation() {
  spinLogo();
  swarmDissipate();
  $('#cherry-logo-container').addClass('animate-exit');
}

$(document).ready(() => {
  $('.tooltipped').tooltip();

  spinLogo();
  setInterval(() => spinLogo(), 4000);

  swarmSetColors();
  $(document).on('click', () => playExitAnimation());
});