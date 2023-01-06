const models = require('../database/models.js');
const {ProductType} = require('../enums.js');


async function findOrCreateGroup(group){
    const [product, created] = await models.product.findOrCreate({
        where: {name: group.name, type: ProductType.GROUP},//defaults: {}
        defaults: {
            base_amount: group.base_amount,
            base_amount_unit: group.base_amount_unit,
            category_id: group.category_id,
            subcategory_id: group.subcategory_id,
            subsubcategory_id: group.subsubcategory_id
        }
    });
    return product;
}

async function findOrCreateCategory(name){
    if (name === "" || name === undefined) return null;
    const [category, created] = await models.category.findOrCreate({
        where: {name: name}
    });
    return category;
}

async function addConcreteProduct(productToAdd){
    console.log(productToAdd);
    productToAdd.name = productToAdd?.name?.toLowerCase();
    productToAdd.category = productToAdd?.category?.toLowerCase();
    productToAdd.subcategory = productToAdd?.subcategory?.toLowerCase();
    productToAdd.subsubcategory = productToAdd?.subsubcategory?.toLowerCase();
    productToAdd.parents.forEach(parent => parent.name = parent?.name?.toLowerCase())
    console.log(productToAdd);
    let category = await findOrCreateCategory(productToAdd.category)
    let subcategory = await findOrCreateCategory(productToAdd.subcategory)
    let subsubcategory = await findOrCreateCategory(productToAdd.subsubcategory)
    const [product, productCreated] = await models.product.findOrCreate({
        where: {name: productToAdd.name, type: ProductType.CONCRETE},
        defaults: {
            brand: productToAdd.brand,
            barcode: productToAdd.barcode,
            package_size: productToAdd.package_size,
            package_size_unit: productToAdd.package_size_unit,
            category_id: category.id,
            subcategory_id: subcategory.id,
            subsubcategory_id: subsubcategory.id
        }
    });
    if (!productCreated){
        product.brand = productToAdd.brand;
        product.barcode = productToAdd.barcode;
        product.package_size = productToAdd.package_size;
        product.package_size_unit = productToAdd.package_size_unit;
        await product.save();
        await product.setCategory(category);
        await product.setSubcategory(subcategory);
        await product.setSubsubcategory(subsubcategory);
    }

    console.log(product);
    await product.setGroups([]);

    for (const groupToAdd of productToAdd.parents){
        //console.log(groupToAdd);
        groupToAdd.category_id = category.id;
        groupToAdd.subcategory_id = subcategory.id;
        groupToAdd.subsubcategory_id = subsubcategory.id;
        let group = await findOrCreateGroup(groupToAdd)
        //console.log(group.id);
        await product.addGroup(group);
    }

    const currentOffers = await product.getOffers({include: [{
        model: models.shop, 
        as: 'shop',
        attributes: ['id', 'name']
    }]});

    //console.log(currentOffers);
    for (const shopName in productToAdd.costs){
        //console.log(shopName);
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