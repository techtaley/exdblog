import './register.css'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { axiosInstance } from '../../config'

export default function Register() {
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const [error, setError] = useState(false)  

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError(false)

        try {  //sends data to register api from frontend to backend  
            const res = await axiosInstance.post("/auth/register", { //was "/auth/register"
                username: username.toLowerCase(),
                email: email.toLowerCase(),
                password: password
            })

            res.data && window.location.replace("/login") 
            setError(true)  
        } catch(err) {
            setError(false)
        }
    }

    return (
        <div className="register">
            <h1 className="registerTitle">Register</h1>
            <form className="registerForm" onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    placeholder="Username" 
                    onChange={e=>setUsername(e.target.value)}
                />
                <input 
                    type="text" 
                    placeholder="Email" 
                    onChange={e=>setEmail(e.target.value)}                    
                />
                <input 
                    type="password" 
                    placeholder="Password"
                    onChange={e=>setPassword(e.target.value)}                     
                />
                <button className="registerBtn" type="submit" >
                    Register
                </button>
            </form>
                <button className="loginBtn link">
                    <Link className="loginBtn link" to="/login">
                        Login
                    </Link>
                </button> 
                {error && <span style={{ color: "#fff", marginTop: "10px", textAlign: "center"}}>Something went wrong!</span>}  
             
        </div>
    )
}