import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import authReducer from "./state";
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
//redux persist to keep information in cache even after tab close
//session is alternative but will clear on tab close
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PURGE,
  PERSIST,
  REGISTER
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { PersistGate } from 'redux-persist/integration/react';

const persistConfig = { key: "root", storage, version: 1 };
const persistReducer = persistReducer(persistConfig, authReducer);
const store = configu

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

