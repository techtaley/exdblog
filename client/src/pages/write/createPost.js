//createPost.js

/*This component creates a post and displays the image from aws onSubmit, directly in this 
component. But I want to display {imageUrl} in a different component, on singlePost.js below 
or the homepage. Tried: 1) I tried const url = await axios.get("/upload") but I got empty 
data: {} which means it did not access aws3 bucket. 2) Below, I tried sending {imageUrl} over 
as a prop but that didn't work! Arghh!!! There is probably a simple solution but I'm stuck! */

import axios from 'axios';

export default function CreatePost() {
    const [title, setTitle] = useState("")
    const [file, setFile] = useState(null) 
    const [imageUrl, setImageUrl] = useState([])
     
    const handleSubmit = async (e) => {
        e.preventDefault()

        const createPost = {  
            username: user.username,
            title
        }

        if(file){  
            const data = new FormData()  
            const name = file.name  
            data.append("name", name) 
            data.append("file", file) 

            try {  
                const res = await axios.post("/posts", createPost)
                window.location.replace("/post/" + res.data._id)                
            } catch(err){ }   

            //send image to aws3 - works!
            try {  
                const res = await axios.post("/upload", data)   
                const url = res.data.location                
                setImageUrl(url)
            } catch(err) { } 
        }
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

                <button className="writeSubmit" type="submit">
                    Publish
                </button>                  
                <br/>

                //display image from aws3 - works!
                <img src={imageUrl} alt="aws3" />                
            </form>            
        </div>
    )
}

//singlePage.js

//display the imageUrl from aws3 here not createPost.js

export default function SinglePost({imgUrl}) {

const [imageUrl, setImageUrl] = useState("")

    useEffect(() => {
        //get the aws3 url from the server - not working!
        const getImage = async() => {            
            const res = await axios.get("/upload")
            console.log(res)

                try {
                    setImageUrl(res.data.location)
                    //setImageUrl(imageUrl.map(newImage => newImage=url))
                    //console.log(url)
                } catch(err) {
                    console.log(err) 
                }
        }

        getImage()        
    }, [path, imageUrl])  //re-render post id only if it changes


    return (
        <div className="singlePost">
            <div className="singlePostWrapper">
                { imgUrl &&(
                    <img 
                        className="singlePostImg" 
                        src={ imgUrl }
                        alt=""
                    />
                )}             
            </div>
        </div>    
    )
}

//createPost.js

import axios from 'axios'
import SinglePost from './SinglePost/'

export default function CreatePost() {
    const [imageUrl, setImageUrl] = useState("")
     
    const handleSubmit = async (e) => {
        e.preventDefault()
            try {  
                const res = await axios.post("/upload", data)   
                const url = res.data.location
                setImageUrl(url)
            } catch(err) { } 
        }
    }

    return (
        <div>
	        <form onSubmit={handleSubmit}>
        		...
        	</form>

            <SinglePost imgUrl={imageUrl} alt="aws3" />                
        </div>
    )
}


//singlePage.js

export default function SinglePost({imgUrl}) {
...

    return (
        <div>
            <img  src={ {imgUrl} } alt="" />
            <img  src={ imgUrl } alt="" />
        </div>    
    )
}