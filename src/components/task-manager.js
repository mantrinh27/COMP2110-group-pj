import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';
import { TaskModel } from '../models.js';
import './task-board.js';

/**
 * TaskManager
 * Manages the main application to display task boards
 */
class TaskManager extends LitElement {
  static styles = css`
    .task-manager {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      gap: 30px;
    }
  `;

  constructor() {
    super();
    TaskModel.loadData(); // Preload the tasks
  }

  // Render the main task boards
  render() {
    return html`
      <div class="task-manager">
        <task-board category='ToDo'></task-board>
        <task-board category='Doing'></task-board>
        <task-board category='Done'></task-board>
      </div>
    `;
  }
}

customElements.define('task-manager', TaskManager);
