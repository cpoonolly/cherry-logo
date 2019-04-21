import '../index';

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomShadeOfRed() {
  return `hsl(0, 100%, ${getRandomInt(70, 100)}%)`;
}

function swarmOrbitPoint(swarmId, radius) {
  console.log(`swarm re-orbit`);
  let swarmEl = document.getElementById(swarmId);

  let xMax = swarmEl.offsetWidth;
  let yMax = swarmEl.offsetHeight;
  let orbitX = xMax / 2;
  let orbitY = yMax / 2;

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
    animationProps: {
      name: 'orbit',
      orbitX: orbitX,
      orbitY: orbitY,
      radius: radius,
      xMax: xMax,
      yMax: yMax,
    }
  });

  swarmEl.animationProps = {
    name: 'sequence',
    animationSequence: animationSequence
  };
}

function updateScrollAnimations() {
  $('*[data-scroll-animation]:not(.animated)').each((index, el) => {
    let jqueryEl = $(el);

    if (jqueryEl.offset().top < $(window).scrollTop() + $(window).height()) {
      console.log('animating element');
      jqueryEl.addClass('animated');
      jqueryEl.addClass(jqueryEl.attr('data-scroll-animation'));
    }
  });
}

function initializeSwarm() {
  let swarmEl = document.getElementById('bg-swarm');

  let colors = [];
  for (let i = 0; i < 5; i++) {
    colors.push(getRandomShadeOfRed());
  }

  swarmEl.renderProps = {
    name: 'multi-colored-rect',
    colors: colors,
    size: 10,
    bgColor: '#b71c1c',
  };

  setInterval(() => swarmOrbitPoint('bg-swarm', getRandomInt(10, 100)), 10000);
}

$(document).ready(() => {
  $('.modal').modal();
  
  initializeSwarm();

  updateScrollAnimations();
  $(document).scroll(() => updateScrollAnimations());
});