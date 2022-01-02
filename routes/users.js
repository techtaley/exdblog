const router = require("express").Router()
const User = require("./../models/User")
const Post = require("./../models/Post")
const bcrypt = require('bcrypt')

//const authen = require("../routes/middleware/authen")

//GET USER by ID  localhost:4000/users
router.get("/:id", async (req, res) => {
    try{
        const user = await User.findById(req.params.id)
        const { password, ...others } = user._doc
        res.status(200).json(others)
    } catch(err){
        res.status(500).json(err)
    }
})

//UPDATE USER BY ID
router.put("/:id", async(req, res) => {
    if (req.body.userId === req.params._id){  // **should be req.params._id
        if(req.body.password){  
            const salt = await bcrypt.genSalt(10)
            req.body.password = await bcrypt.hash(req.body.password, salt)
        }

        try {
            const updatedUser = await User.findByIdAndUpdate(req.params.id, { 
                $set: req.body,  
            })

            res.status(200).json(updatedUser)
        } catch(err){
            res.status(500).json(err)
        }    
    } else {  
        res.status(401).json("You can only update your account!")
    }
})

//DELETE USER BY ID
router.delete("/:id", async(req, res) => {
    if (req.body.id === req.params._id){  //** should be req.params._id

        try{
            const user = await User.findById(req.params.id)

            try {
                await Post.deleteMany({username: user.username})  
                await User.findByIdAndDelete(user)  
                res.status(200).json("User has been deleted...")
            } catch(err){
                res.status(500).json(err)  
            } 
        } catch(err) {
            res.status(404).json("User not found!") 
        }   
    } else {
        res.status(403).json("You can only delete your account!")
    } 
})   
        
module.exports = router