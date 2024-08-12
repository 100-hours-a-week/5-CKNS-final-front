import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import FindPage from './pages/findPage/findPage'; // findPage 컴포넌트 가져오기

import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/find" element={<FindPage />} />
      </Routes>
    </Router>
  );
}

export default App;
