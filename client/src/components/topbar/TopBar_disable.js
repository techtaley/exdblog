import {Facebook, Twitter, Instagram, LinkedIn, Search, Menu } from '@material-ui/icons';
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { useState } from 'react'
import { Context } from '../../context/Context'
import './topbar.css'

import dotenv from "dotenv"
dotenv.config()

export default function TopBar() {
    const { user, dispatch } = useContext(Context)
    const { showNav, setShowNav } = useState(false)  //hides nav

    //const PF = 'https://process.env.AWS_BUCKET_NAME.s3.amazonaws.com/' 
    const PF = 'https://exdblog-app.s3.amazonaws.com/' 
    //const PF = "http://localhost:4000/images/"  //PF = public folder 
    //const PF = "https://exdblog.herokuapp.com/images/"  //PF = public folder   
    //const PF = "https://expansivedesigns.com/projects/exdblog/images/"  

    const handleLogout = () => {
        dispatch({ type: "LOGOUT" })
    }
   
    return (
        <nav className="navBar">
            
            <div className="mobile-menu" onClick={()=> setShowNav(!showNav)} > 
               <Menu />
            </div>

            <div className={showNav ? "topBar hide" : "topBar"}>
                <div className="topLeft">
                    <a className="socialIcon" href="https://www.linkedin.com/company/expansive-designs"><LinkedIn style={{ color: '#71797E' }} /></a>
                    <a className="socialIcon" href="https://www.facebook.com/expansivedesigns/?ref=hl"><Facebook style={{ color: '#71797E' }}  /></a>
                    <a className="socialIcon" href="https://www.instagram.com/expansivedesigns"><Instagram style={{ color: '#71797E' }}  /></a>
                    <a className="socialIcon" href="https://twitter.com/expansivedesign"><Twitter style={{ color: '#71797E' }}  /></a>
                </div>
                <div className="topCenter">
                    <Link to="/" className="topMenu">HOME</Link>
                    <Link to="/write" className="topMenu">WRITE</Link>
                    <Link to="/logout" className="topMenu" onClick={handleLogout}>{user && "LOGOUT"}</Link>
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
            </div>           
        </nav>                                              
    )
}