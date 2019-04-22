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
  $('.content').toggleClass('active-content-small-nav');
}

function handleNav() {
  let navTo = (window.location.hash || '#splash').substr(1);
  console.log(navTo);

  $('.content').removeClass('active-content-small-nav');
  $('.content').removeClass('active-content-splash');
  $('.content').removeClass('active-content-about');
  $('.content').removeClass('active-content-experience');
  $('.content').removeClass('active-content-projects');

  $('.content').addClass(`active-content-${navTo}`);

  $('.header-nav-link').removeClass('active');
  $(`.header-nav-link[href="#${navTo}"`).addClass('active');
}

$(document).ready(() => {
  handleNav();
  setInterval(() => spinLogo(), 8000);
  $('.header-small-nav-link').on('click', () => toggleSmallNav())
  $(window).on('hashchange', () => handleNav());
});