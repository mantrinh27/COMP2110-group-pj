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
      <h3>${this.header}</h3>
      <p3>Stopwatch</p3>
      <p id="stopwatch-current-time">${this.hour}h, ${this.minute}m, ${this.second}s</p>
      <div id="stopwatch-controls">
            <button id="stopwatch-start" @click="${this.startStopwatch}">Start</button>
            <button id="stopwatch-stop" @click="${this.stopStopwatch}">Stop</button>
            <button id="stopwatch-reset" @click="${this.resetStopwatch}">Reset</button>
      </div>
    `;
  }




  startStopwatch() {
    this.increment = true;
    this.interval = setInterval(() => {
      if (this.increment) {
        this.second++;
        this.requestUpdate();
      }
      if(this.second >=60) {
        this.minute+=1;
        this.second = 0;
      }
      if(this.minute >= 60) {
        this.hour+=1;
        this.minute = 0;
      }
      
    }, 1000);
  }
  
  stopStopwatch() {
    this.increment = false;
    clearInterval(this.interval);
  }
  
  resetStopwatch() {
    this.hour = 0;
    this.minute = 0;
    this.second = 0;
    this.increment = false;
    clearInterval(this.interval);
    this.requestUpdate();
  }
}


customElements.define('task-timer-widget', TaskTimerWidget);
