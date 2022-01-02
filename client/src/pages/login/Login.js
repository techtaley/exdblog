import { Link } from 'react-router-dom'
import './login.css'
import { useState } from 'react'

import { useContext, useRef } from 'react'
import { Context } from '../../context/Context'
import { axiosInstance } from '../../config'
//import axios from 'axios'

export default function Login() {
    //useRef() allows you to persist values between renders, keep track of previous state values
    //if used with useEffect() we are updating useRef current value with each input update 
    const [ username, getUsername ] = useState('')    
    const [ password, getPassword ] = useState('')
    const userRef = useRef()
    const passwordRef = useRef()
    const { dispatch, isFetching } = useContext(Context)  //upates dispatch in Context.js
    //const [ redirect, setRedirect ] = useState(false)          

    const handleSubmit = async (e) => {
        e.preventDefault()

        dispatch({ 
            type: "LOGIN_START"    //initially dispatches login start action type
        })

        try { //client uses baseURL: "https://expansivedesigns.com/exdblog" to post data (without images) to mongoDB 
            const res = await axiosInstance.post("/auth/login", { 
                username: userRef.current.value,
                password: passwordRef.current.value,
            })
            dispatch({ //if login info correct dispatches login_success which return a payload
                type: "LOGIN_SUCCESS", 
                payload: res.data 
            })
            res.data && window.location.replace("/login")
        } catch(err) {
            dispatch({ //if login info is incorrect dispatched login_failure with no return
                type: "LOGIN_FAILURE" 
            })
        }
    }

    return (
        <div className="login">
            <h1 className="loginTitle">Login</h1>
            <form className="loginForm" onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    placeholder="Username"
                    ref={userRef} 
                    name='username'
                    onChange={e => {
                        getUsername(e.target.value)
                    }}                        
                    value={username}                    
                />
                <input 
                    type="password" 
                    placeholder="Password" 
                    ref={passwordRef} 
                    name='password'
                    onChange={e => {
                        getPassword(e.target.value)
                    }}                        
                    value={password}                          
                />
                <button className="loginBtn" type="submit" disabled={isFetching}>
                    Login
                </button>
            </form>

                <button className="registerBtn">
                    <Link to="/register" className="registerBtn link">
                        Register
                    </Link>
                </button>
        </div>
    )
}
