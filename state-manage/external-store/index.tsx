import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './app';

const rootEl = document.getElementById('root') as Element;
createRoot(rootEl).render(<App />);
