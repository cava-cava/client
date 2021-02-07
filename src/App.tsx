import React from 'react';
import logo from './logo.svg';
import './App.scss';
import io from 'socket.io-client';

console.log(process.env.NODE_ENV)
const url: string = process.env.NODE_ENV !== 'production' ? 'http://localhost:8080' : window.location.toString();
const socket = io(url);

// sockets test
socket.on('hello', ( message: string ) => alert(message));

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
      </header>
    </div>
  );
}

export default App;
