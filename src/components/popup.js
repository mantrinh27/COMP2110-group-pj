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
      transform: translate(-50%, -50%);
    }

    .modal-content {
      /* Add your modal content styles */
    }

    .close {
      /* Add your close button styles */
    }
  `;

  constructor() {
    super();
    this._handleOutsideClick = this._handleOutsideClick.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();
    this._task = TaskModel.getTask(this.id);
    document.addEventListener('click', this._handleOutsideClick);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener('click', this._handleOutsideClick);
  }

  _handleOutsideClick(event) {
    const modal = this.renderRoot.querySelector('.modal');
    if (event.target === modal) {
      this._hideModal();
    }
  }

  _showModal() {
    const modal = this.renderRoot.querySelector('.modal');
    modal.style.display = 'block';
  }

  _hideModal() {
    const modal = this.renderRoot.querySelector('.modal');
    modal.style.display = 'none';
  }

  _handleMouseEnter(event) {
    event.preventDefault();
  }

  _handleMouseLeave(event) {
    if (!event.relatedTarget || !event.currentTarget.contains(event.relatedTarget)) {
      this._hideModal();
    }
  }

  render() {
    if (this._task) {
      const ts = new Date(parseInt(this._task.timestamp));
      const due = new Date(parseInt(this._task.due));
      return html`
        <div class="modal" @mouseenter=${this._handleMouseEnter} @mouseleave=${this._handleMouseLeave}>
          <div class="modal-content">
            <span class="close" @click=${this._hideModal}>&times;</span>
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
