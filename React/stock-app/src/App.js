import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import AssetList from './components/assetList';
import StockPrice from './components/stockPrice';

const App = () => {
  return(
    <Router>
      <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px' }}>
        <h1>Stock Application</h1>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/assets">Asset List</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<div><h2>Welcome to my stock app project</h2></div>} />
          <Route path="/assets" element={<AssetList />} />
          <Route path="/assets/:assetId" element={<StockPrice />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
