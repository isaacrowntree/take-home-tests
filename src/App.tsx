import React, { useReducer, useEffect, useState } from 'react';
import config from './config.json';
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
            RobotCommands(command, [state, dispatch], console.log, { x: parseInt(x, 10), y: parseInt(y, 10), face });
          }, 200);
        }
      }
    }
  }, [commands, state]);

  let cells = [];
  for (let j = 0; j < config.width; j++) {
    if (cells[j] === undefined) {
      cells[j] = [];
    }
    for (let k = 0; k < config.height; k++) {
      let row: JSX.Element[] = cells[j];
      let key: string = `${j}${k}`;
      if (k === state.x && j === state.y && state.placed) {
        row.push(<i key={key} className={`fas fa-robot fa-rotate-${orientation.get(state.face)}`}></i>);
      } else {
        row.push(<div key={key} className="cell" data-testid={key}></div>);
      }
      cells[j] = row;
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <div className="container">
          {cells.reverse().flat()}
        </div>
      </header>
    </div>
  );
}

export default App;
