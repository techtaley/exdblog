const express = require('express')
const app = express()
const dotenv = require("dotenv")
const cors = require("cors")
const mongoose = require('mongoose')

const authRoute =  require('./routes/auth')
const userRoute =  require('./routes/users')
const postRoute =  require('./routes/posts')
const categoryRoute = require('./routes/categories')
const multer = require("multer") 
//const multerS3 = require("multer") 

const router = require("express").Router()  
const User = require("./models/User")
const Post = require("./models/Post")
const bcrypt = require('bcrypt')
const { Router } = require("express")

const path = require("path") 
//path used in conjunction with multer to store images

dotenv.config()

//MIDDLEWARE
app.use(express.json())
app.use("/images", express.static(path.join(__dirname, "/images")))

// DATABASE - connectedDB()
mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,  //to correct error with mongoose version
        useFindAndModify: false        
    })
    .then(console.log("Connect to MongoDB"))
    .catch((err) => console.log(err))

    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, "images")  //cb takes care of errors, and upload file "images" folder
        },
        filename: (req, file, cb) => {
            cb(null, req.body.name)  //cb takes care of errors and uploads file using filename
        }, 
    })

//old middleware for storage
const upload = multer({ storage: storage })  //multer generates a code for the name storage: storage

//***AWS S3 Code start***
// const s3 = new aws.S3({
//     region,
//     accessKeyId,
//     secretAccessKey
//   })
  
//new AWS3 middleware for upload and storage in awss3
// const uploadS3 = multer({
//   storage: multerS3({
//     s3: s3,
//     bucket: 'exdblog-images',            
//     acl: "public-read",                        
//     metadata: function (req, file, cb) {
//       cb(null, {fieldName: file.fieldname});
//     },
//     key: function (req, file, cb) {
//       cb(null, Date.now().toString())
//     }
//   })
// })

// //new AWS3 - get images from awsS3 bucket

// // app.get('images/:key', (req, req) => {
// //   const key = req.params.key
// //   const readStream = getFileStream(key)

// //   readStream.pipe(res)
// // })

// //post images to aws
// //const upload = multer({ dest: "images/" })

// //****AWS3 code ends****

app.post("/api/upload", upload.single("file"), (req, res) => {
    res.status(200).json("File has been uploaded...")
})

//server endpoints using routes 
app.use("/api/auth", authRoute)   
app.use("/api/posts", postRoute) 
app.use("/api/categories", categoryRoute) 
app.use("/api/users", userRoute) 

app.use(express.static(path.join(__dirname, '/client/build'))) 

app.get('*', (req,res) => {  
        res.sendFile(path.join(__dirname, '/client', 'build', 'index.html'))
})

app.use(cors({
    credentials: true,  
    origin: ['https://exdblog.herokuapp.com']    
}))  

app.listen(process.env.PORT || 4000, () => console.log(`Server is up and running.`))