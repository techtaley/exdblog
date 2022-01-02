import { useState, useEffect } from 'react'
import { Facebook, Twitter, Instagram, LinkedIn } from '@material-ui/icons';
import { Link } from 'react-router-dom'
import './sidebar.css'
import { axiosInstance } from '../../config'
//import axios from 'axios'

export default function SideBar(){
    const [cats, setCats] = useState([])

    useEffect(()=> {
        const getCats = async() => {
            const res = await axiosInstance.get("/categories")
            setCats(res.data) 
        }
        getCats()
    }, [])

    return (
            <div className="sidebar">
                <div className="sidebarItem">
                    <span className="sidebarTitle">about me</span>  
                    <img className="sidebarImg" src="https://images.unsplash.com/photo-1571442463800-1337d7af9d2f?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTR8fGJsYWNrJTIwd29tYW4lMjBmYWNlfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=60" alt="about pic" />
                    <p className="sideParagraph">
                    Hi I'm Tech Taley! Welcome to my blog page, your online resource for insights on business growth solutions for your organizations. My goal is to understand the objectives of your business in order to develop a strategy that converts your website visitors to clients.
                    </p>
                </div>

                <div className="sidebarItem">
                    <span className="sidebarTitle">categories</span>  
                    <p className="sideBarList">
                        { cats.map((c, id) => (
                            <Link className="link" to={`/?cat=${c.name}`} >                                
                                <span key={id}>{c.name}</span> 
                            </Link>                           
                        ))}
                    </p>
                </div>

                <div className="sidebarItem">
                    <span className="sidebarTitle">let's connect</span>  
                    <p className="sideBarSocial">
                        <a className="socialIcon" href="https://www.linkedin.com/company/expansive-designs"><LinkedIn style={{ color: '#71797E' }} /></a>
                        <a className="socialIcon" href="https://www.facebook.com/expansivedesigns/?ref=hl"><Facebook style={{ color: '#71797E' }}  /></a>
                        <a className="socialIcon" href="https://www.instagram.com/expansivedesigns"><Instagram style={{ color: '#71797E' }}  /></a>
                        <a className="socialIcon" href="https://twitter.com/expansivedesign"><Twitter style={{ color: '#71797E' }}  /></a>
                    </p>
                </div>                
        </div>      
    )
}
