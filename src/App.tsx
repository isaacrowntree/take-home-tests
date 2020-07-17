import React, { useReducer, useEffect, useState } from 'react';
import RobotReducer, { initialState } from './Reducer';
import RobotCommands from './RobotCommands';
import { orientation } from './RobotUI';
import './App.css';

function App () {
  const [state, dispatch] = useReducer(RobotReducer, initialState);

  const [commands, setCommands] = useState();

  useEffect(() => {
    fetch(
      '/commands.txt',
    ).then((r) => r.text()).then((txt) => setCommands(txt.split('\n')));
  }, []);

  useEffect(() => {
    if (commands && state.step < commands.length) {
      for (let i = 0; i < commands.length; i++) {
        const [command, args] = commands[i].split(' ');
        const [x, y, face] = args ? args.split(',') : [];

        if (i === state.step) {
          setTimeout(() => {
            RobotCommands(command, state, dispatch, { x: parseInt(x, 10), y: parseInt(y, 10), face });
          }, 200);
        }
      }
    }
  }, [commands, state]);

  return (
    <div className="App">
      <header className="App-header">
        <div className="container">
          <i className={`fas fa-robot fa-rotate-${orientation.get(state.face)}`}></i>
        </div>
      </header>
    </div>
  );
}

export default App;
