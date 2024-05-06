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
      font-family: Comic Sans MS, Comic Sans, cursive;

      font-size: 12px;
      margin: 10px;

      display: grid;
      grid-template-columns: repeat(7, 1fr);
      font-weight: 600;
      color: rgb(104, 104, 104);
    }

    .calendar-days {
      font-size: 10px;
      margin: 8px;

      border: 1px solid;
      display: grid;
      grid-template-columns: repeat(7, 1fr);
      grid-template-rows: repeat(5, 1fr);
    }

    .calendar-days > div {
      border: 1px solid;
      gap: 5px;
      justify-self: left;
    }
  `;

  constructor() {
    super();
    this.header = 'Calendar';
    this.date = new Date();
    this.month = this.date.getMonth();
    this.year = this.date.getFullYear();
    if (this.year % 400 == 0 || (this.year % 100 != 0 && this.year % 4 == 0)) {
      this.isLeapYear = true;
    } else {
      this.isLeapYear = false;
    }
  }

  render() {
    const getFebDays = () => {
      return this.isLeapYear ? 29 : 28;
    };

    let numDaysInMonth = [
      31,
      getFebDays(),
      31,
      30,
      31,
      30,
      31,
      31,
      30,
      31,
      30,
      31,
    ];

    let generatedDays = (month) => {
      let firstDay = new Date(2024, month);

      let daysOutput;
      for (let i = 0; i < numDaysInMonth[this.month] + firstDay.getDay(); i++) {
        if (i < firstDay.getDay()) {
          continue;
        }

        daysOutput += `${i - firstDay.getDay()}`;
      }

      // NOTE USE MAP FUNCTION, CHECK WEEK 7
      // return html`${daysOutput}`;
      return html`
      <div>1</div>
      <div>2</div>
      <div>3</div>
      <div>4</div>
      <div>5</div>
      <div>6</div>
      <div>7</div>
      <div>8</div>
      <div>9</div>
      `;
    }

    return html`
        <h3 class="calendar-month">${months[this.month]}</h3>
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
          <div class="calendar-days">
            ${generatedDays(this.month)}
          </div>
        </div
    `;
  }
}

customElements.define('calendar-widget', CalendarWidget);
