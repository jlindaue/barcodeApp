const express = require('express');
const router = express.Router();

let products =  [{
    "id": "0135354",
    "name": "Mozzarella Galbani", 
    "category": "Syry", 
    "barcode": "456123154989", 
    "parents": ["Mozzarella"], 
    "costs":{
        "Kaufland": 23.9,
        "Tesco": 27.90,
        "Globus": 31.90
    }},{
    "id": "0135754",
    "name": "Clever Mozzarella", 
    "category": "Syry", 
    "barcode": "556123154989", 
    "parents": ["Mozarella"], 
    "costs":{
        "Tesco": 23.9,
    }    
}];

let categories =  ["Syry", "Sunky", "Tofu"];
let productGroups = ["Mozarella", "Slanina", "Okurka"]

/*
router.get('/products/:product', (req,res)=>{
    console.log(req.params.product);
})
router.get('/products', (req,res)=>{
    console.log(req.query);

    console.log(products)
    if (req?.query?.q){
        products = products.filter(product => product.name.toLowerCase().startsWith(req.query.q.toLowerCase()))
    }
    products = products.slice(0,5);

    console.log(products)
    res.status(200).json(products);
})*/


//TODO post
router.post('/products', (req,res)=>{
    console.log("Body:");
    console.log(req.body);
    res.status(200).end();
})

//TODO
router.get('/categories', (req,res)=>{
    res.status(200).json(categories);
})
router.get('/productGroups', (req,res)=>{
    res.status(200).json(productGroups);
})
router.get('/products', (req,res)=>{
    res.status(200).json(products);
})







module.exports = router;