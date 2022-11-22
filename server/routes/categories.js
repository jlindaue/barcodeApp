const express = require('express');
const router = express.Router();
const models = require('../database/models.js');
const Sequelize = require('sequelize');


router.get('/categories', (req,res)=>{
    res.status(200).json(categories);
})

module.exports = router;