import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

class Timer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showInput: false,
    };

    this.showInput = this.showInput.bind(this);
    this.closeInput = this.closeInput.bind(this);
  }

  showInput() {
    this.setState({
      showInput: true,
    });
  }

  closeInput() {
    this.setState({
      showInput: false,
    });
  }

  render() {
    return (
      <div>
        {this.state.showInput ? (
          <input onSubmit={this.closeInput} onBlur={this.closeInput} />
        ) : (
          <div onClick={this.showInput}>
            <span>0</span>
            <span>0</span>
            <span>h</span>
            <span>0</span>
            <span>0</span>
            <span>m</span>
            <span>0</span>
            <span>0</span>
            <span>s</span>
          </div>
        )}
        <Button>start</Button>
        <Button>reset</Button>
      </div>
    );
  }
}

export default Timer;
