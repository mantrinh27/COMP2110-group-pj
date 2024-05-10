import {LitElement, html, css} from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';
import { TaskModel } from '../models.js';

class MoodWidget extends LitElement {
  static get styles() {
    return css`
    :host {
      display: block;
      width: 250px;
      height: 285px;
      background-color: white;
      border: 1px solid black;
  }
    .title {
      font-weight: bold;
      margin-bottom: 5px;
    }
    `;
  }

  constructor() {
    super();
    this.icon = '😊'; // Default to happy icon
    this.updateIcon(); // Update the icon based on tasks' status
  }

  updateIcon() {
    const today = new Date();
    const tasks = TaskModel.getTasksForDay(today);
    if (tasks.length === 0) {
      this.icon = '😊'; // No tasks for today, show happy icon
    } else {
      const closestTask = tasks.reduce((prev, current) => {
        return Math.abs(new Date(prev.due) - today) < Math.abs(new Date(current.due) - today) ? prev : current;
      });
      const dueDate = new Date(closestTask.due);
      if (dueDate < today) {
        this.icon = '😭'; // Task is overdue, show upset icon
      } else {
        this.icon = '😢'; // Task is due today, show worried icon
      }
    }
    this.requestUpdate();
  }

  render() {
    return html`
        <div class="title">Mood Widget</div>
        ${this.icon === '😊' ? html`<span class="${this.icon === '😊' ? 'happy' : 'upset'}">${this.icon}</span> Yay, there is no task due for today!` : html`<span class="${this.icon === '😊' ? 'happy' : 'upset'}">${this.icon}</span>`}
      </div>
    `;
  }
}

customElements.define('mood-widget', MoodWidget);

