import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './app';
import { store } from './store';

const rootEl = document.getElementById('root') as Element;
createRoot(rootEl).render(<Provider store={store}><App /></Provider>);
