import React from 'react';
import { createRoot, Root } from 'react-dom/client';
import App from './app';

const rootEl = document.querySelector('#root');
createRoot(rootEl!).render(<App />);
