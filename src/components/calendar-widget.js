import {LitElement, html, css} from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';
import { TaskModel } from '../models.js';

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
    _tasks: { state: true }
  };

  static styles = css`
    :host {
        display: block;
        width: 250px;
        height: 250px;
        background-color: white;
        border: 1px solid red;
    }

    .calendar-header {
      display: grid;
      grid-template-columns: 1fr 3fr 1fr;
    }

    .calendar-month-year {
      color: red;
      margin: 10px;
      margin-top: 15px;

      font-size: 16px;
    }

    .month-change {
      cursor: pointer;
      font-family: monospace;
      font-size: 14px;

      border: none;
      border-radius: 10px;
      background-color: ash;

      user-select: none; /* Used to remove user highlighting on buttons, for aesthetics */
    }

    .month-change:first-child {
      margin: 15px 0 10px 10px;
    } 

    .month-change:last-child {
      margin: 15px 10px 10px 0;
    }

    .calendar-weekdays {
      color: blue;
      font-family: Comic Sans MS, Comic Sans, cursive;

      font-size: 12px;
      margin: 0 10px;

      display: grid;
      grid-template-columns: repeat(7, 1fr);
      font-weight: 600;
      color: rgb(104, 104, 104);
    }

    .calendar-days {
      font-size: 10px;
      margin: 0 8px;

      display: grid;
      grid-template-columns: repeat(7, 1fr);
      grid-template-rows: repeat(5, 1fr);
    }

    .calendar-days > div {
      gap: 5px;
      margin: 5px;
      padding: 5px;
    }

    #current-day {
      margin: 3px;
      color: black;
      
      border: 2px solid black;
      border-radius: 20px;
    }

    .loading {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 250px;
      margin: 0px;
    }
  `;

  static URL = "https://comp2110-portal-server.fly.dev"

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

    window.addEventListener('tasks', () => {
      this.fetchTasks();
    });
  }

  connectedCallback() {
    super.connectedCallback();
    this.fetchTasks(); // On creation, get tasks
  }

  fetchTasks() {
    this._tasks = TaskModel.getTasks();
  }

  lastMonth() {
    this.month -= 1;
    if (this.month < 0) {
      this.year -= 1;
      this.month = 11;
    }
    // console.log("Last Month");
    // console.log(this.month + " " + this.year);
    this.fetchTasks();
  }

  nextMonth() {
    this.month += 1;
    if (this.month > 11) {
      this.year += 1;
      this.month = 0;
    }
    // console.log("Next Month");
    // console.log(this.month + " " + this.year);
    this.fetchTasks();
  }

  

  render() {
    if (this._tasks.length != 0) {
      console.log("Calendar updated");
      const getFebDays = () => {
        if (this.isLeapYear) {
          return 29;
        } else {
          return 28;
        }
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
        let daysOutput = [];

        // console.log(numDaysInMonth[this.month]);
        // console.log(numDaysInMonth[this.month] + 1 + firstDay.getDay());
        for (let i = 0; i < numDaysInMonth[this.month] + firstDay.getDay(); i++) {
          if (i >= firstDay.getDay()) {
            daysOutput.push(i - firstDay.getDay() + 1);
          } else {
            daysOutput.push(" ");
          }
        }

        return daysOutput;
      }

      return html`
          <div class="calendar-header">
          <button class="month-change" @click="${this.lastMonth}"><</button>
            <h4 class="calendar-month-year">${months[this.month] + " " + this.year}</h4>
            <button class="month-change" @click="${this.nextMonth}">></button>
          </div>
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
              ${generatedDays(this.month).map(day => {
                if (day == this.date.getDate() && this.month == this.date.getMonth() && this.year == this.date.getFullYear()) {
                  return html`<div id="current-day">${day}</div>`;
                }
                return html`<div>${day}</div>`;
              })}
            </div>
          </div
      `;
    } else {
      console.log("Calendar loading");
      return html`<h3 class="loading">Loading...</h3>`;
    }
  }
}

customElements.define('calendar-widget', CalendarWidget);
