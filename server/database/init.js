const express = require('express');
const router = express.Router();
const models = require('../database/models.js');
const Sequelize = require('sequelize');
const {Unit, ProductType} = require('../enums.js');
const category = require('./models/category.js');
const {addConcreteProduct} = require('../dao/products.js')


const groups = [
    {
        "id": "0135354",
        "name": "Mozzarella", 
        "brand": "Galbani",
        "package_size": 125,
        "package_size_unit": "G",
        "barcode": "456123154989", 
        "category": "Syry",
        "subcategory": "Mozzarella",
        "subsubcategory": "",
        "parents": [], 
        "costs":{}
    }
]

const products =  [{
    "id": "0135354",
    "name": "Mozzarella Galbani", 
    "brand": "Galbani",
    "package_size": 125,
    "package_size_unit": "G",
    "barcode": "456123154989", 
    "category": "Syry",
    "subcategory": "Mozzarella",
    "subsubcategory": "",
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
    "category": "Syry", 
    "subcategory": "Mozzarella",
    "subsubcategory": "",
    "parents": [{name: "Mozarella"}], 
    "costs":{
        "Tesco": 24.9,
    }    
}];


/*
const categories =  [{name: "Syry"}, {name: "Sunky"}, {name: "Tofu"}];
const productGroups = [{name: "Mozarella"}, {name: "Slanina"}, {name: "Okurka"}]
*/


async function run(){
    models.product.destroy({where: {barcode: null}});
    models.product.destroy({where: {type: "P"}});


    for (const productToAdd of products){
        addConcreteProduct(productToAdd);
    }

    for (const productToAdd of products){
        addPro(productToAdd);
    }
}


run();
