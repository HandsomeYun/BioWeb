import React from 'react';
import { BrowserRouter as Router, Routes, Route as RouteV6} from 'react-router-dom';
import HomePage from './Page/HomePage';
import SearchResult from './Page/SearchResult';
import Circos from './Page/Circos';

function App() {
  return (
    <Router>
      <Routes>
        <RouteV6 path="/" element={<HomePage />} />
        <RouteV6 path="/FindByLigand" element={<SearchResult />} />
        <RouteV6 path="/Circos" element={<Circos />} />
      </Routes>
    </Router>
  );
}

export default App;
