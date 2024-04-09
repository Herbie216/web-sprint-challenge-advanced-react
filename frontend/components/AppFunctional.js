import React, { useState } from 'react';
import axios from 'axios';

const initialMessage = '';
const initialEmail = '';
const initialSteps = 0;
const initialIndex = 4;

const AppFunctional = ({ className }) => {
  const [state, setState] = useState({
    message: initialMessage,
    email: initialEmail,
    steps: initialSteps,
    index: initialIndex,
  });

  const getNextIndex = direction => {
    const { index } = state;
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

  const move = direction => {
    const nextIndex = getNextIndex(direction);
    if (nextIndex !== null) {
      setState(prevState => ({
        ...prevState,
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
      }
      setState({ ...state, message: errorMessage });
    }
  };

  const reset = () => {
    setState({
      ...state,
      message: initialMessage,
      email: initialEmail,
      steps: initialSteps,
      index: initialIndex,
    });
  };

  const onChange = evt => {
    setState(prevState => ({
      ...prevState,
      email: evt.target.value,
    }));
  };

  const onSubmit = async evt => {
    evt.preventDefault();
    const { index, steps, email } = state;

    if (!email) {
      setState({ ...state, message: 'Ouch: email is required.' });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setState({ ...state, message: 'Ouch: email must be a valid email.' });
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
      setState({ ...state, email: initialEmail, message: response.data.message });
    } catch (error) {
      console.log(error)
      setState({ ...state, email: initialEmail, message: error.response.data.message });
    }
  };

  return (
    <div id="wrapper" className={className}>
      <div className="info">
        <h3 id="coordinates">Coordinates ({(state.index % 3) + 1}, {Math.floor(state.index / 3) + 1})</h3>
        <h3 id="steps">{state.steps === 1 ? `You moved ${state.steps} time` : `You moved ${state.steps} times`}</h3>
      </div>
      <div id="grid">
        {[...Array(9).keys()].map(idx => (
          <div key={idx} className={`square${idx === state.index ? ' active' : ''}`}>
            {idx === state.index && 'B'}
          </div>
        ))}
      </div>
      <div className="info">
        <h3 id="message">{state.message}</h3>
      </div>
      <div id="keypad">
        <button id="left" onClick={() => move('left')}>LEFT</button>
        <button id="up" onClick={() => move('up')}>UP</button>
        <button id="right" onClick={() => move('right')}>RIGHT</button>
        <button id="down" onClick={() => move('down')}>DOWN</button>
        <button id="reset" onClick={reset}>reset</button>
      </div>
      <form onSubmit={onSubmit}>
        <input id="email" type="email" placeholder="type email" value={state.email} onChange={onChange} />
        <input id="submit" type="submit" />
      </form>
    </div>
  );
};

export default AppFunctional;
