import React,  { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import SearchDropdown from "./search";

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
        <div className="flex justify-between items-center bg-neutral-900 text-purple-700 m-0 relative" >
            <Link to="/" className="no-underline text-inherit text-[35px] hover:text-purple-600">
                AssetLab
            </Link> 
            <SearchDropdown />
            <div>
                {localUser ? (
                    <div>
                    <button onClick={() => navigate("/dashboard")} className="button">dashboard</button>
                     <button onClick={handleLogout} className="button">logout</button>
                     </div>
                ):(
                <Link to="/login" className="button  hover:text-purple-400">
                    <button >login</button>
                    </Link>
                )}
            </div>
           
        </div>
    )
}

export default Navbar