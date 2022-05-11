//import { useState } from 'react'
//import { useState, useEffect } from 'react'
import './post.css'
import { Link } from "react-router-dom"
//import { axiosInstance } from '../../config'  //get newPosts  w/o photos through heroku url
//import axios from 'axios'  //gets photos only through aws3 url 

import dotenv from "dotenv"

dotenv.config()

export default function Post({ post }) {  
    //localhost/4000 is the local server or api to store images in small projects           

    const PF = 'https://exdblog-app.s3.amazonaws.com/'  //production - photos stored in aws3

    //need a different PF address for AWS
    return (
        <div className="post">                  
               { post.photo && (  //post.photo &&  if there is a photo && set photo
                    <img
                        className="postImg"
                        src={PF + post.photo}
                         //retrieves image file from AWS
                        alt="post images"
                    />
                )} 

            <div className="postInfo">
                    { post.categories.map(c =>
                        <span className="postCat">{ c }</span>
                    )}
            </div>

            <Link to={`/post/${post._id}`} className="link">
                <span className="postTitle">{post.title}</span>
            </Link>
            
            <span className="postDate">{ new Date (post.createdAt).toDateString() }</span>

            <p className="postDesc">{post.desc}</p>
        </div>            
    )
}
