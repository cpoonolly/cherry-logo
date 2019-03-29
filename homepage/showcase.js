import { html } from 'lit-html';

/** Not making these web components since they rely on materialize & the scopes for these things are isolated */
class ShowCaseItem {
  constructor({title, imgSrc, content}) {
    this.title = title;
    this.imgSrc = imgSrc;
    this.content = content;
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
      <div class="showcase-card card">
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