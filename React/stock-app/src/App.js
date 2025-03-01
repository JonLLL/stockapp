import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import AssetList from './components/assetList';
import StockPrice from './components/stockPrice';
import SearchDropdown from './components/search';
import Login from './components/login';
import SignUp from './components/signUp';

const App = () => {
  return(
    <Router>
      <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px' }}>
        <h1>
          <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            AssetLab
          </Link>
        </h1>
        {/* Navigation links */}
        <nav>
          <ul>
            <li>
              <Link to="/assets">Asset List</Link>
            </li>
              <Link to="/login">
              <button>Log In</button>
            </Link>
          </ul>
        </nav>

        {/* Define Routes here */}
        <Routes>
          {/* Home Route */}
          <Route
            path="/"
            element={
              <div>
                <h2>Welcome to my stock app project</h2>
                <h3>Seamlessly manage your stocks, explore historical price data, 
                  and use detailed charts from tradeview to guide your financial journey!</h3>
                <h4>Discover and explore through more than 11,000 stocks and other assets. Start searching below!</h4>
                <SearchDropdown />
              </div>
            }
          />

          {/* Asset List Route */}
          <Route path="/assets" element={<AssetList />} />

          {/* Stock Price Route */}
          <Route path="/assets/:assetId" element={<StockPrice />} />

          {/* Login Route */}
          <Route path="/login" element={<Login />} />

          {/* SignUP Route */}
          <Route path="/sign-up" element={<SignUp />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
