import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import AppStateProvider from "./context/AppStateProvider"
import {BrowserRouter} from "react-router-dom"
import {Provider} from 'react-redux'
import { store } from './store/store';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <Provider  store={store}>
    <AppStateProvider>
    <App />
     </AppStateProvider>
     </Provider>
      </BrowserRouter>
  </React.StrictMode>
);


