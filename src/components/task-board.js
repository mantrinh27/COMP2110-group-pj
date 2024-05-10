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
      background-color: #d9e8f3; /* Pastel blue background */
      width: 100%;
      overflow-y: auto;
      padding-bottom: 20px;
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
      background-color: #d3d3d3; /* Light grey */
      border-radius: 8px;
      transition: background-color 0.2s ease;
      border: 2px solid #1c3d79; /* Blue like the header */
    }

    .task-card:hover {
      background-color: #e0e0e0; /* Lighter grey on hover */
    }

    .task-title {
      background-color: #1c3d79; /* Same blue as the header */
      color: #ffff;
      text-align: center;
      font-weight: bold;
      font-size: 1.1em;
      text-transform: uppercase;
    }

    .task-title-bar {
    background-color: #1c3d79; /* Dark blue like the header */
    color: #fff;
    text-align: center;
    font-weight: bold;
    padding: 0.25rem 0;
    border-radius: 4px 4px 0 0; /* Rounded corners only at the top */
    }

    .edit-button, .view-details-button {
      background-color: #1c3d79; /* Same blue as the header */
      color: #fff;
      border: none;
      border-radius: 4px;
      padding: 0.5rem 1rem;
      cursor: pointer;
      transition: background-color 0.2s ease;
    }

    .edit-button:hover, .view-details-button:hover {
      background-color: #27579d; /* A shade lighter for hover */
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
            ${this._tasks.map((task) => html`<task-card id=${task.id} class="task-card">
              <div class="task-title">Sample Task ${task.id}</div>
              <button class="edit-button">Edit</button>
              <button class="view-details-button">View Details</button>
            </task-card>`)}
          </div>
        </div>
      `;
    } else {
      return html`<h3>${this.category}</h3><p>Loading...</p>`;
    }
  }
}

customElements.define('task-board', TaskBoard);
