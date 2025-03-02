import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Check if user is logged in
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            setUser(parsedUser.user);
        } else {
            // Redirect to login if no user is found
            navigate("/login");
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem("user"); // Remove user data
        navigate("/login"); // Redirect to login
    };

    return (
        <div>
            <h2>Welcome back, {user?.username}!</h2>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
}

export default Dashboard;
