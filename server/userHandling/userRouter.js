//importing modules
const express = require('express')
const userController = require('./userController')
const { signup, login } = userController
const userAuth = require('./userAuth')
const models = require('../database/models.js');
const Client = models.client;
const jwt = require("jsonwebtoken");

const router = express.Router()

//signup endpoint
//passing the middleware function to the signup
router.post('/signup', userAuth.saveUser, signup)

//login route
router.post('/login', login )


router.use(async(req,res,next)=>{
  try {
    let token = req.cookies.jwt;
    console.log("Token: ", token)
    let decoded = jwt.verify(token,process.env.SECRET);
    console.log(decoded)
    let user = await Client.findOne({where:{id : decoded.id},attributes:{exclude:["password"]}});
    if(user === null){
        res.status(404).json({'msg':"User not found"});
    }
    next();
  } catch(err){
    console.log(err)
    res.status(401).json({"msg":"Couldnt Authenticate"});
  }
}); 

module.exports = router