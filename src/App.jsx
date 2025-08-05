import logo from './logo.svg';
import './App.css';
import { fetchTags } from './api/index.mjs';

import React, { useState, useEffect } from 'react';

function App() {
  const [tags, setTags] = useState(null);

  useEffect(() => {
    fetchTags()
      .then(response => {
        console.log('Fetched tags:', response.data);
        setTags(response.data);
      })
      .catch(error => {
        console.error('Error fetching tags:', error);
        setTags([]);
      });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <p>
          tags: {tags
            ? tags.map((item, idx) => 
            <><span key={idx}>{item.name} </span>
          <span key={idx}>{item.createdAt} </span></>)
            : 'Loading...'}
        </p>
      </header>
    </div>
  );
}

export default App;
