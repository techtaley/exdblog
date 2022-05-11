//import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import {Facebook, Twitter, Instagram, LinkedIn, Search, Menu } from '@material-ui/icons';
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { useState } from 'react'
import { Context } from '../../context/Context'

import write from './../../pages/write/Write'
import register from './../../pages/register/Register'
import settings from './../../pages/settings/Settings'
import login from './../../pages/login/Login'
import logout from './../../pages/logout/Logout'

import './topbar.css'

import dotenv from "dotenv"
dotenv.config()

export default function TopBar() {
    const { user, dispatch } = useContext(Context)
    const [ showNav, setShowNav ] = useState(true)   //false hides nav
    
    const PF = 'https://exdblog-app.s3.amazonaws.com/'  //production - photos stored in aws3

    const handleLogout = () => {
        dispatch({ type: "LOGOUT" })  
    }
   
    return (
        <Router>
            <div className="mobile-menu">   
                <Menu onClick={() => setShowNav(!showNav)} />
            </div> 

            <nav className="navBar" id={showNav ? "hidden" : ""}>  
                    <div className="topLeft">
                        <a className="socialIcon" href="https://www.linkedin.com/company/expansive-designs"><LinkedIn style={{ color: '#71797E' }} /></a>
                        <a className="socialIcon" href="https://www.facebook.com/expansivedesigns/?ref=hl"><Facebook style={{ color: '#71797E' }}  /></a>
                        <a className="socialIcon" href="https://www.instagram.com/expansivedesigns"><Instagram style={{ color: '#71797E' }}  /></a>
                        <a className="socialIcon" href="https://twitter.com/expansivedesign"><Twitter style={{ color: '#71797E' }}  /></a>
                    </div>             

                    <div className="topCenter">
                        <Link to="/" className="topMenu">HOME</Link>
                        <Link to="/write" className="topMenu">WRITE</Link>
                        <Link className="topMenu" onClick={handleLogout}>{user && "LOGOUT"}</Link>                  
                    </div> 

                    <div className="topRight">
                    { user ? (
                        <Link to="/settings">
                            <img 
                                className="profileImg" 
                                src={PF + user.profilePic} 
                                alt="profile pic of user"/>
                        </Link>
                        ) : (
                            <div className="topCenter">
                                <Link to="/login" className="topMenu">LOGIN</Link>
                                <Link to="/register" className="topMenu">REGISTER</Link>
                            </div>
                        )
                    }
                        <Search className="searchIcon"/>    
                    </div>                                   
            </nav>                       
        </Router>                                                     
    )
}