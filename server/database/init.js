const express = require('express');
const router = express.Router();
const models = require('../database/models.js');
const Sequelize = require('sequelize');
const {Unit, ProductType} = require('../enums.js');


const products =  [{
    "id": "0135354",
    "name": "Mozzarella Galbani", 
    "brand": "Galbani",
    "package_size": 125,
    "package_size_unit": "G",
    "barcode": "456123154989", 
    "parents": [{name: "Mozzarella"}], 
    "costs":{
        "Kaufland": 23.9,
        "Tesco": 27.90,
        "Globus": 31.90
    }},{
    "id": "0135754",
    "name": "Clever Mozzarella", 
    "brand": "Clever",
    "package_size": 125,
    "package_size_unit": "G",
    "barcode": "556123154989", 
    "parents": [{name: "Mozarella"}], 
    "costs":{
        "Tesco": 23.9,
    }    
}];


/*
const categories =  [{name: "Syry"}, {name: "Sunky"}, {name: "Tofu"}];
const productGroups = [{name: "Mozarella"}, {name: "Slanina"}, {name: "Okurka"}]
*/

async function findOrCreateGroup(group){
    const [product, created] = await models.product.findOrCreate({
        where: {name: group.name, type: ProductType.GROUP},//defaults: {}
        defaults: {
            base_amount: group.base_amount,
            base_amount_unit: group.base_amount_unit,
        }
    });
    let product_group;
    if (created){
        product_group = await models.product_group.create({
            id: product.id
        });
        await product_group.setProduct(product);
    }else{
        product_group = await product.getProductGroup();
    }
    return product_group;
}


async function addConcreteProduct(productToAdd){
    console.log(productToAdd);
    const [product, productCreated] = await models.product.findOrCreate({
        where: {name: productToAdd.name, type: ProductType.CONCRETE},
    });
    let concrete_product;
    if (productCreated){
        concrete_product = await models.concrete_product.create({
            id: product.id,
            brand: productToAdd.brand,
            barcode: productToAdd.barcode,
            package_size: productToAdd.package_size,
            package_size_unit: productToAdd.package_size_unit
        });
        await concrete_product.setProduct(product);
    }else{
        concrete_product = await product.getConcreteProduct();
        concrete_product.brand = productToAdd.brand;
        concrete_product.barcode = productToAdd.barcode;
        concrete_product.package_size = productToAdd.package_size;
        concrete_product.package_size_unit = productToAdd.package_size_unit;
        await concrete_product.save();
    }

    console.log(product);
    const currentGroups =  await product.getGroup();
    const currentGroupIds = currentGroups.map(group => group.id);
    console.log(currentGroupIds);

    for (const groupToAdd of productToAdd.parents){
        console.log(groupToAdd);
        let group = await findOrCreateGroup(groupToAdd)
        console.log(group.id);
        if (!currentGroupIds.includes(group.id)){
            await product.addGroup(group);
        }
    }

    const currentOffers = await concrete_product.getOffers({include: [{
        model: models.shop, 
        as: 'shop',
        attributes: ['id', 'name']
    }]});

    console.log(currentOffers);
    for (const shopName in productToAdd.costs){
        console.log(shopName);
        const [shop, shopCreated] = await models.shop.findOrCreate({
            where: {name: shopName}
        });

        let currentOffer = currentOffers.find(offer => offer.shop.name === shopName);
        if (!currentOffer){
            await models.offer.create({
                type: 'N',
                cost: productToAdd.costs[shopName],
                valid: true,
                product_id: product.id,
                shop_id: shop.id
            });
        }else{
            currentOffer.valid = true;
            currentOffer.cost = productToAdd.costs[shopName];
            await currentOffer.save();
        }
    }
}


async function run(){
    models.concrete_product.destroy({where: {barcode: null}});
    models.product.destroy({where: {type: "P"}});


    for (const productToAdd of products){
        addConcreteProduct(productToAdd);
    }
}


run();
