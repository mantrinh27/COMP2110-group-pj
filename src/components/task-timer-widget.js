import {LitElement, html, css} from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';


/**
 * WidgetBlock <widget-block header="Sample Widget">
 * Base example for a widget, used as a placeholder in design for unimplemented
 * widgets
 */
class TaskTimerWidget extends LitElement {
  static properties = {
    header: {type: String},
  };

  static styles = css`
    :host {
        display: block;
        width: 250px;
        height: 250px;
        background-color: white;
        border: 1px solid black;
    }
    #hour-input, #minute-input, #second-input {
      width: 15%;  /* Each input takes roughly 33% of the parent container */
      display: inline-block;
    }

  `;

  constructor() {
    super();
    this.header = 'Task Timer Widget';
    this.hour = 0;
    this.minute = 0;
    this.second = 0;
    this.increment = false;
    this.interval = null;
  }

  render() {
    return html`
      <h3 id="tasktimerheader">${this.header}</h3>
      <p5 id="timeleft">Time left</p5>
      <p id="stopwatch-current-time">${this.hour}h, ${this.minute}m, ${this.second}s</p>
      <form id"formid">
      <div id="stopwatch-controls">
        <input id="hour-input" type="number" min="0" max="23" placeholder="HH">
        <input id="minute-input" type="number" min="0" max="59" placeholder="MM">
        <input id="second-input" type="number" min="0" max="59" placeholder="SS">
        <br>
        <button id="stopwatch-start" @click="${this.startStopwatch}">Start</button>
        <button id="stopwatch-stop" @click="${this.stopStopwatch}">Stop</button>
        <button id="stopwatch-reset" @click="${this.resetStopwatch}">Clear</button>
      </div>
    </form>
    `;
  }




  startStopwatch(event) {
    event.preventDefault();
    const hourInput = this.shadowRoot.querySelector('#hour-input');
    this.hour = Number(hourInput.value) || 0;
  
    const minuteInput = this.shadowRoot.querySelector('#minute-input');
    this.minute = Number(minuteInput.value) || 0;
  
    const secondInput = this.shadowRoot.querySelector('#second-input');
    this.second = Number(secondInput.value) || 0;

    if(this.increment != true) {
      this.increment = true;
    this.interval = setInterval(() => {
      if (this.increment) {
        this.second--;
        this.requestUpdate();
      }
      if(this.second <= 0 && this.minute <= 0 && this.hour <= 0) {
        alert("Task timer finished");
        this.increment = false;
        clearInterval(this.interval);
        this.requestUpdate();
      }
      if(this.second ==-1) {
        this.second = 0;
        this.requestUpdate();

      }

      if(this.hour == 0 && this.minute == 59 && this.second == 0) {
        this.second = 59;
      }
      else{
      if(this.second < 0) {
        this.second = 59;
        this.requestUpdate();
      }
      if(this.minute < 0) {
        this.minute = 59;
        this.requestUpdate();
      }
      if(this.hour < 0) {
        this.hour = 59;
        this.requestUpdate();
      }

      if(this.second == 0) {
        if(this.minute != 0) {
          this.minute--;
          this.second = 59;
          this.requestUpdate();
        }
      }
      if(this.minute == 0 && this.second == 0) {
        if(this.hour != 0) {
          this.hour--;
          this.minute = 59;
          this.requestUpdate();
        }
      }
      }
    }, 1000);
    }
  }

  
  stopStopwatch(event) {
    event.preventDefault();
    this.increment = false;
    clearInterval(this.interval);
  }
  
  resetStopwatch(event) {
    event.preventDefault();
    this.hour = 0;
    this.minute = 0;
    this.second = 0;
    this.increment = false;
    clearInterval(this.interval);
    this.requestUpdate();
  }
}


customElements.define('task-timer-widget', TaskTimerWidget);
