import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';

class MoodWidget extends LitElement {
  static properties = {
    selectedMood: {type: String}
  };

  static styles = css`
    :host {
        display: block;
        padding: 20px;
        font-size: 30px;
        background-color: white;
        border: 1px solid black;
    }

    .emojis {
      display: flex;
      justify-content: space-around;
      align-items: center;
    }

    .emoji {
      cursor: pointer;
      border-radius: 30%;
      padding: 2px;
    }

    .title {
      text-align: center;
      font-size: 20px;
      margin-top: -5px;
      padding: 10px;
      font-weight: bold;
    }

    .selected-mood {
      text-align: center;
      margin-top: 10px;
      font-size: 20px;
    }

    .selected {
      border: 1px solid orange;
    }
  `;

  constructor() {
    super();
    this.selectedMood = ''; // Default mood
  }

  selectedMood(mood) {
    if (this.selectedMood === mood) {
      this.selectedMood = ''; // Deselect emoji when user click the emoji again
    } else {
      this.selectedMood = mood;
    }
  }

  render() {
    let moodText = '';
    if (this.selectedMood) {
      moodText = `Today you are feeling ${this.selectedMood}`;
    }
    return html`
    <div class="frame">
    <div class="title">Mood</div>
    <div class="emojis">
      <span class="emoji ${this.selectedMood === 'happy' ? 'selected' : ''}" id="happy" @click="${() => this.selectMood('happy')}">😊</span>
      <span class="emoji ${this.selectedMood === 'calm' ? 'selected' : ''}" id="calm" @click="${() => this.selectMood('calm')}">😌</span>
      <span class="emoji ${this.selectedMood === 'sad' ? 'selected' : ''}" id="sad" @click="${() => this.selectMood('sad')}">😞</span>
      <span class="emoji ${this.selectedMood === 'upset' ? 'selected' : ''}" id="upset" @click="${() => this.selectMood('upset')}">😡</span>
    </div>
    <div class="selected-mood">${moodText}</div>
    </div>`;
  }
}

customElements.define('mood-widget', MoodWidget);