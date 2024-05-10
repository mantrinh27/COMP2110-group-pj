import {LitElement, html, css} from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';
class MoodWidget extends LitElement {
  static properties = {
    selectedMood: { type: String }
  };

  static styles = css`
    :host {
      display: block;
      font-size: 30px;
      border: 1px solid black;
      background-color: white;
    }

    .emojis {
      display: flex;
      justify-content: space-around;
      align-items: center;
    }

    .emoji {
      cursor: pointer;
      border-radius: 60%;
    }

    .title {
      text-align: center;
      font-size: 20px;
      margin-top: 10px;
      font-weight: bold;
      color: #1c3d79 /*Change the color to dark blue same as header*/
    }

    .selected-mood {
      text-align: center;
      margin-top: 10px;
      font-size: 18px;
      padding: 10px;
    }

    .selected {
      border: 2px solid #023E8A;
    }
  `;

  constructor() {
    super();
    this.selectedMood = ''; // Default mood
  }

  selectMood(mood) {
    if (this.selectedMood === mood) {
      // Deselect the emoji if it is already selected
      this.selectedMood = '';
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
        <div class="title"><b>Select your mood for today</b></div>
        <div class="emojis">
          <span class="emoji ${this.selectedMood === 'happy' ? 'selected' : ''}" id="happy" @click="${() => this.selectMood('happy')}">😊</span>
          <span class="emoji ${this.selectedMood === 'calm' ? 'selected' : ''}" id="calm" @click="${() => this.selectMood('calm')}">😌</span>
          <span class="emoji ${this.selectedMood === 'sad' ? 'selected' : ''}" id="sad" @click="${() => this.selectMood('sad')}">😢</span>
          <span class="emoji ${this.selectedMood === 'low-energy' ? 'selected' : ''}" id="low-energy" @click="${() => this.selectMood('low-energy')}">😔</span>
          <span class="emoji ${this.selectedMood === 'upset' ? 'selected' : ''}" id="upset" @click="${() => this.selectMood('upset')}">😡</span>
        </div>
        <div class="selected-mood">${moodText}</div>
      </div>
    `;
  }
}

customElements.define('mood-widget', MoodWidget);
