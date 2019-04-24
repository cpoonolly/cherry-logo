import '../cherry-logo';

function spinLogo() {
  let cherryLogoEl = document.getElementById('cherry-logo');

  cherryLogoEl.spin = true;
}

function toggleSmallNav() {
  $('.content').toggleClass('active-content-small-nav');
}

function handleNav() {
  let navTo = (window.location.hash || '#splash').substr(1);

  $('.content').removeClass('active-content-small-nav');
  $('.content').removeClass('active-content-splash');
  $('.content').removeClass('active-content-about');
  $('.content').removeClass('active-content-experience');
  $('.content').removeClass('active-content-projects');

  $('.content').addClass(`active-content-${navTo}`);

  $('.header-nav-link').removeClass('active');
  $(`.header-nav-link[href="#${navTo}"`).addClass('active');
}

window.showDetailedExperience = function(id) {
  hideDetailedExperience();

  $('.experience-summary').addClass('hidden');
  $(`#${id}.experience-detailed`).addClass('active');
}

window.hideDetailedExperience = function() {
  $('.experience-summary').removeClass('hidden');
  $('.experience-detailed').removeClass('active');
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

$(document).ready(() => {
  // Setup navigation (display different "content" depending on the url)
  handleNav();
  $(window).on('hashchange', () => handleNav());
  
  // Setup Spinning Logo
  setInterval(() => spinLogo(), 8000);

  // Setup Small Screen Navigation (the hamburger menu)
  $('.header-small-nav-link').on('click', () => toggleSmallNav());

  // Setup Scroll Animations
  updateScrollAnimations();
  $(document).scroll(() => updateScrollAnimations());
});