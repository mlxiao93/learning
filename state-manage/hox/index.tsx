import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './app';
import { HoxRoot } from 'hox';

const rootEl = document.getElementById('root') as Element;
createRoot(rootEl).render(<HoxRoot><App /></HoxRoot>);
