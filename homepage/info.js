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

function swarmOrbitViewportCenter() {
  let cherrySwarmEl = document.getElementById('cherry-bg-swarm');

  let xMax = cherrySwarmEl.offsetWidth;
  let yMax = cherrySwarmEl.offsetHeight;
  let xMid = $(window).width() / 2;
  let yMid = ($(window).height() / 2) + $(window).scrollTop();

  cherrySwarmEl.animationProps = {
    name: 'orbit',
    orbitX: xMid,
    orbitY: yMid,
    radius: 50,
    xMax: xMax,
    yMax: yMax
  };
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
    size: 10,
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
  swarmSetColors();
  swarmOrbitViewportCenter();
}

function onScroll() {
  swarmOrbitViewportCenter();
  updateScrollAnimations();
}

$(document).ready(() => {
  $('.modal').modal();
  
  initializeSwarm();
  updateScrollAnimations();
  $(document).scroll(() => onScroll());
});