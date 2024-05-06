import {LitElement, html, css} from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';

class MoodWidget extends LitElement {
  static properties = {
  };

  static styles = css`
    :host {
        display: block;
        width: 250px;
        height: 250px;
        background-color: azure;
        border: 1px solid black;
    }
  `;

  constructor() {
    super();
    this.header = 'Select your mood for today';
  }

  render() {
    return html`
        <h3>${this.header}</h3>
    `;
  }
}

customElements.define('mood-widget', MoodWidget);