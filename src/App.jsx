import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import IntroPage from './Components/IntroPage';
import HomePage from './Components/HomePage';
import AdminPage from './Components/AdminPage';
import IssueBook from './Components/IssueBook';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<IntroPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/issuebook/:bookId" element={<IssueBook />} />
      </Routes>
    </Router>
  );
}

export default App;
