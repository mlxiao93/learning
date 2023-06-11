import React from 'react';
// import { createRoot } from 'react-dom/client';
import CustomRender from './custom-render';

const rootEl = document.querySelector('#root') as HTMLDivElement;

// createRoot(rootEl).render(<div>hello</div>);

CustomRender.render(<div>hello</div>, rootEl);
