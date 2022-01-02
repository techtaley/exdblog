// const jwt = require('jsonwebtoken')
// const mySecretToken = process.env.TOKEN_SECRET

// const authen = (req, res, next) => {
//     const cookie = req.headers.authorization 

//     if(!cookie) res.status(401).json({ msg: "Unable to validate credentials."}) 

//     try {
//         const decoded = jwt.verify(cookie, "jwtSecretToken")  

//         req.user = decoded
//         next()
//     } catch(e){
//         res.status(400).json({ msg: "You are unauthorized."})
//     }    
// } 

// module.exports = authen