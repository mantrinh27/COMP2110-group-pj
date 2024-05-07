import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';
import { TaskModel } from '../models.js';
import './edit-task.js';
import './popup.js';

/**
 * TaskCard
 * Display an individual task with summary details
 */
class TaskCard extends LitElement {
  static properties = {
    id: 0, // Task ID
    _task: { state: true } // Task object fetched dynamically
  };

  static styles = css`
    :host {
      display: block;
      width: 200px;
      background-color: #ffffcc;
      color: #003000;
      transition: transform 0.2s ease, background-color 0.2s ease;
      border: 2px solid transparent; /* Initial border state */
      border-radius: 8px; /* Rounded corners for a neater look */
    }

    :host(:hover) {
      transform: scale(1.05); /* Scale up slightly on hover */
      background-color: #ffe680; /* Change color on hover */
      border-color: red; /* Highlight border on hover */
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

  // Fetches task details when the component is connected
  connectedCallback() {
    super.connectedCallback();
    this._loadTask();
  }

  // Load the task data based on the ID
  _loadTask() {
    this._task = TaskModel.getTask(this.id);
  }

  // Trigger the global task popup to show more task details
  _showGlobalPopup() {
    const event = new CustomEvent('show-task-popup', {
      detail: { taskId: this.id }
    });
    window.dispatchEvent(event);
  }

  // Render the task card with its details
  render() {
    if (this._task) {
      const dueDate = new Date(parseInt(this._task.due)).toDateString();
      return html`
        <div>
          <h2>${this._task.summary}</h2>
          <p>Due Date: ${dueDate}</p>
          <p>Description: ${this._task.text}</p>
          <p>Priority: ${this._task.priority}</p>
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
