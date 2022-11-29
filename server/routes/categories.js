const express = require('express');
const router = express.Router();
const models = require('../database/models.js');
const Sequelize = require('sequelize');


router.get('/categories', async (req,res)=>{
    let results;
    if (req?.query?.q){
        const query = req.query.q;
        results = await models.category.findAll({
            limit: 5,
            attributes: ["id", "name"],
            where: { name: { [Sequelize.Op.iLike]: query.toLowerCase() + '%' }}
        })
    }else{
        results = await models.category.findAll({
            limit: 5
        });
    }
    res.status(200).json(results);
})

module.exports = router;