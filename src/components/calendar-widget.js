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

    .calendar-month {
      color: red;
      margin: 15px;
    }

    .calendar-weekdays {
      color: blue;
      font-size: 12px;
      margin: 0px 10px;

      display: grid;
      grid-template-columns: repeat(7, 1fr);
      font-weight: 600;
      color: rgb(104, 104, 104);
    }

    

    
  `;

  constructor() {
    super();
    this.header = 'Calendar';
    this.date = new Date();
  }

  render() {
    return html`
        <h3 class="calendar-month">${months[this.date.getMonth()]}</h3>
        <div class="calendar-body">
          <div class="calendar-weekdays">
            <div>Sun</div>
            <div>Mon</div>
            <div>Tue</div>
            <div>Wed</div>
            <div>Thu</div>
            <div>Fri</div>
            <div>Sat</div>
          </div>
        </div
    `;
  }
}

customElements.define('calendar-widget', CalendarWidget);
