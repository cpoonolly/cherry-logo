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

function showDetailedExperience(id) {
  hideDetailedExperience();

  $('.experience-summary').addClass('hidden');
  $(`#${id}.experience-detailed`).addClass('active');
}

function hideDetailedExperience() {
  $('.experience-summary').removeClass('hidden');
  $('.experience-detailed').removeClass('active');
}

function updateScrollAnimations() {
  $('*[data-scroll-animation]:not(.animated)').each((index, el) => {
    let jqueryEl = $(el);

    if (jqueryEl.offset().top < $(window).scrollTop() + $(window).height()) {
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

  // Setup Experience Transitions
  $('.experience-detailed-exit').on('tap click', () => hideDetailedExperience());
  $('#experience-summary-hb').on('tap click', () => showDetailedExperience('experience-hb'));
  $('#experience-summary-gs').on('tap click', () => showDetailedExperience('experience-gs'));
  $('#experience-summary-gs-intern').on('tap click', () => showDetailedExperience('experience-gs-intern'));
  $('#experience-summary-guardian').on('tap click', () => showDetailedExperience('experience-guardian'));
  $('#experience-summary-apg').on('tap click', () => showDetailedExperience('experience-apg'));
  $('#experience-summary-greenlion').on('tap click', () => showDetailedExperience('experience-greenlion'));
  $('#experience-summary-ubeci').on('tap click', () => showDetailedExperience('experience-ubeci'));
});