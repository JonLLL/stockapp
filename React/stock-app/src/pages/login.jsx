import React, { useState } from "react";
import {Link, useNavigate} from "react-router-dom";
import api from "../api";

function Login(){
    const[userData, setUserData] = useState({username:"",password:""})
    const[message, setMessage] = useState("")
    const navigate = useNavigate();
    
    const handleChange = (e) => {
        setUserData({...userData, [e.target.name]:e.target.value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const response = await api.post("/login", {
                username: userData.username,
                password: userData.password
            });

            localStorage.setItem("user", JSON.stringify(response.data));
            window.dispatchEvent(new Event("storage"));

            setMessage("Login successful!")
            console.log("Login Successful", response.data)

            navigate("/dashboard");

        }
        catch (error){
            setMessage("Invalid username or password")
            console.error("login error:",error.message)
        }
    }

    return(
      <div className="flex justify-center items-center min-h-screen bg-neutral-900">
      <div className="bg-neutral-800 p-8 rounded-lg shadow-lg w-full max-w-md text-white">
          <h2 className="text-2xl font-semibold text-purple-500 text-center">Login</h2>
  
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <input
                  type="text"
                  name="username"
                  placeholder="Username"
                  value={userData.username}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 rounded bg-neutral-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={userData.password}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 rounded bg-neutral-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <button 
                  type="submit" 
                  className="w-full bg-purple-600 hover:bg-purple-500 transition text-white font-semibold py-2 rounded"
              >
                  Login
              </button>
          </form>
  
          {message && <p className="text-center text-red-500 mt-2">{message}</p>}
  
          <h6 className="text-center text-gray-400 mt-4">
              Don't have an account? 
              <Link to="/sign-up" className="text-purple-400 hover:underline ml-1">
                  Sign up
              </Link>
          </h6>
      </div>
  </div>
  
    )
}

export default Login