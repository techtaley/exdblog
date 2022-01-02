import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { ContextProvider } from './context/Context'

//step 7 - <ContextProvide /> as Content can access login status: user, isFetching, error, dispatch
//makes that data available to all components in the App
ReactDOM.render(
  <React.StrictMode>
    <ContextProvider>
      <App />
    </ContextProvider>        
  </React.StrictMode>,
  document.getElementById('root')
);

