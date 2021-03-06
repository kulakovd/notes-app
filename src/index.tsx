import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import './index.css';
import { App } from './components/App';
import { createStore } from './app/store';
import reportWebVitals from './reportWebVitals';
import { notesRepo } from './repository/notes';
import { NotesRepoContext } from './components/notesRepoContext';

const store = createStore(notesRepo);

ReactDOM.render(
  <React.StrictMode>
    <NotesRepoContext.Provider value={notesRepo}>
      <Provider store={store}>
        <Router>
          <App />
        </Router>
      </Provider>
    </NotesRepoContext.Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
  const swUrl = `${process.env.PUBLIC_URL}/service-worker.js`;
  navigator.serviceWorker.register(swUrl)
    .then((reg) => {
      // service worker registred
      console.log('Registration succeeded. Scope is ' + reg.scope);
    }).catch((error) => {
      // service worker registration failed
      console.log('Registration failed with ' + error);
    });
}
