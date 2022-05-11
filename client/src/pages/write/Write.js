import { useContext, useState } from 'react'
import { Context } from '../../context/Context'
import { Add } from '@material-ui/icons';
import './write.css'
import { axiosInstance } from '../../config'  //get newPosts  w/o photos through heroku urlimport axios from 'axios'  //gets photos only through aws3 url 
//import {axios} from 'axios'
//pass variables to get setSingleImage and setSinglePostImage
//pass variable results to single and singlePost components/pages
export default function Write() { //pass variable in order to setImgUrl
    const [title, setTitle] = useState("")
    const [desc, setDesc] = useState("")
    const [categories, setCategories] = useState([])
    const [file, setFile] = useState(null) 
    
    const { user } = useContext(Context) 
     
    const handleSubmit = async (e) => {
        e.preventDefault()

        const newPost = {  
            username: user.username,
            title,
            desc,
            categories,
        }

        if(file){  
            const data = new FormData()  
            const filename = file.name  
            data.append("name", filename)  
            data.append("file", file) 
            newPost.photo = filename 

            try { 
                await axiosInstance.post("/upload", data)   

            } catch(err) { } 
        }   

        

        try {  
            const res = await axiosInstance.post("/posts", newPost)  
            console.log(res.data._id)
            window.location.replace("/post/" + res.data._id)               
        } catch(err){ }   
    }

    return (
        <div className="write">
            { file && 
                <img 
                    className="writeImg" 
                    src={ URL.createObjectURL(file) } 
                    alt="write page pic" />        
            }           

            <form className="writeForm" onSubmit={ handleSubmit }>
                <div className="writeFormGroup">
                    <label 
                        className="writeFormLabel" 
                        htmlFor="fileInput">
                        <Add className="writeIcon" />
                    </label>

                    <input 
                        className="formFileInput" 
                        type="file" 
                        id="fileInput" 
                        style={{ display: "none" }}
                        onChange={e=>setFile(e.target.files[0])}
                    />

                    <input 
                        className="formWriteInput" 
                        type="text"
                        placeholder="Title" 
                        autoFocus={true}
                        onChange={e=>setTitle(e.target.value)}
                    />

                </div>

                <div className="writeFormGroup">            

                <input 
                    className="writeInput writeText" 
                    type="text"
                    placeholder="Category" 
                    onChange={e=>setCategories(e.target.value)}
                />                     
                   
                </div>
                

                <div className="writeFormGroup">
                    <textarea 
                        className="writeInput writeText" 
                        type="text"
                        placeholder="Write something..." 
                        onChange={e=>setDesc(e.target.value)}
                    >
                    </textarea>
                </div>

                <button className="writeSubmit" type="submit">
                    Publish
                </button>                  
                <br/>
            </form> 
        </div>
    )
}
