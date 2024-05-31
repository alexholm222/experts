import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import { Provider } from "react-redux";
import { store } from './store';
import { BrowserRouter } from 'react-router-dom';
import App from './components/App/App';


const root = ReactDOM.createRoot(document.getElementById('root_expert'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

