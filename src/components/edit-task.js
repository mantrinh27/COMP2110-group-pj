import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';
import { TaskModel } from '../models.js';

/**
 * EditTask
 * Allows editing of a task's details via a popup form
 */
class EditTask extends LitElement {
  static properties = {
    id: 0, // Task ID to edit
    _task: { state: true } // Task object fetched dynamically
  };

  static styles = css`
    dialog {
      width: 95%; /* Expand the dialog width */
      max-width: 600px; /* Increase the maximum dialog width */
      background: #ffffff;
      padding: 1.5rem; /* Increase padding */
      border-radius: 10px; /* Rounded corners */
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    }

    form {
      display: flex;
      flex-direction: column;
      gap: 1rem; /* Larger gap between inputs */
    }

    input,
    textarea {
      width: 100%; /* Expand inputs to the full width */
      padding: 0.75rem; /* Increase padding for inputs */
      border: 1px solid #ccc;
      border-radius: 6px; /* Slightly rounded corners */
      font-size: 1.1rem; /* Increase font size */
    }

    button,
    input[type="submit"] {
      padding: 0.75rem 1.5rem;
      border: none;
      border-radius: 5px;
      cursor: pointer;
    }

    button {
      background-color: #f44336; /* Red for cancel */
      color: #fff;
    }

    input[type="submit"] {
      background-color: #4caf50; /* Green for update */
      color: #fff;
    }
  `;

  // Fetch the task details when the component is connected
  connectedCallback() {
    super.connectedCallback();
    this._task = TaskModel.getTask(this.id);
  }

  // Handle form submission to update the task
  _submit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const updatedTask = {
      summary: formData.get('summary'),
      text: formData.get('text'),
      priority: formData.get('priority'),
      due: new Date(formData.get('due')).valueOf()
    };
    TaskModel.updateTask(this.id, updatedTask);
    this._hideModal();
  }

  // Show the edit modal
  _showModal() {
    this.renderRoot.querySelector('#edit-task-dialog').showModal();
  }

  // Hide the edit modal
  _hideModal() {
    this.renderRoot.querySelector('#edit-task-dialog').close();
  }

  // Render the form in a modal dialog
  render() {
    const dueDate = new Date(this._task.due).toISOString().substring(0, 16);
    return html`
      <button @click=${this._showModal}>Edit</button>
      <dialog id="edit-task-dialog">
        <form @submit="${this._submit}">
          <label for="summary">Summary</label>
          <input name="summary" value=${this._task.summary}>
          <label for="text">Description</label>
          <textarea name="text" rows="5">${this._task.text}</textarea>
          <label for="priority">Priority</label>
          <input name="priority" type="number" value=${this._task.priority}>
          <label for="due">Due Date</label>
          <input name="due" type="datetime-local" value=${dueDate}>
          <div>
            <button @click="${this._hideModal}">Cancel</button>
            <input value='Update' type="submit">
          </div>
        </form>
      </dialog>
    `;
  }
}

customElements.define('edit-task', EditTask);
