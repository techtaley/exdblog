import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import Header from '../../components/header/Header'
import Posts from '../../components/posts/Posts'
import SideBar from '../../components/sidebar/SideBar'

import './home.css'
import { axiosInstance } from '../../config'
import dotenv from "dotenv"
//import axios from 'axios'

dotenv.config()

export default function Home() {
    const [ posts, setPosts ] = useState([])
    //const [ imageUrl, setImageUrl ] = useState("")

    const { search } = useLocation()  //search term can by user, category

    useEffect(() => {
        
        const fetchPosts = async() => {  //gets "heroku.com/?username=techtaley"
            const res = await axiosInstance.get("/posts" + search)  //proxy: "http://localhost:4000/api/"
            setPosts(res.data)  //gets data from /posts api
        }
        
        fetchPosts()  //displays posts

    }, [search]) 

    return (
        <>
            <Header />    
            <h1 className="blogs">My Blog</h1>                    

            <div className="home">  
                <Posts posts={ posts } />  
                <SideBar />
            </div>           
        </>
    )
}
