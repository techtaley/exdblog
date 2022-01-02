const router = require("express").Router()
const User = require("./../models/User")
const Post = require("./../models/Post")

//const authen = require("../routes/middleware/authen")

//CREATE POST - route and controller combined
router.post("/", async (req, res) => {
    const newPost = new Post(req.body)
      
    try {
        const savedPost = await newPost.save()
        res.status(200).json(savedPost) 

    } catch(err){
        res.status(500).json(err)
    }
})

//UPDATE POST
router.put("/:id", async(req, res) => {
    try {
        const post = await Post.findById(req.params.id) //**should be req.params.id not _.id
        if (post.username === req.body.username){ 

            try {
                const updatedPost = await Post.findByIdAndUpdate(
                    req.params.id, 
                    {  //save updated post
                        $set: req.body
                    },                    
                    { new: true } 
                )
                res.status(200).json(updatedPost) 
            } catch(err) {
                res.status(500).json(err) 
            }
        } else {
            res.status(401).json("You can only update your posts!")  
        }
    } catch(err) {
        res.status(500).json(err)  
    }   
})

//DELETE POST By Id
router.delete("/:id", async(req, res) => { //if user id next() i req, res as per code body
    try{
        const post = await Post.findById(req.params.id) //**should be req.params.id not _.id
        if(post.username === req.body.username){ 

            try {
                await post.delete()  
                res.status(200).json("Post has been deleted...") 
            } catch(err){
                res.status(500).json(err) 
            }  
        } else {
            res.status(401).json("You can only delete your post!")  
        }    
    } catch(err) {
        res.status(500).json(err) 
    }
})  

//GET POST by Id
router.get("/:id", async (req, res) => {
    try{
        const post = await Post.findById(req.params.id) 
        res.status(200).json(post)
    } catch(err){
        res.status(500).json(err)
    }
})

//GET ALL POST by Username or Category
router.get("/", async (req, res) => {
    const username = req.query.user  
    const catName = req.query.cat  
    const imageUrl = '' 

    //res.status(200).json({savedPost, file: req.file})

    // try {
    //     if(req.file){
    //         //imageUrl = req.file.map(imgFile => {img: imgFile.filename})
    //         imageUrl = req.file.filename
    //         //res.status(200).json({img: imageUrl.filename})
    //         res.send(imageUrl)

    //         console.log(imageUrl)
    //     } 
    // }catch(err) {
    //     console.log(err)
    // }

    try {
        let posts
        if(username) {  
             posts = await Post.find({ username })  //find category by username
         } else if(catName){  //but if category select...
            posts = await Post.find({ 
                categories: { 
                    $in:[catName], //if catName exists "in" categories assign to posts 
                },
            })
        } else {  
            posts = await Post.find() //other get all posts no matter category
        }
        res.status(200).json(posts)
    } catch(err){
        res.status(500).json(err)
    }
})

// router.get("/upload", async (req, res) => {
//     let urlImages = req.files.map(file => {img: file.location})
// })
        
module.exports = router