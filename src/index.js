import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'assets/main.css';

const MOUNT_NODE = document.getElementById('root');

ReactDOM.createRoot(MOUNT_NODE).render(<App />);
