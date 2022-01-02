import SideBar from '../../components/sidebar/SideBar'
import SinglePost from '../../components/singlepost/SinglePost'
import './single.css'

export default function Single(){  //pass variable write->single(singlePost)
    // const [imageKey, setImageKey] = useState('')

    // let getImage = async () => {
    //     try {
    //         const res = await axios.get("/upload")   //upload image to s3 bucket 
    //         const urlKey = res.data.key                
    //         console.log(urlKey)  //this works - Need to move to another component... 
    //         setImageKey(urlKey)  
    //     } catch(err){
    // }

    // getImage()

    return (
        <div className="single">
            <SinglePost />
            <SideBar />
        </div>
    )
}
