import React, { useState } from "react";
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
        <div>
            <h2>Create Account</h2>
            <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="username"
                placeholder="Username"
                value={userData.username}
                onChange={handleChange}
                required
            />
            <input
                type="text"
                name="email"
                placeholder="email"
                value={userData.email}
                onChange={handleChange}
                required
            />
            <input
                type="password"
                name="password"
                placeholder="Password"
                value={userData.password}
                onChange={handleChange}
                required
            />
            <button type="submit">Sign-up</button>
            {message && <p>{message}</p>}
            </form>
        </div>
    )   
}
export default SignUp