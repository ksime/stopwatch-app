import React, { Component } from 'react';
import { Button, ListGroup, ListGroupItem } from 'react-bootstrap';

class Stopwatch extends Component {
  static formattedSeconds(sec) {
    return `${Math.floor(sec / 60)}:${`0${sec % 60}`.slice(-2)}`;
  }

  constructor(props) {
    super(props);
    this.state = {
      secondsElapsed: 0,
      lastClearedIncrementer: null,
      laps: [],
    };
    this.incrementer = null;

    this.handleStartClick = this.handleStartClick.bind(this);
    this.handleStopClick = this.handleStopClick.bind(this);
    this.handleResetClick = this.handleResetClick.bind(this);
    this.handleLabClick = this.handleLabClick.bind(this);
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

  handleLabClick() {
    this.setState({
      laps: this.state.laps.concat([this.state.secondsElapsed]),
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

        {this.state.secondsElapsed !== 0 &&
        this.incrementer !== this.state.lastClearedIncrementer ? (
          <Button bsStyle="info" bsSize="large" onClick={this.handleLabClick}>
            lab
          </Button>
        ) : null}

        <ListGroup className="stopwatch-laps">
          {this.state.laps.map((lap, i) => (
            <ListGroupItem bsStyle="success" key={performance.now()}>
              <strong>{i + 1}</strong>/ {Stopwatch.formattedSeconds(lap)}
            </ListGroupItem>
          ))}
        </ListGroup>
      </div>
    );
  }
}

export default Stopwatch;
