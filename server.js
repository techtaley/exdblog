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

mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false        
    })
    .then(console.log("Connect to MongoDB"))
    .catch((err) => console.log(err))

// //*** AWS3 test local code - start ***

//MULTER
//multer is used in the test to upload images directly in the api/server folder in /images
//in production we can use firebase, aws3 to upload images and 
//we can create a separate route to upload (s3.js) instead of in server.js

const multer = require("multer") 

const storage = multer.diskStorage({
    destination: (req, file, cb) => {  //destination to store image - cb takes care of errors
        cb(null, "images")  //if error then null, if no errors files go in images/server folder
    },
    filename: (req, file, cb) => { //filename - the name from name field in client
        cb(null, req.body.name) //if error then null, if no error name taken from req.body.name on client
    }, 
}) 

const upload = multer({ storage: storage })  //config to upload of storage, created above

app.post("/api/upload", upload.single("file"), (req, res) => {  //uploading file named "file"
    const file = req.file  //FE requests the file
    console.log(file)
    res.send(file)   //FE sends the file back to the client
    req.status(200).json("File has been uploaded.") //  
})

// //*** AWS3 test local code - end ***    

// //step 2.  Upload images from client-side to AWS3
// const aws = require('aws-sdk')

// const bucket = process.env.AWS_BUCKET_NAME
// const region = process.env.AWS_BUCKET_REGION
// const accessKeyId = process.env.AWS_ACCESS_KEY_ID
// const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY  

// const s3 = new aws.S3({
//     accessKeyId,
//     secretAccessKey,
//     region,
// })  
    
// const multer = require("multer") 
// const multerS3 = require("multer-s3")   

// const fileFilter = (req, file, cb) => {
//     if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
//         cb(null, true)
//     } else {
//         cb(null, false)
//     }
// }

// const upload = multer({
//     storage: multerS3({
//         s3: s3,
//         bucket: process.env.AWS_BUCKET_NAME,            
//         acl: "public-read",                        
//         metadata: function (req, file, cb) {
//         cb(null, {fieldName: file.fieldname});
//         },
//         fileFilter: fileFilter,
//         limits: {
//             fileSize: 1024 * 1024 * 5 // only allows 5 MB files
//         },    
//         key: function (req, file, cb) {  //name of file taken from originalname and saved as key
//             console.log(file)
//             cb(null, file.originalname )  //if no original name then error is null
//             //cb(null, Date.now() + '-' + file.originalname)
//             //cb(null, Date.now().toString())
            
//         }
//     })
// })

// app.post("/api/upload", upload.single("file"), (req, res) => {  //update file to aws3 based on multer
//     const file = req.file  //FE requests the file
//     console.log(file)
//     res.send(file)   //FE sends the file back to the client
//     //req.status(200).json("File has been uploaded.") //
// })

//endpoints
app.use("/api/auth", authRoute)   
app.use("/api/posts", postRoute) 
app.use("/api/categories", categoryRoute) 
app.use("/api/users", userRoute)

app.use("/images", express.static(path.join(__dirname, "/images")))  //makes the images folder public

app.use(express.static(path.join(__dirname, '/client/build'))) 

app.get('*', (req, res) => {  
        res.sendFile(path.join(__dirname, '/client', 'build', 'index.html'))
})

//app.use(cors())

//scheme://hostname:port - no issue if one origin has the same origin as requested origin
//but if client (https://expandivedesigns/exdblog), tries to access data from API (http://localhost:4000/api), 
//we must set cors to allow client to access this origin (http://localhost:4000/api)
//BE uses CORS to browser I give permission to FE to Fetch data from your BE 'http://localhost:4000/api'
//in order to grab posts from server and display on FE

//permitted API/Endpoints
//this give client permission to access resources at this origin (scheme,host, and port)

//use for local app
// app.use(cors({
//      credentials: true, 
//      origin: ['http://localhost:4000/api']  
// }))  

//use for heroku app
// app.use(cors({
//     credentials: true, 
//     origin: ['https://exdblog.herokuapp.com/api']  
// }))  

app.listen(PORT, () => console.log(`Server is up and running ${PORT}`))