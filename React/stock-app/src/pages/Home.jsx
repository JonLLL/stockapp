import React, { useState, useEffect } from "react";
import { Link, useNavigate  } from "react-router-dom";
import SearchDropdown from "../components/search";

function Home() {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          setUser(JSON.parse(storedUser)); // Set user if found
        }
      }, []);
    
    return (
        <div>
            <h2>Welcome to AssetLab an asset manager built for you</h2>
            <h3>Seamlessly manage your stocks, explore historical price data, 
                and use detailed charts from tradeview to guide your financial journey</h3>
                <h4>{user ? "Access your dashboard to track your assets!" : "Start tracking your assets!"}</h4>
                {user ? (
                    <button onClick={() => navigate("/dashboard")} className="button" >Go to Dashboard</button>
                    ) : (
                    <Link to="/login">
                        <button className="button">Get started</button>
                    </Link>
                 )}
            <h4>Discover and explore through more than 11,000 stocks and other assets.</h4>
            <h4>Look through our inventory or Start searching below!</h4>
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