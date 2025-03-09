    import React, { useEffect, useState } from "react";
    import { useNavigate, Link } from "react-router-dom";
    import api from '../api';  
    import WatchlistModal from "../components/WatchlistModal";

    function Dashboard() {
        const navigate = useNavigate();
        const [user, setUser] = useState(null);
        const [watchlist,setWatchlist] = useState([]);
        const [isModalOpen, setIsModalOpen] = useState(false);

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


        const handleAddWatchlist = async (name) => {
            try {
            const response = await api.post(`/user/${user.id}/watchlist`, { name });
            setWatchlist([...watchlist, response.data]); // Append new watchlist
            console.log(watchlist)
            console.log(response.data)
            } catch (error) {
            console.error("Error adding watchlist", error);
            }
        };

        return (
            <div>
                <h2>Welcome back, {user?.username}!</h2>
                <h4>Your Watchlists:</h4>
                <button onClick={() =>setIsModalOpen(true) }>+</button> 
                {watchlist.length > 0 ? (
                    watchlist.map((list) => (
                        <div key={list.watchlist_id} style={{ border: '1px solid #ddd', padding: '10px', marginBottom: '10px' }} >
                            {/* include link to asset page as well */}
                                <h4 key = {list.watchlist_id} >
                                    <Link to={`/watchlist/${list.watchlist_id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                        {list.name}
                                    </Link>
                                </h4>
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
                <WatchlistModal 
                    isOpen={isModalOpen} 
                    onClose={() => setIsModalOpen(false)} 
                    onAddWatchlist={handleAddWatchlist} 
                />
            </div>
        );
    }

    export default Dashboard;
