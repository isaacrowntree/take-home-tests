import React, { useReducer } from 'react';
import RobotReducer, { initialState } from './Reducer';
import './App.css';

function App() {
  const [state, dispatch] = useReducer(RobotReducer, initialState);

  return (
    <div className="App">
      <header className="App-header">
        <i className="fas fa-robot"></i>
      </header>
    </div>
  );
}

export default App;
