import React from 'react';
import './App.css';
import { AgricultureTable } from './Table';

function App() {
  return (
    <div className="App">
      <h1>Indian Agriculture Analytics</h1>
      <h2>Table 1: Crop Production Summary (1950-2020)</h2>
      <AgricultureTable type="production" />
      <h2>Table 2: Crop Average Yield and Cultivation Area (1950-2020)</h2>
      <AgricultureTable type="average" />
    </div>
  );
}

export default App;

