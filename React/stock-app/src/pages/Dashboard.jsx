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
            <div className="p-6 max-w-3xl mx-auto">
            <h2 className="text-2xl font-semibold text-purple-600">Welcome back, {user?.username}!</h2>
            
            <div className="flex items-center justify-between mt-4">
                <h4 className="text-lg font-medium">Your Watchlists:</h4>
                <button onClick={() => setIsModalOpen(true)} className="bg-purple-600 text-white px-3 py-1 rounded hover:bg-purple-500 transition">
                    +
                </button> 
            </div>
        
            {watchlist.length > 0 ? (
                <div className="mt-4 space-y-4">
                    {watchlist.map((list) => (
                        <div key={list.watchlist_id} className="border border-gray-300 p-4 rounded-lg bg-neutral-900 text-purple-400 shadow-md">
                            <h4 className="text-lg font-semibold">
                                <Link to={`/watchlist/${list.watchlist_id}`} className="hover:text-purple-500 transition">
                                    {list.name}
                                </Link>
                            </h4>
                            <ul className="mt-2 space-y-1">
                                {list.assets.length > 0 ? (
                                    list.assets.map((asset) => (
                                        <li key={asset.asset_id}>
                                            <Link to={`/assets/${asset.asset_id}`} className="hover:text-purple-500 transition">
                                                {asset.asset_symbol} - {asset.asset_name}
                                            </Link>
                                        </li>
                                    ))
                                ) : ( 
                                    <p className="text-gray-400">No assets in this watchlist.</p>
                                )}
                            </ul>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-gray-400 mt-4">You have no watchlists yet.</p>
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
