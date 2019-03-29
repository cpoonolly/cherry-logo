import '../index';

import honestBuildingsImg from './imgs/honestbuildings.jpeg';
import goldmanSachsImg from './imgs/goldmansachs.png';
import internshipsImg from './imgs/internships.png';
import volunteerImg from './imgs/volunteer.png';

import pigeonImg from './imgs/pigeon.svg';
import pokerchipImg from './imgs/pokerchip.png';
import taskGraphImg from './imgs/taskgraph.svg';
import nycDOBImg from './imgs/nycdob.png';
import githubImg from './imgs/github.png';

import { ShowCase, ShowCaseItem } from './showcase';
import { html, render } from 'lit-html';

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
  document.getElementById('cherry-brackets').setAttribute('currentSlot', slotNum);
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

const experienceShowCase = new ShowCase(render, 'cherry-experience', [
  new ShowCaseItem({
    title: 'Honest Buildings',
    imgSrc: honestBuildingsImg,
    content: html`
      <h6>Senior Software Engineer & Technical Lead</h6>
      <!--<p>Feb 2015 to Oct 2018</p>-->
      <br/>
      <p>
        Honest Buildings is a asset management tool used by some of the largest owners in real estate.
        <br/><br/>
        I initially joined HB 3 years ago and got to watch the company grow from ~15 to >100 people.
        <br/><br/>
        It was an incredibly valuable experience scaling the business & team up.
        <br/><br/>
        After devivering several high impact projects such our primary user dashboard, our permissions system, cost tracking, etc.
        <br/><br/>
        I was eventually given the opportunity to lead a small squad of 4. Together we delivered some key projects including capital planning & internationalization.
      </p>
    `
  }),
  new ShowCaseItem({
    title: 'Goldman Sachs',
    imgSrc: goldmanSachsImg,
    content: html`
      <h6>Technical Analyst</h6>
      <p>Jul 2013 to Feb 2015</p> 
    `
  }),
  new ShowCaseItem({
    title: 'Internships',
    imgSrc: internshipsImg,
    content: html`
      <h6>Technical Analyst</h6>
      <p>Jul 2013 to Feb 2015</p>
    `
  }),
  new ShowCaseItem({
    title: 'Volunteer Experience',
    imgSrc: volunteerImg,
    content: html`
    `
  })
]);

const projectShowCase = new ShowCase(render, 'cherry-projects', [
  new ShowCaseItem({
    title: 'Pigeon RTC',
    imgSrc: pigeonImg,
    content: html`
      <p>A pigeon based video chat Application!</p><br/>
      <p>Build with: WebRTC, React, & Material-UI</p><br/>
      <span>
        <a class="showcase-card-link" href="https://cpoonolly.github.io/pigeon-rtc">Website</a>
        <a class="showcase-card-link" href="https://github.com/cpoonolly/pigeon-rtc">Github</a>
      </span>
    `
  }),
  new ShowCaseItem({
    title: 'Pokerchip Counter',
    imgSrc: pokerchipImg,
    content: html`
      <p>A Android app for tracking pokerchips in a poker game</p><br/>
      <p>Build with: React Native</p><br/>
      <span>
        <a class="showcase-card-link" href="https://expo.io/@cpoonolly/PokerChipCounter">Expo</a>
        <a class="showcase-card-link" href="https://cpoonolly.github.io/pokerchipcounter">Github</a>
      </span>
    `
  }),
  new ShowCaseItem({
    title: 'NYC DOB',
    imgSrc: nycDOBImg,
    content: html`
      <p>A ETL pipeline for scraping permits from the NYC department of buildings website and uploading to a Redshift database</p><br/>
      <p>Build with: AWS Lambda, Java, Jsoup, & Redshift</p><br/>
      <span>
        <a class="showcase-card-link" href="https://github.com/cpoonolly/nyc_dob_etl">Github</a>
      </span>
    `
  }),
  new ShowCaseItem({
    title: 'Task Graph',
    imgSrc: taskGraphImg,
    content: html`
      <p>A simple app for creating & organizing tasks & subtasks.</p><br/>
      <p>Build with: Angular2, Angular Material, & ngx-md (for displaying markdown)</p><br/>
      <span>
        <a class="showcase-card-link" href="https://cpoonolly.github.io/task-graph">Website</a>
        <a class="showcase-card-link" href="https://github.com/cpoonolly/task-graph">Github</a>
      </span>
    `
  }),
  new ShowCaseItem({
    imgSrc: githubImg,
    content: html`<a class="showcase-card-link" href="https://github.com/cpoonolly/">See more on Github!</a>`
  })
]);

$(document).ready(() => {
  $('.tooltipped').tooltip();
  projectShowCase.render();
  experienceShowCase.render();
  swarmSetColors();  
});