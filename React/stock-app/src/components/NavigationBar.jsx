import React,  { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () =>{
    const [localUser, setLocalUser] = useState(null);
    const navigate = useNavigate();
        
    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setLocalUser(JSON.parse(storedUser).user); // Parse the user data correctly
        }
        // Listen for storage events (e.g., when user logs out from another tab)
        const handleStorageChange = () => {
            const updatedUser = localStorage.getItem("user");
            if (updatedUser) {
                setLocalUser(JSON.parse(updatedUser).user);
            } else {
                setLocalUser(null);
            }
        };

        window.addEventListener("storage", handleStorageChange);

        return () => {
            window.removeEventListener("storage", handleStorageChange);
        };
        }, []);

        
        const handleLogout = () => {
            localStorage.removeItem("user");
            setLocalUser(null);
            window.dispatchEvent(new Event("storage")); // Trigger navbar update
            navigate("/")
        };
    
    return(
        <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            }}>
            <Link to="/" style={{ textDecoration: 'none', color: 'inherit' , fontSize:"35px"}}>
                AssetLab
            </Link> 
            <div>
                {localUser ? (
                    <div>
                    <button onClick={() => navigate("/dashboard")}>dashboard</button>
                     <button onClick={handleLogout}>logout</button>
                     </div>
                ):(
                <Link to="/login">
                    <button>login</button>
                    </Link>
                )}
            </div>
           
        </div>
    )
}

export default Navbar