import React from 'react';
import ReactDOM from 'react-dom';
import App from './demo_9';

const rootEl = document.querySelector('#app');

ReactDOM.render(<App />, rootEl);
// ReactDOM.unstable_createRoot(rootEl).render(<App />);
