import '../index';

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomShadeOfRed() {
  return `hsl(0, 100%, ${getRandomInt(60, 90)}%)`;
}

function onScroll() {
  let cherrySwarmEl = document.getElementById('cherry-bg-swarm');
  let yMid = ($(window).height() / 2) + $(window).scrollTop();

  cherrySwarmEl.animationProps = Object.assign({}, cherrySwarmEl.animationProps, {orbitY: yMid});
}

function initializeSwarm() {
  let cherrySwarmEl = document.getElementById('cherry-bg-swarm');

  let colors = [];
  for (let i = 0; i < 5; i++) {
    colors.push(getRandomShadeOfRed());
  }

  let swarmRect = cherrySwarmEl.getBoundingClientRect();
  let xMax = swarmRect.right;
  let yMax = swarmRect.bottom;
  let xMid = $(window).width() / 2;
  let yMid = $(window).height() / 2;

  cherrySwarmEl.animationProps = {
    name: 'orbit',
    orbitX: xMid,
    orbitY: yMid,
    radius: 50,
    xMax: xMax,
    yMax: yMax
  };

  cherrySwarmEl.renderProps = {
    name: 'multi-colored-rect',
    colors: colors,
    size: 5,
  };
}

$(document).ready(() => {
  $('.modal').modal();
  initializeSwarm();
  $(document).scroll(() => onScroll());
});