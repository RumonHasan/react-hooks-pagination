import ReactDOMClient from 'react-dom/client';
import App from './App';

const container = document.getElementById('root');
const rootClient = ReactDOMClient.createRoot(container);

rootClient.render(<App/>);