import {LitElement, html, css} from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';
import {getUser, storeUser, deleteUser} from '../auth.js';
import {BASE_URL} from '../config.js';

/**
 * LoginWidget <login-widget>
 * Present a login form and handle user authentication, if a user
 * is logged in, display their name and a logout button
 */
class LoginWidget extends LitElement {
  static properties = {
    _loginUrl: {type: String, state: true},
    _user: {type: String, state: true},
    _errorMessage: {type: String, state: true},
  };

  static styles = css`
    :host {
        display: block;
    }

    button {
      height: 50px;
      width: 70px;

      background-color: #023E8A;
      color: white;
      border: none;
      border-radius: 10px;
    }

    button:hover {
      background-color: #b4d5fe;
      color: black;
      cursor: pointer;
    }

    button:active {
      background-color: #012450;

      color:white;
      transition-duration: 0.1s;
    }
    
    p {
      padding: 0 20px;
    }

    form {
      display: grid;
      grid-template-columns: 100px 150px 75px;
      grid-template-rows: 2;

      height: 50px;
    }

    #login-username, #login-password {
      margin: 0;
      padding: 0px;
      grid-column: 1;
      
      display: flex;
      justify-content: right;
    }

    input {
      margin-left: 5px;
    }

    input[type="submit"] {
      grid-column: 3;
      grid-row: 1/3;
      
      background-color: #023E8A;
      color: white;
      border: none;
      border-radius: 10px;
    }

    input[type="submit"]:hover {
      background-color: #b4d5fe;
      color: black;
      cursor: pointer;
    }

    input[type="submit"]:active {
      background-color: #012450;

      color:white;
      transition-duration: 0.1s;
    }

    #error-message {
      background-color: red;
      border-radius: 10px;
    }

    `;

  constructor() {
    super();
    this._loginUrl = `${BASE_URL}users/login`;
    const user = getUser();
    if (user) {
      this._user = user;
    }
  }

  _submitForm(event) {
    event.preventDefault();
    const username = event.target.username.value;
    const password = event.target.password.value;
    fetch(this._loginUrl, {
      method: 'post',
      body: JSON.stringify({username, password}),
      headers: {'Content-Type': 'application/json'},
    }).then((result) => result.json()).then((response) => {
      if (response.error) {
        this._errorMessage = response.error;
      } else {
        this._user = response;
        storeUser(response);
      }
    });
  }

  _logout() {
    deleteUser();
    this._user = null;
  }

  render() {
    if (this._user) {
      return html`<p>Logged in as ${this._user.name}</p>
              <button @click=${this._logout}>Logout</button>`;
    }
    return html`
      <p id="error-message">${this._errorMessage}</p>
      <form @submit=${this._submitForm}>
          <p id="login-username">Username:</p><input name="username">
          <p id="login-password">Password:</p><input type="password" name="password">
          <input type='submit' value='Login'>
      </form>`;
  }
}

customElements.define('login-widget', LoginWidget);
