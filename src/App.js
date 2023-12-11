import React from 'react';
import './App.css';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import StopIcon from '@mui/icons-material/Stop';
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import NorthIcon from '@mui/icons-material/North';
import SouthIcon from '@mui/icons-material/South';

function formatTime(millisec) {
  let min = Math.floor(millisec / (60 * 1000));
  if (min < 10) {
    min = '0' + min.toString();
  } else {
    min = min.toString();
  }
  const remainingMillisec = millisec % (60 * 1000);
  let sec = Math.floor(remainingMillisec / 1000);
  if (sec < 10) {
    sec = '0' + sec;
  }
  return min + ':' + sec;
}

function getDefaultState() {
  return {
    sessionLength: 25,
    breakLength: 5,
    timerLabel: 'Session',
    timeLeft: 25 * 60 * 1000,
    countdown: false,
    intervalID: null
  };
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = getDefaultState();
    this.changeTimeLength = this.changeTimeLength.bind(this);
    this.startCountdown = this.startCountdown.bind(this);
    this.stopCountdown = this.stopCountdown.bind(this);
    this.toggleCountdown = this.toggleCountdown.bind(this);
    this.handleStop = this.handleStop.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }

  changeTimeLength(timerType, value) {
    this.setState({ countdown: false });
    let timeLength = timerType === 'Session' ? this.state.sessionLength : this.state.breakLength;
    let newLength = timeLength + value;
    if (newLength > 0 && newLength < 61) {
      this.setState(timerType === 'Session' ? { sessionLength: newLength } : { breakLength: newLength });
      if (timerType === this.state.timerLabel) {
        this.setState({ timeLeft: newLength * 60 * 1000 });
      }
    }
  }

  startCountdown() {
    const intervalID = setInterval(() => {
      let timeLeft = this.state.timeLeft - 1000;
      if (timeLeft < 0) {
        if (this.state.timerLabel === 'Session') {
          this.setState({ timerLabel: 'Break' });
          timeLeft = this.state.breakLength * 60 * 1000;
        } else {
          this.setState({ timerLabel: 'Session' });
          timeLeft = this.state.sessionLength * 60 * 1000;
        }
      }
      if (timeLeft === 0) {
        document.getElementById('beep').play();
      }
      this.setState({ timeLeft: timeLeft });
    }, 1000);
    this.setState({ countdown: true, intervalID });
  }

  stopCountdown() {
    clearInterval(this.state.intervalID);
    this.setState({ countdown: false, intervalID: null });
  }

  toggleCountdown() {
    this.state.countdown ? this.stopCountdown() : this.startCountdown();
  }

  handleStop() {
    this.stopCountdown();
    this.setState({ timeLeft: this.state.sessionLength * 60 * 1000 });
  }

  handleReset() {
    this.stopCountdown();
    this.setState(getDefaultState());
    document.getElementById('beep').pause();
    document.getElementById('beep').currentTime = 0;
  }

  render() {
    return (
      <div id="clock">
        <h1 id="title">Pomodoro timer</h1>
        <div id="session-setting">
          <p id="session-label">Session Length</p>
          <button id="session-decrement" onClick={() => this.changeTimeLength('Session', -1)}>
            <SouthIcon />
          </button>
          <div id="session-length-wrapper">
            <span id="session-length">{this.state.sessionLength}</span> min
          </div>
          <button id="session-increment" onClick={() => this.changeTimeLength('Session', 1)}>
            <NorthIcon />
          </button>
        </div>
        <div id="break-setting">
          <p id="break-label">Break Length</p>
          <button id="break-decrement" onClick={() => this.changeTimeLength('Break', -1)}>
            <SouthIcon />
          </button>
          <div id="break-length-wrapper">
            <span id="break-length">{this.state.breakLength}</span> min
          </div>
          <button id="break-increment" onClick={() => this.changeTimeLength('Break', 1)}>
            <NorthIcon />
          </button>
        </div>
        <div id="timer">
          <p id="timer-label">{this.state.timerLabel}</p>
          <div id="time-left">{formatTime(this.state.timeLeft)}</div>
          <div id="timer-buttons">
            <button id="start_stop" onClick={this.toggleCountdown}>
              <PlayArrowIcon />
              <PauseIcon />
            </button>
            <button id="stop" onClick={this.handleStop}>
              <StopIcon />
            </button>
            <button id="reset" onClick={this.handleReset}>
              <ChangeCircleIcon />
            </button>
          </div>
          <audio id="beep" src="/birds-singing.wav"></audio>
        </div>
      </div>
    );
  }
}

export default App;
