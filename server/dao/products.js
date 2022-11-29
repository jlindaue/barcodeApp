const models = require('../database/models.js');
const {ProductType} = require('../enums.js');


async function findOrCreateGroup(group){
    const [product, created] = await models.product.findOrCreate({
        where: {name: group.name, type: ProductType.GROUP},//defaults: {}
        defaults: {
            base_amount: group.base_amount,
            base_amount_unit: group.base_amount_unit,
            category_id: group.category_id
        }
    });
    return product;
}

async function findOrCreateCategory(name){
    const [category, created] = await models.category.findOrCreate({
        where: {name: name}
    });
    return category;
}

async function addConcreteProduct(productToAdd){
    console.log(productToAdd);
    productToAdd.name = productToAdd?.name?.toLowerCase();
    productToAdd.category = productToAdd?.category?.toLowerCase();
    productToAdd.parents.forEach(parent => parent.name = parent?.name?.toLowerCase())
    console.log(productToAdd);
    let category = await findOrCreateCategory(productToAdd.category)
    const [product, productCreated] = await models.product.findOrCreate({
        where: {name: productToAdd.name, type: ProductType.CONCRETE},
        defaults: {
            brand: productToAdd.brand,
            barcode: productToAdd.barcode,
            package_size: productToAdd.package_size,
            package_size_unit: productToAdd.package_size_unit,
            category_id: category.id
        }
    });
    if (!productCreated){
        product.brand = productToAdd.brand;
        product.barcode = productToAdd.barcode;
        product.package_size = productToAdd.package_size;
        product.package_size_unit = productToAdd.package_size_unit;
        product.category_id = category.id;
        await product.save();
    }

    console.log(product);
    const currentGroups =  await product.getGroups();
    const currentGroupIds = currentGroups.map(group => group.id);
    console.log(currentGroupIds);

    for (const groupToAdd of productToAdd.parents){
        console.log(groupToAdd);
        groupToAdd.category_id = category.id;
        let group = await findOrCreateGroup(groupToAdd)
        console.log(group.id);
        if (!currentGroupIds.includes(group.id)){
            await product.addGroups(group);
        }
    }

    const currentOffers = await product.getOffers({include: [{
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


module.exports = {addConcreteProduct, findOrCreateCategory, findOrCreateGroup}