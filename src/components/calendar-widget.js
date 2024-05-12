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
        height: 285px;
        background-color: white;
        border: 1px solid black;
    }

    .calendar-header {
      display: grid;
      grid-template-columns: 1fr 3fr 1fr;
    }

    .calendar-month-year {
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
      grid-template-rows: repeat(6, 1fr);
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
      padding: 3px;
      
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

    .calendar-legend {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      align-items: center;

      font-size: 8px;
      margin: 0px 10px;
    }

    .calendar-legend > div {
      display: flex;
      height: 20px;
      align-items: center;
      justify-content: center;

      margin: 2px 2px;
    }

    #legend-done {
      background-color: limegreen;
    }

    #legend-todo {
      background-color: orange;
    }

    #legend-urgent {
      background-color: red;
      color: white;
    }
  `;

  static URL = "https://comp2110-portal-server.fly.dev"

  constructor() {
    super();
    this.header = 'Calendar';
    this.date = new Date();
    this.month = this.date.getMonth();  // Initial month is the current month
    this.year = this.date.getFullYear();  // Initial year is the current year
    
    // Checks if this year is a leap year
    this.updateLeapYear();

    window.addEventListener('tasks', () => {
      this.fetchTasks();
    });
  }

  connectedCallback() {
    super.connectedCallback();
    this.fetchTasks(); // On creation, get tasks
  }

  // Gets tasks
  fetchTasks() {
    this._tasks = TaskModel.getTasks();
  }

  // Checks if the current year is a leap year, for February date generation
  updateLeapYear() {
    if (this.year % 400 == 0 || (this.year % 100 != 0 && this.year % 4 == 0)) {
      this.isLeapYear = true;
    } else {
      this.isLeapYear = false;
    }
  }

  // Button function to decrement the displayed month to the previous month
  lastMonth() {
    this.month -= 1;
    if (this.month < 0) { // If reached outer bound, decrement year and set month to December
      this.year -= 1;
      this.month = 11;
      this.updateLeapYear(); // Update leap year status due to year change
    }
    this.fetchTasks();  // Update tasks
  }

  // Button function to increment the displayed month to the next month
  nextMonth() {
    this.month += 1;
    if (this.month > 11) {  // If reached outer bound, increment year and set month to January
      this.year += 1;
      this.month = 0;
      this.updateLeapYear(); // Update leap year status due to year change
    }
    this.fetchTasks();  // Update tasks
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
    const getFebDays = () => {  // Leap year dictates February dates
      if (this.isLeapYear) {
        return 29;
      } else {
        return 28;
      }
    };

    // Number of days in each month
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

    // Generates the days
    let generateDays = (month) => {
      // Uses a new date object to know what day the 1st starts on 
      let firstDay = new Date(2024, month); 
      let daysOutput = [];

      // Appends date numbers to array, as well as blanks for padding purposes
      for (let i = 0; i < numDaysInMonth[this.month] + firstDay.getDay() + 6; i++) {
        if (i >= firstDay.getDay() && i < numDaysInMonth[this.month] + firstDay.getDay()) {
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

              // Creates array of tasks on day (I didn't realise there already was a function for that in model.js)
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
                if (taskDate.getFullYear() == this.year) {
                  if ((taskDate.getDate() <= this.date.getDate() && taskDate.getMonth() <= this.date.getMonth()) && tasksOnDay[i].category != "Done") {
                    if (taskDate.getFullYear() <= this.date.getFullYear()) {
                      urgency = "URGENT";
                      break;
                    } else {
                      urgency = "INCOMPLETE";
                    }
                  } else if (tasksOnDay[i].category != "Done") {
                    urgency = "INCOMPLETE";
                  } else if (tasksOnDay[i].category == "Done" && urgency != "INCOMPLETE") {
                    urgency = "DONE";
                  } 
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
          <div class="calendar-legend">
            <div id="legend-done">All Tasks Done</div>
            <div id="legend-todo">Tasks To Do</div>
            <div id="legend-urgent">URGENTLY Outstanding Tasks!</div>
          </div>
        </div
    `;
  }
}

customElements.define('calendar-widget', CalendarWidget);
