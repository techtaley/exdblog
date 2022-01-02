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
    //const [imageUrl, setImageUrl] = useState('')   
    
    const { user } = useContext(Context) //gets initial user's login status from context; null
     
    const handleSubmit = async (e) => {
        e.preventDefault()

        const newPost = {  //doesn't upload image here 
            username: user.username,
            title,
            desc,
            categories,
        }

        if(file){  //if image file exisits, uploads it
            const data = new FormData()  //create an empty data varible to hold image
            const filename = file.name  //create image variable - Data.now() prevents duplicate
            //const filename = Date.now() + '-' + file.name  //create image variable - Data.now() prevents duplicate 
            //const filename = Date.now().toString()  //create image variable - Data.now() prevents duplicate 
            data.append("name", filename)  //add filename of image to data variable
            data.append("file", file)  //adds actual image to data variable
            newPost.photo = filename //add save filename file to the newPost 

            try { //axios uses client api at "proxy": "http://localhost:4000/api/" to post image uploads to aws3
                //axios uses multer and  'api/upload" to post images to aws3
                await axiosInstance.post("/upload", data)   //upload image only to s3 bucket 
                //await axios.post("/upload", data)   //upload image to s3 bucket 
                
                // const res = await axios.post("/upload", data)   //upload image to s3 bucket 
                // const url = res.data.location                
                // console.log(url) 
                // setImageUrl(url)  

            } catch(err) { } 
        }   

        

        try {  //??client uses baseURL: "https://expansivedesigns.com/exdblog" to post data (without images) to mongoDB 
            //we can get a response of data - res.data._id from the post
            const res = await axiosInstance.post("/posts", newPost)  //adds newPost, with image to db
            console.log(res.data._id)
            window.location.replace("/post/" + res.data._id) //then go to the singlepost just uploaded by id              
        } catch(err){ }   

        // try {
        //     const res2 = await axios.get("/upload")   //upload image to s3 bucket 
        //     const key = res2.data.key                
        //     console.log(key)  //this works - Need to move to another component... 
        //     setImageKey(key)  
        // }catch(err){

        // }
    }

    return (
        <div className="write">
            { file && //if an image file exists
                <img 
                    className="writeImg" 
                    src={ URL.createObjectURL(file) } //onChange() create a URL from the selected file, display in Write.js
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
