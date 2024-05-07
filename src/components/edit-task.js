import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';
import { TaskModel } from '../models.js';

/** EditTask <edit-task id=N>
 * Task edit for a given task id (N). Displays as a button that, when clicked,
 * shows a modal dialog containing a form to update the task properties.
 * Submitting the form updates the task via the TaskModel.
 */
class EditTask extends LitElement {
  static properties = {
    id: 0,
    _task: { state: true },
  };

  // Simplified CSS styles for the form
  static styles = css`
    /* Basic dialog styles */
    dialog {
      width: 90%;
      max-width: 400px; /* Limit to a max width */
      background: #ffffff; /* White background */
      padding: 1rem; /* Simple padding */
      border-radius: 8px; /* Slightly rounded corners */
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Light shadow */
      border: none; /* Remove dialog border */
    }

    form {
      display: flex;
      flex-direction: column;
      gap: 0.5rem; /* Add spacing between inputs */
    }

    input,
    textarea {
      width: 100%;
      padding: 0.5rem;
      border: 1px solid #ccc; /* Light gray border */
      border-radius: 4px; /* Rounded corners */
      font-size: 1rem; /* Standard text size */
    }

    button,
    input[type="submit"] {
      padding: 0.5rem 1rem;
      border: none;
      border-radius: 4px;
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

  connectedCallback() {
    super.connectedCallback();
    this._task = TaskModel.getTask(this.id);
  }

  /**
   * _submit - Private method to handle form submission. Constructs
   * a new task from the form values and then updates the task via TaskModel.
   * @param {Object} event - the click event
   */
  _submit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const due = new Date(formData.get('due'));
    const newTask = {
      summary: formData.get('summary'),
      text: formData.get('text'),
      priority: formData.get('priority'),
      due: due.valueOf(),
    };
    TaskModel.updateTask(this.id, newTask);
    this._hideModal();
  }

  /**
   * Click handler to show the editor dialog
   */
  _showModal() {
    const dialog = this.renderRoot.querySelector('#edit-task-dialog');
    dialog.showModal();
  }

  /**
   * Click handler to close the editor dialog
   */
  _hideModal() {
    const dialog = this.renderRoot.querySelector('#edit-task-dialog');
    dialog.close();
  }

  render() {
    // Convert due date from milliseconds to an ISO string
    const isoString = new Date(this._task.due).toISOString();
    const due = isoString.substring(0, isoString.indexOf('T') + 6);
    return html`
      <button @click=${this._showModal}>Edit</button>
      <dialog id="edit-task-dialog">
        <form @submit="${this._submit}">
          <label for="summary">Summary</label>
          <input name="summary" value=${this._task.summary}>
          <label for="text">Text</label>
          <textarea name="text">${this._task.text}</textarea>
          <label for="priority">Priority</label>
          <input name="priority" type="number" value=${this._task.priority}>
          <label for="due">Due</label>
          <input name="due" type="datetime-local" value=${due}>
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
