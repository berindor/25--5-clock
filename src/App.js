import React from 'react';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sessionLength: 25,
      breakLength: 5,
      timerLabel: 'Session'
    };
  }

  render() {
    return (
      <div id="clock">
        <div id="session-setting">
          <p id="session-label">Session Length</p>
          <button id="session-decrement">down</button>
          <div id="session-length">{this.state.sessionLength}</div>
          <button id="session-increment">up</button>
        </div>
        <div id="break-setting">
          <p id="break-label">break Length</p>
          <button id="break-decrement">down</button>
          <div id="break-length">{this.state.breakLength}</div>
          <button id="break-increment">up</button>
        </div>
        <div id="timer">
          <p id="timer-label">{this.state.timerLabel}</p>
          <div id="time-left">25:00 {/* TODO */}</div>
          <button id="start_stop">start/stop</button>
          <button id="restart">restart</button>
          <button id="reset">reset</button>
          <audio id="beep"></audio>
        </div>
      </div>
    );
  }
}

export default App;
