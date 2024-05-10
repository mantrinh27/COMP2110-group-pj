import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';
import { TaskModel } from '../models.js';

/**
 * TaskPopup
 * Show a modal popup with detailed information about a task
 */
class TaskPopup extends LitElement {
  static properties = {
    id: { type: Number },
    _task: { state: true }
  };

  static styles = css`
    .modal {
      display: none;
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background-color: rgba(255, 255, 255, 0.95); /* 4th value is opacity for the pop up function*/
      width: 60%;
      max-width: 800px;
      padding: 2rem;
      border-radius: 10px;
      overflow-y: auto;
    }

    .modal.open {
      display: block;
    }

    .close {
      cursor: pointer;
      float: right;
      font-size: 1.5rem;
      color: #000;
    }
  `;

  constructor() {
    super();
    this._task = null;
    this.id = 0;
    this._handleOutsideClick = this._handleOutsideClick.bind(this);
  }

  // Set up event listeners when the component is connected
  connectedCallback() {
    super.connectedCallback();
    document.addEventListener('click', this._handleOutsideClick);
    window.addEventListener('show-task-popup', this._handleShowTaskPopup.bind(this));
  }

  // Remove event listeners when the component is disconnected
  disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener('click', this._handleOutsideClick);
    window.removeEventListener('show-task-popup', this._handleShowTaskPopup);
  }

  // Fetch the task information from the TaskModel
  async _fetchTask() {
    this._task = await TaskModel.getTask(this.id);
  }

  // Show the popup if clicked outside the modal content
  _handleOutsideClick(event) {
    const modal = this.renderRoot.querySelector('.modal');
    if (event.target === modal) {
      this._hideModal();
    }
  }

  // Handle the task popup event and show the modal
  async _handleShowTaskPopup(event) {
    this.id = event.detail.taskId;
    await this._fetchTask();
    this._showModal();
  }

  // Show the modal
  _showModal() {
    this.renderRoot.querySelector('.modal').classList.add('open');
  }

  // Hide the modal
  _hideModal() {
    this.renderRoot.querySelector('.modal').classList.remove('open');
  }

  // Render the modal content with task details
  render() {
    if (this._task) {
      const dueDate = new Date(parseInt(this._task.due)).toDateString();
      return html`
        <div class="modal" role="dialog">
          <span class="close" @click=${this._hideModal}>&times;</span>
          <h2>${this._task.summary}</h2>
          <p>Due Date: ${dueDate}</p>
          <p>Description: ${this._task.text}</p>
          <p>Priority: ${this._task.priority}</p>
        </div>
      `;
    } else {
      return html`<div>Loading...</div>`;
    }
  }
}

customElements.define('task-popup', TaskPopup);
