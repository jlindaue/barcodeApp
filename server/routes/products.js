const express = require('express');
const router = express.Router();
const models = require('../database/models.js');
const Sequelize = require('sequelize');



router.get('/products/:product', async (req,res)=>{
    console.log(req.params.product);
    const product = await models.product.findByPk(id);
	if (product) {
		res.status(200).json(product);
	} else {
		res.status(404).send('404 - Not found');
	}
})



router.get('/products', async (req,res)=>{
    console.log(req.query);
    let results;

    if (req?.query?.q){
        const query = req?.query?.q;
        //results = results.filter(product => product.name.toLowerCase().startsWith(req.query.q.toLowerCase()))
        results = await models.concrete_product.findAll({
            limit: 5,
            //attributes: [[Sequelize.col('"id_product"."name"'), "name"], 'id'],
            include: [{ 
                model: models.product, 
                as: 'product', 
                attributes: ["name"],
                where: { name: { [Sequelize.Op.iLike]: query + '%' }},
                include: [{
                    model: models.product_group, 
                    as: 'group',
                    include: [{
                        model: models.product, 
                        as: 'product',
                        attributes: ['name']
                    }],
                    attributes: ['id']
                }]
            },{
                model: models.offer, 
                as: 'offers', 
                attributes: ["cost"],
                include: [{
                    model: models.shop, 
                    as: 'shop',
                    attributes: ['name']
                }],
            }],
            //    where: { name: { [Sequelize.Op.iLike]: query + '%' }}}],
            //where: { "$product.name$": { [Sequelize.Op.iLike]: query + '%' }},
            //order: '"volume" DESC'
          });
    }else{
        results = await models.concrete_product.findAll({
            include: [{ model: models.product, as: 'concreteProduct' }],
            limit: 5
        });
    }

    console.log(results)

    results = results.map(r => {return {
        id: r.id, 
        name: r.product.name, 
        parents: r.product.group.map(group => {return {
            id: group.id,
            name: group.product.name
        }}),
        costs: r.offers.reduce((obj, offer) => ({ ...obj, [offer.shop.name]: offer.cost}), {})
    }});

    console.log(JSON.stringify(results));
    res.status(200).json(results);
})


//TODO post
router.post('/products', async (req,res)=>{
    console.log(req.body);
    await models.concrete_product.create(req.body);
    res.status(201).end();
})


module.exports = router;