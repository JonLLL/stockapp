import React,  { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logout from "./logoutButton";

const Navbar = () =>{
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
        
    
    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser)); // Set user if found
        }
        }, []);

    return(
        <div>
            <Link to="/" style={{ textDecoration: 'none', color: 'inherit' , fontSize:"35px"}}>
                AssetLab
            </Link> 
            {/* {user ? (
                // <button onClick={() => navigate("/dashboard")}>Dashboard</button>
                <button>logout</button>
                ) : (
                <Link to="/login">
                    <button>Log In</button>
                </Link>
                )} */}
           
        </div>
    )
}

export default Navbar