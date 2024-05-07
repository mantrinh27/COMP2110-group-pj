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
      max-width: 300px; /* Adjust max-width as needed */
      overflow-y: auto; /* Add overflow-y to make the content scrollable */
    }

    .card-list {
      display: flex;
      flex-wrap: wrap;
      gap: 10px; /* Adjust gap between cards */
      justify-content: space-between; /* Center tasks within each column */
    }

    .task-card {
      width: calc(50% - 5px); /* Adjust width of each column */
    }
  `;

  constructor() {
    super();
    // set an event listener to refresh the display when the data is ready
    window.addEventListener('tasks', () => {
      this._loadData();
    });
  }

  _loadData() {
    // get the up to date task list based on the category
    this._tasks = TaskModel.getTasks(this.category);
    this.render();
  }

  updated(changedProperties) {
    super.updated(changedProperties);
    this._adjustHeight();
  }

  _adjustHeight() {
    const taskCards = this.shadowRoot.querySelectorAll('.task-card');
    if (taskCards.length > 0) {
      const lastTask = taskCards[taskCards.length - 1];
      const lastTaskRect = lastTask.getBoundingClientRect();
      this.style.height = `${lastTaskRect.bottom + 10}px`; // Add some extra space
    }
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
              (task) => html`<task-card id=${task.id}></task-card>`
            )}
          </div>
        </div>
      `;
    } else {
      return html`<h3>${this.category}</h3><p>Loading....</p>`;
    }
  }
}

customElements.define('task-board', TaskBoard);
