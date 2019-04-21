import '../index';

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function spinLogo() {
  let cherryLogoEl = document.getElementById('cherry-logo');

  cherryLogoEl.spin = true;
}

function toggleSmallNav() {
  $('.content').toggleClass('small-nav-open');
}

$(document).ready(() => {
  spinLogo();
  setInterval(() => spinLogo(), 8000);

  $('.header-nav-small-link').on('click', () => toggleSmallNav())
});