const express = require('express');
const router = express.Router();
const models = require('../database/models.js');
const Sequelize = require('sequelize');
const { ProductType } = require('../enums.js');

router.get('/productGroups', async (req,res)=>{
    let results;
    if (req?.query?.q){
        const query = req.query.q;
        results = await models.product.findAll({
            limit: 5,
            type: ProductType.GROUP,
            attributes: ["id", "name"],
            where: { name: { [Sequelize.Op.iLike]: query.toLowerCase() + '%' }}
        })
    }else{
        results = await models.product.findAll({
            limit: 5
        });
    }
    res.status(200).json(results);
})

module.exports = router;
