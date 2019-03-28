import '../index';

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomShadeOfRed() {
  return `hsl(0, 100%, ${getRandomInt(60, 90)}%)`;
}

function onAboutMeBtnClick() {
  bracketsSwitchSlot(1);
  swarmGoCrazy();
}

function onExperienceBtnClick() {
  bracketsSwitchSlot(2);
  swarmGoCrazy();
}

function onProjectsBtnClick() {
  bracketsSwitchSlot(3);
  swarmGoCrazy();
}

function bracketsSwitchSlot(slotNum) {
  document.getElementById('cherry-example-brackets').setAttribute('currentSlot', slotNum);
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

function swarmGoCrazy() {
  console.log('swarmOrbitElement');
  let cherrySwarmEl = document.getElementById('cherry-bg-swarm');

  let swarmElRect = document.getElementById('cherry-bg-swarm').getBoundingClientRect();
  let swarmElX = ((swarmElRect.right - swarmElRect.left) / 2) + swarmElRect.left;
  let swarmElY = ((swarmElRect.bottom - swarmElRect.top) / 2) + swarmElRect.top;

  let animationSequence = [];

  // first freeze .1s
  animationSequence.push({
      duration: 100,
      animationProps: {name: 'freeze'}
  });

  // then go grazy for 1s
  animationSequence.push({
      duration: 1000,
      animationProps: {
      name: 'random',
          xMax: swarmElRect.right,
          yMax: swarmElRect.bottom
      }
  });

  // then freeze for another .1s
  animationSequence.push({
      duration: 100,
      animationProps: {name: 'freeze'}
  });

  // then orbit back around the center
  animationSequence.push({
      animationProps: {
          name: 'orbit',
          orbitX: swarmElX,
          orbitY: swarmElY,
          radius: 50,
          xMax: swarmElRect.right,
          yMax: swarmElRect.bottom
      }
  });

  cherrySwarmEl.animationProps = {
      name: 'sequence',
      animationSequence: animationSequence
  };
}

$('#cherry-btn-about-me').click(() => onAboutMeBtnClick());
$('#cherry-btn-experience').click(() => onExperienceBtnClick());
$('#cherry-btn-projects').click(() => onProjectsBtnClick());

$(document).ready(function(){
  $('.tooltipped').tooltip();
  swarmSetColors();
});