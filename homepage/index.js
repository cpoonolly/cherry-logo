import '../index';
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

function onProjectShowcaseNextBtnClick() {
  let bracketsEl = document.getElementById('cherry-example-brackets');

  bracketsSwitchSlot(bracketsEl.currentSlot + 1);
}

function onProjectShowCasePrevBtnClick() {
  let bracketsEl = document.getElementById('cherry-example-brackets');

  bracketsSwitchSlot(bracketsEl.currentSlot - 1);
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
  $('.tooltipped').tooltip({html: '<h1>Hello world</h1>'});
  projectShowCase.render();
  swarmSetColors();  
});