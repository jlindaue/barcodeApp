const express = require('express');
const router = express.Router();
const models = require('../database/models.js');
const Sequelize = require('sequelize');
const {addConcreteProduct} = require('../dao/products.js')



/*router.get('/products/:product', async (req,res)=>{
    console.log(req.params.product);
    const product = await models.product.findByPk(id, {
        attributes: ["id", "name", "barcode"],
        where: { name: { [Sequelize.Op.iLike]: query + '%' }},
        include: [{
            model: models.product, 
            as: 'groups',
            attributes: ['id', 'name']
        },{
            model: models.category, 
            as: 'category',
            attributes: ['id', 'name']
        },{
            model: models.category, 
            as: 'subcategory',
            attributes: ['id', 'name']
        },{ 
            model: models.offer, 
            as: 'offers', 
            attributes: ["cost"],
            include: [{
                model: models.shop, 
                as: 'shop',
                attributes: ['name']
            }],
        }]
    });
	if (product) {
        const result = {
            id: product.id, 
            name: product.name, 
            barcode: product.barcode,
            parents: r.groups.map(group => {return {
                id: group.id,
                name: group.name
            }}),
            category: r.category.name,
            subcategory: r.subcategory ? r.subcategory.name : null,
            costs: r.offers.reduce((obj, offer) => ({ ...obj, [offer.shop.name]: offer.cost}), {})
        }
		res.status(200).json(product);
	} else {
		res.status(404).send('404 - Not found');
	}
})*/



router.get('/products', async (req,res)=>{
    console.log(req.query);
    let results;

    if (req?.query?.q){
        const query = req?.query?.q;
        //results = results.filter(product => product.name.toLowerCase().startsWith(req.query.q.toLowerCase()))
        results = await models.product.findAll({
            limit: 5,
            //attributes: [[Sequelize.col('"id_product"."name"'), "name"], 'id'],
            model: models.product, 
            attributes: ["id", "name", "barcode"],
            where: { name: { [Sequelize.Op.iLike]: query.toLowerCase() + '%' }},
            include: [{
                model: models.product, 
                as: 'groups',
                attributes: ['id', 'name']
            },{
                model: models.category, 
                as: 'category',
                attributes: ['id', 'name']
            },{
                model: models.category, 
                as: 'subcategory',
                attributes: ['id', 'name']
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
        results = await models.product.findAll({
            limit: 5
        });
    }

    console.log(results)

    results = results.map(r => {return {
        id: r.id, 
        name: r.name, 
        barcode: r.barcode,
        parents: r.groups.map(group => {return {
            id: group.id,
            name: group.name
        }}),
        category: r.category.name,
        subcategory: r.subcategory ? r.subcategory.name : null,
        costs: r.offers.reduce((obj, offer) => ({ ...obj, [offer.shop.name]: offer.cost}), {})
    }});

    console.log(JSON.stringify(results));
    res.status(200).json(results);
})


router.post('/products', async (req,res)=>{
    console.log(req.body);
    await addConcreteProduct(req.body)
    res.status(201).end();
})


module.exports = router;