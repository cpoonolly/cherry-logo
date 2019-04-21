import '../index';

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

function playExitAnimation() {
  spinLogo();
  $('#cherry-logo-container').addClass('animate-exit');
}

$(document).ready(() => {
  $('.tooltipped').tooltip();

  spinLogo();
  setInterval(() => spinLogo());

  $(document).on('click', () => playExitAnimation());
});