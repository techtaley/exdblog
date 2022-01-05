import SideBar from '../../components/sidebar/SideBar'
import './settings.css'
//import axios from 'axios'
import { axiosInstance } from '../../config'

//import { AccountCircle} from '@material-ui/icons/AccountCircle'
//import {Facebook, Twitter, Instagram, Search } from '@material-ui/icons';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { useState, useContext } from 'react'
import { Context } from '../../context/Context'  
import dotenv from "dotenv"

dotenv.config()
//Context is a State Management tool like Redux that allows us to use the user on all pages/components

export default function Settings() {
    const [file, setFile] = useState(null)
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [success, setSuccess] = useState(false)
    //const [profileImage, setProfileImage] = useState('')

    const { user, dispatch }  = useContext(Context)
    //this does not represent the api, it's where images are stored, e.g. /images aws3 bucket

    const PF = 'https://exdblog-app.s3.amazonaws.com/'  //production - photos stored in aws3
    //const PF = 'https://s3.amazonaws.com/process.env.AWS_BUCKET_NAME/'  //not working
    //const PF = 'https://s3.amazonaws.com/AWS_BUCKET_NAME/'     //not working
    //const PF = 'https://AWS_BUCKET_NAME.s3.amazonaws.com/'   //not working
    //const PF = 'https://process.env.AWS_BUCKET_NAME.s3.amazonaws.com/'   //not working
    //const PF = "http://localhost:4000/images/"  //for testing one when photos in server/images  
    //const PF = "https://expansivedesigns.com/exdblog/images/"
    //const PF = "https://exdblog.herokuapp.com/images/"  //temp location of stored images - PF = public folder  - does not work for heroku  

    const handleSubmit = async (e) => {
        e.preventDefault()
        dispatch({ type: "UPDATE_START"})
        const updatedUser = {
            userId: user.id,  //** should be user.id not user._id
            username,
            email,
            password,
        }

        if(file){
            const data = new FormData()
            const filename = file.name
            //const filename = Date.now() + file.name
            data.append("name", filename)
            data.append("file", file)  
            updatedUser.profilePic = filename 
            
            try { //axios uses client api at "proxy": "http://localhost:4000/api/" to post image uploads to aws3
               await axiosInstance.post("/upload", data)   //upload image to s3 bucket                 
                // const res = await axios.post("/upload", data)   //upload image to s3 bucket 
                // const url = res.data.location
                // console.log(url)
                // setProfileImage(url)
            } catch(err) { } 
            
        }
        try {
            const res = await axiosInstance.put("/users/" + user._id, updatedUser)  // ** should be "/users/" + user._id  
            setSuccess(true)
            dispatch({ type: "UPDATE_SUCCESS", payload: res.data })
        } catch(err) {
            dispatch({ type: "UPDATE_FAILURE" })
            //setSuccess(false)
        }
    } 

    const handleDelete = async () => {
        try {
           await axiosInstance.delete(`/users/${user._id}`, {
              data: {username: user.username} 
           })
           //blob:http://localhost:3000/f30a5dc5-651d-43f3-babe-d276a170c5c9window.location.replace("/")
       } catch(err){}
   }
        
    return (
        <div className="settings">            
           <div className="settingsWrapper">
                <div className="settingsTitle">
                    <span className="settingsUpdateTitle">Update Account</span>                                                          
                </div>

                <form className="settingsForm" onSubmit={handleSubmit}>
                    <label>Profile Picture</label>
                    <div className="settingsProfile">
                        <img 
                            className="settingsImg"
                            src={file ? URL.createObjectURL(file) : PF + user.profilePic}
                            //src={file ? URL.createObjectURL(file) : profileImage}
                            alt="Profile pic"
                        />
                        <label htmlFor="fileInput">
                           <AccountCircle className="settingsProfileIcon"/> 
                        </label>
                        <input 
                            type="file" 
                            id="fileInput" 
                            style={{ display: "none"}} 
                            onChange={e=>setFile(e.target.files[0])}
                        />
                    </div>
                    <div className="settingInputForm">
                        <label>Username</label>
                        <input 
                            type="text" 
                            placeholder={user.username} 
                            onChange={e=>setUsername(e.target.value)} 
                        />

                        <label>Email</label>
                        <input 
                            type="email" 
                            placeholder={user.email}  
                            onChange={e=>setEmail(e.target.value)}
                        />

                        <label>Password</label>
                        <input 
                            type="password" 
                            onChange={e=>setPassword(e.target.value)} 
                        />

                        <button type="submit" className="settingsSubmit">
                            Update
                        </button>
                        {success && <span className="profileUpdatebtn">Account has been updated.</span>}                        

                    </div>
                </form>
                <button className="settingsDelete" onClick={handleDelete}>
                    Delete Account
                </button>                 
           </div>
           <SideBar />
           
        </div>
    )
}
