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
        <div className="flex flex-col items-center justify-center min-h-screen bg-neutral-900 text-white px-6">
        {/* Hero Section */}
        <div className="text-center max-w-2xl">
            <h1 className="text-4xl font-bold mb-4 text-purple-400">
                Welcome to AssetLab
            </h1>
            <p className="text-lg text-gray-300">
                Seamlessly manage your stocks, explore historical price data, and use detailed charts from 
                TradingView to guide your financial journey.
            </p>
            <h2 className="mt-6 text-xl font-semibold">
                {user ? "Access your dashboard to track your assets!" : "Start tracking your assets today!"}
            </h2>

            {/* CTA Buttons */}
            <div className="mt-6 flex gap-4 justify-center">
                {user ? (
                    <button 
                        onClick={() => navigate("/dashboard")}
                        className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 rounded-lg shadow-md transition"
                    >
                        Go to Dashboard
                    </button>
                ) : (
                    <Link to="/login">
                        <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md transition">
                            Get Started
                        </button>
                    </Link>
                )}
            </div>
        </div>

        {/* Features Section */}
        <div className="mt-12 text-center max-w-xl">
            <h3 className="text-lg font-medium text-gray-300">
                Discover and explore more than <span className="font-bold text-purple-400">11,000 stocks</span> and other assets.
            </h3>
            <p className="mt-2 text-gray-400">Browse our inventory or start searching below.</p>
        </div>

        {/* Navigation */}
        <nav className="mt-6">
            <ul>
                <li>
                    <Link to="/assets" className="text-blue-400 hover:underline">View Asset List</Link>
                </li>
            </ul>
        </nav>

        {/* Search Dropdown */}
        <div className="mt-8 w-full max-w-lg items-center">
            <SearchDropdown />
        </div>
    </div>
    );
}

export default Home;