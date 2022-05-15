import * as ReactDOMClient from 'react-dom/client';

import App from './app/app';

const root = ReactDOMClient.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(<App />);
