import React, { useState } from "react";
import api from "../api";

function Login(){
    const[userData, setUserData] = useState({username:"",password:""})
    const[message, setMessage] = useState("")
    
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


            setMessage("Login successful!")
            console.log("Login Successful", response.data)

        }
        catch (error){
            setMessage("Invalid username or password")
            console.error("login error:",error.message)
        }
    }

    return(
        <div>
      <h2>Login</h2>
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
          type="password"
          name="password"
          placeholder="Password"
          value={userData.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Login</button>
        {message && <p>{message}</p>}
      </form>
    </div>
    )
}

export default Login