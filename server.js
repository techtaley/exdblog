//const s3 = require('./s3')
const express = require('express')
const app = express()
const dotenv = require("dotenv")
const cors = require("cors")
const mongoose = require('mongoose')

const authRoute =  require('./routes/auth')
const userRoute =  require('./routes/users')
const postRoute =  require('./routes/posts')
const categoryRoute = require('./routes/categories')

const router = require("express").Router()  
const User = require("./models/User")
const Post = require("./models/Post")
const bcrypt = require('bcrypt')
const { Router } = require("express")
const path = require("path") 

dotenv.config()

app.use(express.json())

const PORT = process.env.PORT || 4000

mongoose.connect(process.env.MONGODB_URI || dbURL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false        
    })
    .then(console.log("Connect to MongoDB"))
    .catch((err) => console.log(err))

// //*** AWS3 test local code - start ***

// //MULTER
// //multer is used in the test to upload images directly in the api/server folder in /images
// //in production we can use firebase, aws3 to upload images and 
// //we can create a separate route to upload (s3.js) instead of in server.js

// const multer = require("multer") 

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {  //destination to store image - cb takes care of errors
//         cb(null, "images")  //if error then null, if no errors files go in images/server folder
//     },
//     filename: (req, file, cb) => { //filename - the name from name field in client
//         cb(null, req.body.name) //if error then null, if no error name taken from req.body.name on client
//     }, 
// }) 

// const upload = multer({ storage: storage })  //config to upload of storage, created above

// //*** AWS3 test local code - end *** 


//*** AWS3 Clous storage - start *** 

//step 2.  Upload images from client-side to AWS3
//const aws = require('aws-sdk')  //use '@aws-sdk/client-s3' instead
const { S3Client } = require('@aws-sdk/client-s3')
const bucket = process.env.AWS_BUCKET_NAME
const region = process.env.AWS_BUCKET_REGION
const accessKeyId = process.env.AWS_ACCESS_KEY_ID
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY  

//const s3 = new aws.S3({
const s3 = new S3Client({   
    accessKeyId,
    secretAccessKey,
    region,
})  
    
const multer = require("multer") 
const multerS3 = require("multer-s3")   

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true)
    } else {
        cb(null, false)
    }
}

const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: process.env.AWS_BUCKET_NAME,            
        acl: "public-read",                        
        metadata: function (req, file, cb) {
        cb(null, {fieldName: file.fieldname});
        },
        fileFilter: fileFilter,
        limits: {
            fileSize: 1024 * 1024 * 5 // only allows 5 MB files
        },    
        key: function (req, file, cb) {  //name of file taken from originalname and saved as key
            console.log(file)
            //cd(null, Data.now().toString()) //multer recommendation
            cb(null, file.originalname )  //if no original name then error is null
        }
    })
})

// //*** AWS3 Clous storage - end *** 

//update file to aws3 based on multer configs
app.post("/api/upload", upload.single("file"), (req, res) => {  
    const file = req.file  //FE requests the file
    console.log(file)
    res.send(file)   //FE sends the file back to the client
})

//REST API endpoints
app.use("/api/auth", authRoute)   
app.use("/api/posts", postRoute) 
app.use("/api/categories", categoryRoute) 
app.use("/api/users", userRoute)

app.use(express.static(path.join(__dirname, '/client/build'))) 

app.get('*', (req, res) => {  
    res.sendFile(path.join(__dirname, '/client/build', 'index.html'))
})

//const PORT = process.env.PORT || 4000 ==> look inside the .env file for env variables and if nothing use 4000
app.listen(PORT, () => console.log(`https://exdblog.onrender.com/api/posts Server is up and running ${PORT}`))

//LOCAL TESTING
//app.listen(PORT, () => console.log(`Server is up and running http://localhost:${PORT}/api/posts`))
//app.listen(PORT, () => console.log(`Server is up and running http://localhost:${PORT}/api/users/613f4d153d022e00165e0e26`))  - 1 user 'techtaley'
//app.listen(PORT, () => console.log(`Server is up and running http://localhost:${PORT}/api/categories`))