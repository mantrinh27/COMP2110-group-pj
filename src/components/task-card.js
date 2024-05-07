import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';
import { TaskModel } from '../models.js';
import './edit-task.js';
import './popup.js';

class TaskCard extends LitElement {
  static properties = {
    id: 0,
    _task: { state: true }
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
      background-color: red; /* Change color on hover */
    }

    h2 {
      background-color: red;
      font-size: large;
      font-variant: small-caps;
    }

    .button-container {
      margin-top: 10px;
      display: flex;
      justify-content: space-between;
    }
  `;

  connectedCallback() {
    super.connectedCallback();
    this._loadData();
    // Listen for changes to refresh the task data
    window.addEventListener('tasks', () => {
      this._loadData();
    });
  }

  _loadData() {
    this._task = TaskModel.getTask(this.id);
  }

  _showGlobalPopup() {
    // Dispatch an event to show the global popup
    const event = new CustomEvent('show-task-popup', {
      detail: { taskId: this.id },
      bubbles: true,
      composed: true
    });
    window.dispatchEvent(event);
  }

  render() {
    if (this._task) {
      const due = new Date(parseInt(this._task.due)); // Only get the due date
      return html`
        <div>
          <h2>${this._task.summary}</h2>
          <p class='task-due'>Due Date: ${due.toDateString()}</p> <!-- Show only the due date -->
          <p class='task-content'> Description: ${this._task.text}</p>
          <p class='task-priority'>Priority: ${this._task.priority}</p>

          <!-- Container for buttons -->
          <div class="button-container">
            <edit-task id=${this.id}></edit-task>
            <button @click=${this._showGlobalPopup}>View Details</button>
          </div>
        </div>
      `;
    } else {
      return html`<div>Loading...</div>`;
    }
  }
}

customElements.define('task-card', TaskCard);
