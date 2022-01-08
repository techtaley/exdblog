import axios from 'axios'

export const axiosInstance = axios.create({
    //baseURL: "http://localhost:3000"      
    //baseURL: "https://expansivedesigns.com/exdblog/api/"   
    baseURL: "https://exdblog.herokuapp.com/api/"          //only use /api in heroku
})

//for axiosInstance - "/api" already included for auth, categories, posts, users per server.js
//for axiosInstance - "/api" not used for write, login
//axiosInstance uses the baseURL as client api to post data (without images) to mongoDB  
//axios uses client api at "proxy": "http://localhost:4000/api/" to post image uploads to aws3 - set up in server/packages.js
