import {LitElement, html, css} from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';
import './components/widget-block.js';
import './components/blog-block.js';
import './components/widget-container.js';
import './components/ad-widget.js';
import './components/login-widget.js';
import './components/task-manager.js';
import './components/task-timer-widget.js';
import './components/mood-widget.js'
import './components/calendar-widget.js'
/**
 * Comp2110TaskManager component constructs the main UI of the application
 */
class Comp2110TaskManager extends LitElement {
  static properties = {
    header: {type: String},
  };

  static styles = css`
    :host {
      min-height: 100vh;   
      font-size: 14pt;
      color: #1a2b42;
      max-width: 960px;
      margin: 0 auto;
      text-align: center;
      background-color: var(--comp2110-portal-background-color);
    }

    header {
      background-color: #0361d7;
      display: grid;
      grid-template-columns: repeat(2, 1fr);

      margin: 20px;
      border-top-left-radius: 20px;
      border-top-right-radius: 20px;
      color: white;
      min-width: 850px;
    }

    header > h1 {
      display: flex;
      justify-content: left;
      align-items: center;

      margin-left: 20px;
    }

    header > login-widget {
      display: flex;      
      justify-content: right;
      align-items: center;

      margin-right: 20px;
    }


    main {
      display: flex;
      justify-content: space-between;
    }

    .app-footer {
      font-size: calc(12px + 0.5vmin);
      align-items: center;
    }

    .app-footer a {
      margin-left: 5px;
    }
  `;

  constructor() {
    super();
    this.header = 'COMP2110 Task Manager';
  }

  render() {
    return html`
      <header>
        <h1>${this.header}</h1>
        <login-widget></login-widget>
      </header>

      <main>      
        <task-manager></task-manager>     
        <widget-container header="Widgets">
          <ad-widget></ad-widget>
          <mood-widget header="Mood Widget"></mood-widget>
          <calendar-widget></calendar-widget>
          <task-timer-widget header="Task Timer Widget"></task-timer-widget>
        </widget-container>
      </main>

      <p class="app-footer">
        🚽 Made with love by
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://github.com/open-wc"
          >open-wc</a
        >.
      </p>
    `;
  }
}

customElements.define('comp2110-task-manager', Comp2110TaskManager);