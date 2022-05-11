import axios from 'axios'

export const axiosInstance = axios.create({
    baseURL: "https://exdblog.herokuapp.com/api/"          //only use /api in heroku
})

