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
      font-size: 11px;
      font-weight: bold;
      margin: 0 8px;

      display: grid;
      grid-template-columns: repeat(7, 1fr);
      grid-template-rows: repeat(5, 1fr);
    }

    .calendar-days > div {
      gap: 5px;
      margin: 1px;
      padding: 5px;
    }

    .calendar-days > div > p {
      margin: 0px;
      padding: 4px;
      border-radius: 20px;
    }

    .calendar-days > div.urgent-task-day > p {
      background-color: red;
      color: white;
    }

    .calendar-days > div.incomplete-task-day > p {
      background-color: orange;
      color: black;
    }

    .calendar-days > div.done-task-day > p {
      background-color: limegreen;
      color: black;
      
    }

    #current-day {
      margin: 1px;
      padding: 4px;
      
      border: 2px solid black;
      // border-radius: 20px;
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

  // getTasksOnDay(testDate) {
  //   let tasksOnDay = [];
  //   for (let i = 0; i < this._tasks.length; i++) {
  //     let taskDate = new Date(this._tasks[i].due);
  //     // console.log(taskDate);
  //     // console.log(this.date.getDate() + " " + taskDate.getDate());
  //     // console.log(this.month + " " + taskDate.getMonth());
  //     if (testDate == taskDate.getDate() && this.month == taskDate.getMonth()) {
  //       tasksOnDay.push(this._tasks[i]);
  //     }
  //   }
  // }

  

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

      let generateDays = (month) => {
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
              ${generateDays(this.month).map(day => {
                let tasksOnDay = [];
                for (let i = 0; i < this._tasks.length; i++) {
                  let taskDate = new Date(this._tasks[i].due);
                  if (day == taskDate.getDate() && this.month == taskDate.getMonth()) {
                    tasksOnDay.push(this._tasks[i]);
                  }
                }
                // console.log(tasksOnDay);

                if (day == this.date.getDate() && this.month == this.date.getMonth() && this.year == this.date.getFullYear()) {
                  // if (tasksOnDay.length != 0) {
                  //   return html`<div class="urgent-task-day" id="current-day"><p>${day}</p></div>`;
                  // }
                  // return html`<div id="current-day"><p>${day}</p></div>`;
                  let urgency;
                  for (let i = 0; i < tasksOnDay.length; i++) {
                    if (tasksOnDay[i].category != "Done") {
                      urgency = "URGENT";
                    } else {
                      urgency = "DONE";
                    }
                  }

                  if (urgency == undefined) {
                    return html`<div id="current-day"><p>${day}</p></div>`;
                  } else {
                    if (urgency == "URGENT") {
                      return html`<div class="urgent-task-day" id="current-day"><p>${day}</p></div>`;
                    } else {
                      return html`<div class="done-task-day" id="current-day"><p>${day}</p></div>`;
                    }
                  }
                }

                let urgency;
                for (let i = 0; i < tasksOnDay.length; i++) {
                  let taskDate = new Date(tasksOnDay[i].due);
                  if ((taskDate.getDate() <= this.date.getDate() || taskDate.getMonth() < this.date.getMonth()) && tasksOnDay[i].category != "Done") {
                    urgency = "URGENT";
                    break;
                  } else if (tasksOnDay[i].category != "Done") {
                    urgency = "INCOMPLETE";
                  } else if (tasksOnDay[i].category == "Done" && urgency != "INCOMPLETE") {
                    urgency = "DONE";
                  }
                }

                if (urgency == undefined) {
                  return html`<div><p>${day}</p></div>`;
                } else {
                  if (urgency == "URGENT") {
                    return html`<div class="urgent-task-day"><p>${day}</p></div>`;
                  } else if (urgency == "INCOMPLETE") {
                    return html`<div class="incomplete-task-day"><p>${day}</p></div>`;
                  } else if (urgency == "DONE") {
                    return html`<div class="done-task-day"><p>${day}</p></div>`;
                  }
                }
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
