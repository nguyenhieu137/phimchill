import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from "react-router-dom";
import App from './App';
import { SearchProvider } from "./SearchContext";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <SearchProvider>
      <Router>
        <App />
      </Router>
    </SearchProvider>
  </React.StrictMode>
);



