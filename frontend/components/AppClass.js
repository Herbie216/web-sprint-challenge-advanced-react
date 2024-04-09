import React, { Component } from 'react';
import axios from 'axios';

const initialMessage = '';
const initialEmail = '';
const initialSteps = 0;
const initialIndex = 4;

export default class AppClass extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: initialMessage,
      email: initialEmail,
      steps: initialSteps,
      index: initialIndex,
    };
  }

  getNextIndex = direction => {
    const { index } = this.state;
    let nextIndex;
    switch (direction) {
      case 'up':
        nextIndex = index - 3;
        return nextIndex < 0 ? null : nextIndex;
      case 'down':
        nextIndex = index + 3;
        return nextIndex > 8 ? null : nextIndex;
      case 'left':
        return index % 3 === 0 ? null : index - 1;
      case 'right':
        return (index + 1) % 3 === 0 ? null : index + 1;
      default:
        return null;
    }
  };

  move = direction => {
    const nextIndex = this.getNextIndex(direction);
    if (nextIndex !== null) {
      this.setState(prevState => ({
        index: nextIndex,
        steps: prevState.steps + 1,
        message: '',
      }));
    } else {
      let errorMessage;
      switch (direction) {
        case 'up':
          errorMessage = "You can't go up";
          break;
        case 'down':
          errorMessage = "You can't go down";
          break;
        case 'left':
          errorMessage = "You can't go left";
          break;
        case 'right':
          errorMessage = "You can't go right";
          break;
        default:
          errorMessage = '';
      }
      this.setState({ message: errorMessage });
    }
  };

  reset = () => {
    this.setState({
      message: initialMessage,
      email: initialEmail,
      steps: initialSteps,
      index: initialIndex,
    });
  };

  onChange = evt => {
    this.setState({ email: evt.target.value });
  };

  onSubmit = async evt => {
    evt.preventDefault();
    const { index, steps, email } = this.state;

    if (!email) {
      this.setState({ message: 'Ouch: email is required.' });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      this.setState({ message: 'Ouch: email must be a valid email.' });
      return;
    }

    const payload = {
      x: index % 3 + 1,
      y: Math.floor(index / 3) + 1,
      steps,
      email,
    };

    try {
      const response = await axios.post('http://localhost:9000/api/result', payload);

      if (response.status === 200) {
        this.setState({
          email: initialEmail,
        });
        this.setState({ message: response.data.message });
      } else {
        this.setState({ message: response.data.message });
      }
    } catch (error) {
      console.log({ error });
      this.setState({ message: error.response.data.message });
    }
  };

  render() {
    const { className } = this.props;
    const { message, email, steps, index } = this.state;
    return (
      <div id="wrapper" className={className}>
        <div className="info">
        <h3 id="coordinates">Coordinates ({(index % 3) + 1}, {Math.floor(index / 3) + 1})</h3>
        <h3 id="steps">{steps === 1 ? `You moved ${steps} time` : `You moved ${steps} times`}</h3>
        </div>
        <div id="grid">
          {[...Array(9).keys()].map(idx => (
            <div key={idx} className={`square${idx === index ? ' active' : ''}`}>
              {idx === index && 'B'}
            </div>
          ))}
        </div>
        <div className="info">
          <h3 id="message">{message}</h3>
        </div>
        <div id="keypad">
          <button id="left" onClick={() => this.move('left')}>LEFT</button>
          <button id="up" onClick={() => this.move('up')}>UP</button>
          <button id="right" onClick={() => this.move('right')}>RIGHT</button>
          <button id="down" onClick={() => this.move('down')}>DOWN</button>
          <button id="reset" onClick={this.reset}>reset</button>
        </div>
        <form onSubmit={this.onSubmit}>
          <input id="email" type="email" placeholder="type email" value={email} onChange={this.onChange} />
          <input id="submit" type="submit" />
        </form>
      </div>
    );
  }
}