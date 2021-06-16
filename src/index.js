import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { Provider } from 'react-redux'
import { createStore } from 'redux'
import allReducers from './reducers'
import { composeWithDevTools } from 'redux-devtools-extension'
import { Button } from 'react-bootstrap';

const store = createStore(
  allReducers, 
  composeWithDevTools()
);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}> 
    
      <div className="app-header">
        <div className="horizontal-left-50percent">
          <span className="horizontal-center header-title">
            Welcome to dynamic forms - by rLomez
          </span>
        </div>
        <div className="relative-position"> 
          <div className="float-right-top-10">
            <Button variant="danger">Log out</Button>
          </div>
        </div>
      </div>

      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
