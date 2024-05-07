import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';
import { TaskModel } from '../models.js';
import './task-card.js';

/**
 * TaskBoard <task-board category="XXX">
 * Display tasks in the given category
 */
class TaskBoard extends LitElement {
  static properties = {
    category: {},
    _tasks: { state: true },
    _message: { state: true },
  };

  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
      background-color: #d0cb65;
      color: #ffcc33;
      border: 1px solid red;
      padding: 10px;
      margin: 10px;
      width: 100%; /* Adjust width as needed */
      max-width: 400px; /* Adjust max-width as needed */
      overflow-y: auto; /* Add overflow-y to make the content scrollable */
    }

    .card-list {
      display: flex;
      flex-direction: column;
      gap: 15px; /* Adjust gap between tasks */
      align-items: center; /* Center tasks horizontally */
    }

    .task-card {
      width: 80%; /* Adjust width to fill the parent container */
      max-width: 250px; /* Limit the maximum width of each card */
      margin: auto; /* Ensure the card is centered horizontally */
    }
  `;

  constructor() {
    super();
    // Set an event listener to refresh the display when the data is ready
    window.addEventListener('tasks', () => {
      this._loadData();
    });
  }

  _loadData() {
    // Get the up-to-date task list based on the category
    this._tasks = TaskModel.getTasks(this.category);
  }

  render() {
    if (this._message) {
      return html`<h3>${this.category}</h3> <p>${this._message}</p>`;
    } else if (this._tasks) {
      return html`
        <div>
          <h3>${this.category}</h3>
          <div class="card-list">
            ${this._tasks.map(
              (task) => html`<task-card id=${task.id} class="task-card"></task-card>`
            )}
          </div>
        </div>
      `;
    } else {
      return html`<h3>${this.category}</h3><p>Loading...</p>`;
    }
  }
}

customElements.define('task-board', TaskBoard);
