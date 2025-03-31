import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {Provider} from "react-redux"
import reducers from './assets/reducers/index.js'
import {applyMiddleware } from 'redux';
import { configureStore } from "@reduxjs/toolkit";
// import "materialize-css/dist/css/materialize.min.css";
import {thunk} from "redux-thunk";
import './index.css'
import App from './App.jsx'
const store = configureStore({
  reducer: reducers, // No need for `combineReducers` manually
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
    <App />
    </Provider>
  </StrictMode>,
)
console.log("env=",import.meta.env.VITE_STRIPE_KEY)