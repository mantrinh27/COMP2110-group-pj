import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';
import { TaskModel } from '../models.js';

class TaskPopup extends LitElement {
  static properties = {
    id: { type: Number },
    _task: { state: true }
  };

  static styles = css`
    .modal {
      display: none;
      position: fixed;
      z-index: 1000;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%); /* Center the modal */
      background-color: rgba(255, 255, 255, 0.95); /* Semi-transparent white background */
      box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3); /* Shadow for distinction */
      width: 60%; /* Increase width */
      max-width: 800px; /* Set a maximum width */
      height: 60%; /* Set a relative height */
      max-height: 600px; /* Set a maximum height */
      padding: 2rem; /* Padding for better spacing */
      border-radius: 10px; /* Rounded corners */
      overflow-y: auto; /* Scrollable if needed */
    }

    .modal.open {
      display: block; /* Only show the modal when it has this class */
    }

    .close {
      cursor: pointer; /* Make the close button clickable */
      float: right; /* Align it to the right of the modal */
      font-size: 1.5rem; /* Larger font for visibility */
      color: #000; /* Black color for contrast */
    }
  `;

  constructor() {
    super();
    this._handleOutsideClick = this._handleOutsideClick.bind(this);
    this._task = null;
    this.id = 0;
  }

  connectedCallback() {
    super.connectedCallback();
    document.addEventListener('click', this._handleOutsideClick);
    window.addEventListener('show-task-popup', this._handleShowTaskPopup.bind(this));
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener('click', this._handleOutsideClick);
    window.removeEventListener('show-task-popup', this._handleShowTaskPopup);
  }

  async _fetchTask() {
    this._task = await TaskModel.getTask(this.id);
  }

  _handleOutsideClick(event) {
    const modal = this.renderRoot.querySelector('.modal');
    if (event.target === modal) {
      this._hideModal(); // Close the modal when clicking outside of it
    }
  }

  async _handleShowTaskPopup(event) {
    this.id = event.detail.taskId;
    await this._fetchTask();
    this._showModal();
  }

  _showModal() {
    const modal = this.renderRoot.querySelector('.modal');
    modal.classList.add('open'); // Add "open" to show the modal
  }

  _hideModal() {
    const modal = this.renderRoot.querySelector('.modal');
    modal.classList.remove('open'); // Remove "open" to hide the modal
  }

  render() {
    if (this._task) {
      const ts = new Date(parseInt(this._task.timestamp));
      const due = new Date(parseInt(this._task.due));
      return html`
        <div class="modal" role="dialog">
          <div class="modal-content">
            <span class="close" aria-label="Close" @click=${this._hideModal}>&times;</span>
            <h2>${this._task.summary}</h2>
            <p class='task-timestamp'>${ts.toDateString()}</p>
            <p class='task-due'>${due.toDateString()}</p>
            <p class='task-content'>${this._task.text}</p>
            <p class='task-priority'>${this._task.priority}</p>
          </div>
        </div>
      `;
    } else {
      return html`<div>Loading...</div>`;
    }
  }
}

customElements.define('task-popup', TaskPopup);
