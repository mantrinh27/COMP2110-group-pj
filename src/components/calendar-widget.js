import {LitElement, html, css} from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';

const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

class CalendarWidget extends LitElement {
  static properties = {
  };

  static styles = css`
    :host {
        display: block;
        width: 250px;
        height: 250px;
        background-color: azure;
        border: 1px solid red;
    }
  `;

  constructor() {
    super();
    this.header = 'Calendar';
    this.date = new Date();
  }

  render() {
    return html`
        <h3>${"Calendar"}</h3>
        <h4>${months[this.date.getMonth()]}
    `;
  }
}

customElements.define('calendar-widget', CalendarWidget);
