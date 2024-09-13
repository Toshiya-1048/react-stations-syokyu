import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';

// StrictModeをコメントアウトすることで無効化
createRoot(document.getElementById('root')).render(
  // <StrictMode>
    <App />
  // </StrictMode>
);

