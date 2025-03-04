import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from '../api';  

function Dashboard() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [watchlist,setWatchlist] = useState([]);

    useEffect(() => {
        // Check if user is logged in
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            setUser(parsedUser.user);
            console.log(parsedUser.user.id)
        } else {
            // Redirect to login if no user is found
            navigate("/login");
        }
    }, [navigate]);

    const fetchWatchlist = async (userId) => {
        try {
            console.log("Fetching watchlist for user:", userId);
            const response = await api.get(`/user/${userId}`);
            console.log("Watchlist response:", response.data.watchlists);

            response.data.watchlists.forEach((list, index) => {
                console.log(`Watchlist ${index}:`, list);
                console.log("Assets:", list.assets);
            });

            setWatchlist(response.data.watchlists || []);
        } catch (error) {
            console.error("Caught unexpected error", error);
            setWatchlist([]); // Reset if an error occurs
        }
    };

    useEffect(() => {
        if (user?.id) {
            fetchWatchlist(user.id);
        }
    }, [user?.id]); // Depend on `user.id` instead of `user`

    const handleLogout = () => {
        localStorage.removeItem("user"); // Remove user data
        setUser(null);
        setWatchlist([]); // Ensure watchlist is cleared
        navigate("/login"); // Redirect to login
    };

    return (
        <div>
            <h2>Welcome back, {user?.username}!</h2>
            <button onClick={handleLogout}>Logout</button>
            <h4>Your Watchlists:</h4>
            {watchlist.length > 0 ? (
                watchlist.map((list) => (
                    <div key={list.id} style={{ border: '1px solid #ddd', padding: '10px', marginBottom: '10px' }}>
                        <h4>{list.name}</h4>
                        <ul>
                            {list.assets.length > 0 ? (
                                list.assets.map((asset) => (
                                    <li key={asset.asset_id}>
                                        <Link to={`/assets/${asset.asset_id}`}>
                                            {asset.asset_symbol} - {asset.asset_name}
                                        </Link>
                                    </li>
                                ))
                            ) : (
                                <p>No assets in this watchlist.</p>
                            )}
                        </ul>
                    </div>
                ))
            ) : (
                <p>You have no watchlists yet.</p>
            )}
        </div>
    );
}

export default Dashboard;
