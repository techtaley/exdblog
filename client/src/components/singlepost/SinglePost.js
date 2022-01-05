//import Write from '../../pages/write/Write';
import { useState, useEffect, useContext } from 'react'
import { Context } from '../../context/Context'
import { Edit, Delete } from '@material-ui/icons';
import { Link, useLocation } from 'react-router-dom'
import './singlepost.css'
import { axiosInstance } from '../../config'
import axios from 'axios'

import dotenv from "dotenv"
dotenv.config()

//avatar.js - setState  single - setState  
//in avatar.js <single 
export default function SinglePost() {  //pass results?  variable in order to set
    const location = useLocation()
    const path = location.pathname.split("/")[2]   //needs post id from "/path/8394393493rj" gets id "8394393493rj"  
    const [post, setPost] = useState({}) 
     //localhost/4000 is the local server or api to store images in small projects

     const PF = 'https://exdblog-app.s3.amazonaws.com/'  //production - photos stored in aws3
     //const PF = 'https://s3.amazonaws.com/process.env.AWS_BUCKET_NAME/'  //not working
     //const PF = 'https://s3.amazonaws.com/AWS_BUCKET_NAME/'     //not working
     //const PF = 'https://AWS_BUCKET_NAME.s3.amazonaws.com/'   //not working
     //const PF = 'https://process.env.AWS_BUCKET_NAME.s3.amazonaws.com/'   //not working
     //const PF = "http://localhost:4000/images/"  //for testing one when photos in server/images  
     //const PF = "https://expansivedesigns.com/exdblog/images/"
     //const PF = "https://exdblog.herokuapp.com/images/"  //temp location of stored images - PF = public folder  - does not work for heroku  
  
    
    const { user } = useContext(Context) 

    const [title, setTitle] = useState("")
    const [desc, setDesc] = useState("")
    const [updateMode, setUpdateMode] = useState(false)

    useEffect(() => {
        const getPost = async () => {  //client api uses baseURL: "https://expansivedesigns.com/exdblog" to post data (without images) to mongoDB
            //we can get a response of data - res.data._id from the post
            const res = await axiosInstance.get("/posts/" + path)  

            //console.log(res.data)
            setPost(res.data)
            setTitle(res.data.title)
            setDesc(res.data.desc)
            //console.log(res.data.photo)
            //console.log(res.data) 

            //setImagUrl(url)
            //setImageUrl()
      
        }

        getPost()
    //}, [path, imagUrl])  //re-render post id only if it changes
    }, [path])  //re-render post id only if it changes

    const handleDelete = async() => {  //deleting from FE
        try {   //represents client - baseURL: "https://expansivedesigns.com/exdblog", to delete data
            await axios.delete(`/posts/${post._id}`, {
                //await axiosInstance.delete("/posts/" + post._id, {                
               data: {username: user.username} 
            })
            window.location.replace("/")
        } catch(err){}
    }
    
    const handleUpdate = async()=> {   //updating on FE
        try {  //represents client - baseURL: "https://expansivedesigns.com/exdblog", to update data
            await axios.put(`/posts/${post._id}`, {  
                //await axiosInstance.put("/posts/" + post._id, {                 
                username: user.username, title, desc 
            })

            setUpdateMode(false)
        } catch(err){}
    }

    // var params = {Bucket: process.env.AWS_BUCKET_NAME, Key: req.params.filename};
    // var url = s3.getSignedUrl('getObject', params);
    // console.log('The URL is', url);  

    return (
        <div className="singlePost">
            <div className="singlePostWrapper">
                { post.photo && (                  
                        <img 
                            className="singlePostImg" 
                            //src={imageLoc}
                            src={ PF + post.photo }
                            // onChange={setImageUrl}
                            alt="aws img"
                        />
                )}   
                 {
                    updateMode ? (
                        <input 
                            type="text" 
                            value={title} 
                            className="singlePostTitleInput"
                            autoFocus
                            onChange={e=>setTitle(e.target.value)}
                        />
                        ) : (
                         <h1 className="singlePostTitle">
                        {title}
                        {post.username === user?.username && (
                            <div className="singlePostEdit">
                                <Edit className="singlePostIcon"
                                    onClick={e=>setUpdateMode(true)}
                            /> 
                                <Delete className="singlePostIcon" 
                                    onClick={handleDelete}
                                />
                            </div>
                        )}        
                    </h1>
                    )
                }
                    <div className="singlePostInfo">                
                        Author:                  
                        <span>
                            <Link className="singlePostName link" to={`/?user=${post.username}`}>
                                {post.username}
                            </Link>                        
                        </span>                                                       
                        <span className="singlePostDate">
                            { new Date(post.createdAt).toDateString() }
                        </span>
                    </div>

                    { updateMode ? ( 
                        <textarea 
                            className="singlePostDescInput" 
                            value={desc} 
                            onChange={e=>setDesc(e.target.value)}
                        /> 
                    ) : (
                        <p className="singlePostDesc">{desc}</p>                    
                    )}

                    {updateMode && (
                        <button 
                            className="singlePostButton" 
                            onClick={handleUpdate}>
                                Update
                        </button> 
                    )}
                </div>
            </div>
    )
}