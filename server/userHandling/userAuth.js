//importing modules
const express = require("express");
//Assigning db.users to Client variable
const models = require('../database/models.js');
const Client = models.client;

//Function to check if username or email already exist in the database
//this is to avoid having two users with the same username and email
 const saveUser = async (req, res, next) => {
 //search the database to see if user exist
 try {
   const email = await Client.findOne({
     where: {
        email: req.body.email,
     },
   });
   //if username exist in the database respond with a status of 409
   if (email) {
     return res.json(409).send("email already taken");
   }
   next();
 } catch (error) {
   console.log(error);
 }
};

//exporting module
 module.exports = {
 saveUser,
};