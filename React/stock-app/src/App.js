import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import AssetList from './pages/assetList';
import StockPrice from './pages/stockPrice';
import SearchDropdown from './components/search';
import Login from './pages/login';
import SignUp from './pages/signUp';
import Dashboard from './pages/Dashboard';
import Watchlist from './pages/watchList';
import Home from './pages/Home';

const App = () => {
  return(
    <Router>
      <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px' }}>
        <h1>
          <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            AssetLab
          </Link>
        </h1>

        {/* Define Routes here */}
        <Routes>
          {/* Home Route */}
          <Route path="/" element={<Home />}/>

          {/* Asset List Route */}
          <Route path="/assets" element={<AssetList />} />

          {/* Stock Price Route */}
          <Route path="/assets/:assetId" element={<StockPrice />} />

          {/* Login Route */}
          <Route path="/login" element={<Login />} />

          {/* SignUp Route */}
          <Route path="/sign-up" element={<SignUp />} />

          {/* dashboard Route */}
          <Route path="/dashboard" element={<Dashboard />} />

          <Route path='/watchlist/:watchlistId' element={<Watchlist/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
