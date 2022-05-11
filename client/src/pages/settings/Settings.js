import SideBar from '../../components/sidebar/SideBar'
import './settings.css'
//import axios from 'axios'
import { axiosInstance } from '../../config'

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

    const PF = 'https://exdblog-app.s3.amazonaws.com/'  //production - photos stored in aws3

    const handleSubmit = async (e) => {
        e.preventDefault()
        dispatch({ type: "UPDATE_START"})
        const updatedUser = {
            userId: user.id, 
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
            
            try { 
               await axiosInstance.post("/upload", data)   
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
