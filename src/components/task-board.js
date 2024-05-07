import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';
import { TaskModel } from '../models.js';
import './task-card.js';

/**
 * TaskBoard
 * Displays tasks grouped under a specified category
 */
class TaskBoard extends LitElement {
  static properties = {
    category: {}, // Category of tasks to display
    _tasks: { state: true }
  };

  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
      background-color: #d0cb65;
      padding: 10px;
      width: 100%;
      max-width: 300px;
      overflow-y: auto;
    }

    .card-list {
      display: flex;
      flex-direction: column;
      gap: 15px;
      align-items: center;
    }

    .task-card {
      width: 80%;
      max-width: 250px;
      margin: auto;
    }
  `;

  constructor() {
    super();
    window.addEventListener('tasks', () => this._loadData());
  }

  // Load the tasks for this category
  _loadData() {
    this._tasks = TaskModel.getTasks(this.category);
  }

  // Render the task board with the appropriate tasks
  render() {
    if (this._tasks) {
      return html`
        <div>
          <h3>${this.category}</h3>
          <div class="card-list">
            ${this._tasks.map((task) => html`<task-card id=${task.id} class="task-card"></task-card>`)}
          </div>
        </div>
      `;
    } else {
      return html`<h3>${this.category}</h3><p>Loading...</p>`;
    }
  }
}

customElements.define('task-board', TaskBoard);
