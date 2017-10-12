import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

class Stopwatch extends Component {
  static formattedSeconds(sec) {
    return `${Math.floor(sec / 60)}:${`0${sec % 60}`.slice(-2)}`;
  }

  constructor(props) {
    super(props);
    this.state = {
      secondsElapsed: 0,
      lastClearedIncrementer: null,
    };
    this.incrementer = null;

    this.handleStartClick = this.handleStartClick.bind(this);
    this.handleStopClick = this.handleStopClick.bind(this);
    this.handleResetClick = this.handleResetClick.bind(this);
  }

  handleStartClick() {
    this.incrementer = setInterval(
      () =>
        this.setState({
          secondsElapsed: this.state.secondsElapsed + 1,
        }),
      1000,
    );
  }

  handleStopClick() {
    clearInterval(this.incrementer);
    this.setState({
      lastClearedIncrementer: this.incrementer,
    });
  }

  handleResetClick() {
    clearInterval(this.incrementer);
    this.setState({
      secondsElapsed: 0,
    });
  }

  render() {
    return (
      <div>
        <h1>{Stopwatch.formattedSeconds(this.state.secondsElapsed)}</h1>

        {this.state.secondsElapsed === 0 ||
        this.incrementer === this.state.lastClearedIncrementer ? (
          <Button className="btn" onClick={this.handleStartClick} bsStyle="success" bsSize="large">
            start
          </Button>
        ) : (
          <Button className="btn" onClick={this.handleStopClick} bsStyle="warning" bsSize="large">
            stop
          </Button>
        )}

        {this.state.secondsElapsed !== 0 &&
        this.incrementer === this.state.lastClearedIncrementer ? (
          <Button onClick={this.handleResetClick} bsStyle="danger" bsSize="large">
            reset
          </Button>
        ) : null}
      </div>
    );
  }
}

export default Stopwatch;
