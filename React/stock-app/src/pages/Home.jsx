import React, { useState, useEffect } from "react";
import { Link, useNavigate  } from "react-router-dom";
import SearchDropdown from "../components/search";

function Home() {
    

    // useEffect(() => {
    //     const storedUser = localStorage.getItem("user");
    //     if (storedUser) {
    //       setUser(JSON.parse(storedUser)); // Set user if found
    //     }
    //   }, []);
    
    return (
        <div>
            <h2>Welcome to my stock app project</h2>
            <h3>Seamlessly manage your stocks, explore historical price data, 
                and use detailed charts from tradeview to guide your financial journey!</h3>
                <h4>login to get started</h4>
                <Link to="/login">
                    <button>Log In</button>
                </Link>
            <h4>Discover and explore through more than 11,000 stocks and other assets. Start searching below!</h4>
            {/* Navigation links */}
            <nav>
                <ul>
                <li>
                    <Link to="/assets">Asset List</Link>
                </li>
                </ul>
            </nav>
            <SearchDropdown />
        </div>
    );
}

export default Home;