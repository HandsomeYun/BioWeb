import React from 'react';
import { BrowserRouter as Router, Route, Routes, Route as RouteV6, Outlet } from 'react-router-dom';
import HomePage from './Page/HomePage';
// import SearchResultPage from './components/SearchResultPage';

function App() {
  return (
    <Router>
      <Routes>
        <RouteV6 path="/" element={<HomePage />} />
        {/* <RouteV6 path="/search-results" element={<SearchResultPage />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
