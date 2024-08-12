import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import FindPage from './pages/findPage/searchingPage'; 

import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/search" element={<FindPage />} />
      </Routes>
    </Router>
  );
}

export default App;
