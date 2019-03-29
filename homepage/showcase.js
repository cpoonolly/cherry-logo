import { html } from 'lit-html';

/** Not making these web components since they rely on materialize & the scopes for these things are isolated */
class ShowCaseItem {
  constructor({title, imgSrc, content, reveal}) {
    this.title = title;
    this.imgSrc = imgSrc;
    this.content = content;
    this.reveal = reveal;
  }

  getTemplate() {
    return html`
      ${this.title ? html`
        <span class="card-title center-align">
          <h4>${this.title}</h4>
        </span>
      `: ''}
      ${this.imgSrc ? html`
        <div class="card-image">
          <img class="showcase-card-img" alt="" src="${this.imgSrc}">
        </div>
      `: ''}
      ${this.content ? html`
        <div class="card-content center-align">
          ${this.content}
        </div>
      ` : ''}
      ${this.reveal ? html`
        <div class="card-content center-align">
          <a href="#" class="activator">More</a>
        </div>
        <div class="card-reveal">
          <div style="padding: 50px 50px 0 0"><!-- Padding is buggy in materialize for some reason.. -->
            <span class="card-title grey-text text-darken-4" style=""><i class="material-icons right">close</i></span>
            ${this.reveal}
          </div>
        </div>
      ` : ''}
    `;
  }
}

class ShowCase {
  constructor(litHtmlRenderFn, elId, showCaseItems) {
    this.renderFn = litHtmlRenderFn;

    this.showCaseItems = showCaseItems;
    this.curItemIndex = 0;
    
    this.showCaseEl = document.getElementById(elId);
  }

  onNextBtnClick() {
    if (this.curItemIndex >= this.showCaseItems.length - 1)
      return;
    
    this.curItemIndex++;
    this.render();
  }

  onPrevBtnClick() {
    if (this.curItemIndex <= 0)
      return;
    
    this.curItemIndex--;
    this.render();
  }

  getTemplate() {
    const curShowCaseItem = this.showCaseItems[this.curItemIndex];
    const isFirstItem = (this.curItemIndex === 0);
    const isLastItem = (this.curItemIndex === this.showCaseItems.length - 1);

    return html`
      <div class="showcase-card card grey lighten-5">
        ${curShowCaseItem.getTemplate()}
        <div class="card-actions">
          <a class="showcase-prev-btn btn-floating red left ${isFirstItem ? 'disabled' : ''}" @click=${() => this.onPrevBtnClick()}>
            <i class="material-icons">chevron_left</i>
          </a>
          <a class="showcase-next-btn btn-floating red right ${isLastItem ? 'disabled' : ''}" @click=${() => this.onNextBtnClick()}>
            <i class="material-icons">chevron_right</i>
          </a>
        </div>
      </div>
    `;
  }

  render() {
    this.renderFn(this.getTemplate(), this.showCaseEl);
  }
}

export { ShowCase, ShowCaseItem };