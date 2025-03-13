import React, { useState } from "react";
import {Link} from "react-router-dom";
import api from "../api";

function SignUp(){
    const[userData, setUserData] = useState({username:"",password:"",email:""})
    const[message, setMessage] = useState("")

    const handleChange = (e) => {
        setUserData({...userData, [e.target.name]:e.target.value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const response = await api.post("/sign-up", {
                username: userData.username,
                password: userData.password,
                email : userData.email
            });
            setMessage("Account created Successfully!")
            console.log("Account created", response.data)

        }
        catch (error){
            setMessage("Username or email already exists")
            console.error("Sign-up error:",error.message)
        }
    }
    return(
        <div className="flex justify-center items-center min-h-screen bg-neutral-900">
    <div className="bg-neutral-800 p-8 rounded-lg shadow-lg w-full max-w-md text-white">
        <h2 className="text-2xl font-semibold text-purple-500 text-center">Create Account</h2>

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
                type="text"
                name="email"
                placeholder="Email"
                value={userData.email}
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
                Sign Up
            </button>
        </form>

        {message && <p className="text-center text-red-500 mt-2">{message}</p>}

        <h6 className="text-center text-gray-400 mt-4">
            Already have an account? 
            <Link to="/login" className="text-purple-400 hover:underline ml-1">
                Log in
            </Link>
        </h6>
    </div>
</div>

    )   
}
export default SignUp