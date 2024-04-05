import React from 'react';
import { BrowserRouter as Router, Routes, Route as RouteV6} from 'react-router-dom';
import HomePage from './Page/HomePage';
import SearchResult from './Page/SearchResult';
import Circos from './Page/Circos';
import RNA_seq_Page from './Page/RNA_seq';

function App() {
  return (
    <Router>
      <Routes>
        <RouteV6 path="/" element={<HomePage />} />
        <RouteV6 path="/findBySpecies/findByLigand" element={<SearchResult />} />
        <RouteV6 path="/Circos" element={<Circos />} />
        <RouteV6 path="/RNAseq" element={<RNA_seq_Page />} />
      </Routes>
    </Router>
  );
}

export default App;
