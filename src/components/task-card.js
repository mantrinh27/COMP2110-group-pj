import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';
import { TaskModel } from '../models.js';
import './edit-task.js';
import './popup.js'; // Import the TaskPopup component

class TaskCard extends LitElement {
  static properties = {
    id: 0,
    _task: { state: true },
    _hovered: { state: true }
  };

  static styles = css`
    :host {
        display: block;
        width: 200px;
        background-color: #ffffcc;
        color: #003000;
        transition: transform 0.2s ease, background-color 0.2s ease;
      }

    :host(:hover) {
      transform: scale(1.05);
      background-color: red; /* Change the color on hover */
    }

    h2 {
      background-color: red;
      font-size: large;
      font-variant: small-caps;
    }
  `;

  connectedCallback() {
    super.connectedCallback();
    this._loadData();
    // set up an event listener to load new tasks when they change
    window.addEventListener('tasks', () => {
      this._loadData();
    });
  }

  _loadData() {
    this._task = TaskModel.getTask(this.id);
  }

  _showPopup() {
    const popup = this.renderRoot.querySelector('task-popup');
    popup._showModal();
  }

  render() {
    if (this._task) {
      const ts = new Date(parseInt(this._task.timestamp));
      const due = new Date(parseInt(this._task.due));
      return html`
      <div>
        <h2>${this._task.summary}</h2>
        <p class='task-timestamp'>${ts.toDateString()}</p>
        <p class='task-due'>${due.toDateString()}</p>
        <p class='task-content'>${this._task.text}</p>
        <p class='task-priority'>${this._task.priority}</p>

        <edit-task id=${this.id}></edit-task>
        
        <!-- Button for view details -->
        <button @click=${this._showPopup}>View Details</button>
        
        <task-popup id=${this.id}></task-popup>
      </div>
      `;
    } else {
      return html`<div>Loading...</div>`;
    }
  }
}
customElements.define('task-card', TaskCard);
