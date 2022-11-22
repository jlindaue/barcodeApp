const express = require('express');
const router = express.Router();
const models = require('../database/models.js');
const Sequelize = require('sequelize');

router.get('/productGroups', (req,res)=>{
    res.status(200).json(productGroups);
})

module.exports = router;
