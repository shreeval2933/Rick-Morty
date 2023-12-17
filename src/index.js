import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.js';
import reportWebVitals from './reportWebVitals.js';
import { AppProvider } from './context/characterContext.js';
import { FilterContextProvider } from './context/filterContext.js';
import { LocationProvider } from './context/locationContext.js';
import { EpisodeProvider } from './context/episodeContext.js';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode> 
    {/* AppProvider for character data */}
    <AppProvider>
      {/* LocationProvider for location data */}
      <LocationProvider>
        {/* EpisodeProvider for episode data */}
        <EpisodeProvider>
          {/* FilterContextProvider for filter-related state */}
          <FilterContextProvider>
            <App />
          </FilterContextProvider>
        </EpisodeProvider>
      </LocationProvider>
    </AppProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
