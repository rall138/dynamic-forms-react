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
import { loadState, saveState } from './helpers/localStorageHelper';
import { sleep } from './helpers/sleepHelper';

const store = createStore(
  allReducers, loadState(), 
  composeWithDevTools()
);

const handlelogOut = () => {
  store.dispatch({type: 'session/logout'})
  window.location.replace('/')
}

const renderApp = () =>{

ReactDOM.render(
    <React.StrictMode>
      <Provider store={store}> 
      {store.getState().login.value ? 
      
        <div className="app-header">
          <div className="horizontal-left-50percent">
            <span className="horizontal-center header-title">
              Welcome to dynamic forms
            </span>
          </div>
          <div className="relative-position"> 
            <div className="float-right-top-10">
              <Button className='button-link' onClick={() => handlelogOut()} >Log out</Button>
            </div>
          </div>
        </div> : ''}

        <App />
      </Provider>
    </React.StrictMode>,
    document.getElementById('root')
  );
}

renderApp()

store.subscribe(() => {
  saveState({login: store.getState().login})
  renderApp()
})

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
