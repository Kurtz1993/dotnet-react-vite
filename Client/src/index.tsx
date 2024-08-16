import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import { App } from './App';

const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href');

const container = document.getElementById('root');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(
    <BrowserRouter basename={baseUrl}>
        <App />
    </BrowserRouter>);
