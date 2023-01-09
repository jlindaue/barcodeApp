var DataTypes = require("sequelize").DataTypes;
var _category = require("./category");
var _client = require("./client");
var _client_memberships = require("./client_memberships");
var _client_shops = require("./client_shops");
var _membership = require("./membership");
var _note = require("./note");
var _offer = require("./offer");
var _product = require("./product");
var _products_relations = require("./products_relations");
var _shop = require("./shop");
var _shopping = require("./shopping");
var _shopping_item = require("./shopping_item");
var _shopping_list_item = require("./shopping_list_item");
var _synonym = require("./synonym");

function initModels(sequelize) {
  var shop = _shop(sequelize, DataTypes);
  var membership = _membership(sequelize, DataTypes);
  var category = _category(sequelize, DataTypes);
  var client = _client(sequelize, DataTypes);
  var client_memberships = _client_memberships(sequelize, DataTypes);
  var client_shops = _client_shops(sequelize, DataTypes);
  var note = _note(sequelize, DataTypes);
  var product = _product(sequelize, DataTypes);
  var offer = _offer(sequelize, DataTypes);
  var products_relations = _products_relations(sequelize, DataTypes);
  var shopping = _shopping(sequelize, DataTypes);
  var shopping_item = _shopping_item(sequelize, DataTypes);
  var shopping_list_item = _shopping_list_item(sequelize, DataTypes);
  var synonym = _synonym(sequelize, DataTypes);

  product.belongsToMany(product, { as: 'product_id_products', through: products_relations, foreignKey: "category_id", otherKey: "product_id" });
  product.belongsToMany(product, { as: 'category_id_products', through: products_relations, foreignKey: "product_id", otherKey: "category_id" });
  product.belongsTo(category, { as: "category", foreignKey: "category_id"});
  category.hasMany(product, { as: "products", foreignKey: "category_id"});
  product.belongsTo(category, { as: "subcategory", foreignKey: "subcategory_id"});
  category.hasMany(product, { as: "subcategory_products", foreignKey: "subcategory_id"});
  product.belongsTo(category, { as: "subsubcategory", foreignKey: "subsubcategory_id"});
  category.hasMany(product, { as: "subsubcategory_products", foreignKey: "subsubcategory_id"});
  client_memberships.belongsTo(client, { as: "client", foreignKey: "client_id"});
  client.hasMany(client_memberships, { as: "client_memberships", foreignKey: "client_id"});
  client_shops.belongsTo(client, { as: "client", foreignKey: "client_id"});
  client.hasMany(client_shops, { as: "client_shops", foreignKey: "client_id"});
  note.belongsTo(client, { as: "client", foreignKey: "client_id"});
  client.hasMany(note, { as: "notes", foreignKey: "client_id"});
  shopping.belongsTo(client, { as: "client", foreignKey: "client_id"});
  client.hasMany(shopping, { as: "shoppings", foreignKey: "client_id"});
  shopping_list_item.belongsTo(client, { as: "client", foreignKey: "client_id"});
  client.hasMany(shopping_list_item, { as: "shopping_list_items", foreignKey: "client_id"});
  client_memberships.belongsTo(membership, { as: "membership", foreignKey: "memberships_id"});
  membership.hasMany(client_memberships, { as: "client_memberships", foreignKey: "memberships_id"});
  offer.belongsTo(membership, { as: "membership", foreignKey: "membership_id"});
  membership.hasMany(offer, { as: "offers", foreignKey: "membership_id"});
  shopping_item.belongsTo(offer, { as: "offer", foreignKey: "offer_id"});
  offer.hasMany(shopping_item, { as: "shopping_items", foreignKey: "offer_id"});
  offer.belongsTo(product, { as: "product", foreignKey: "product_id"});
  product.hasMany(offer, { as: "offers", foreignKey: "product_id"});
  shopping_list_item.belongsTo(product, { as: "product", foreignKey: "product_id"});
  product.hasMany(shopping_list_item, { as: "shopping_list_items", foreignKey: "product_id"});
  synonym.belongsTo(product, { as: "product", foreignKey: "product_id"});
  product.hasMany(synonym, { as: "synonyms", foreignKey: "product_id"});
  client_shops.belongsTo(shop, { as: "shop", foreignKey: "shops_id"});
  shop.hasMany(client_shops, { as: "client_shops", foreignKey: "shops_id"});
  membership.belongsTo(shop, { as: "shop", foreignKey: "shop_id"});
  shop.hasMany(membership, { as: "memberships", foreignKey: "shop_id"});
  offer.belongsTo(shop, { as: "shop", foreignKey: "shop_id"});
  shop.hasMany(offer, { as: "offers", foreignKey: "shop_id"});
  shopping_item.belongsTo(shopping, { as: "shopping", foreignKey: "shopping_id"});
  shopping.hasMany(shopping_item, { as: "shopping_items", foreignKey: "shopping_id"});
  product.belongsToMany(product, { as: "subproducts", through: "products_relations", foreignKey: "category_id", otherKey: "product_id"});
  product.belongsToMany(product, { as: "groups", through: "products_relations", foreignKey: "product_id", otherKey: "category_id"});


  return {
    category,
    client,
    client_memberships,
    client_shops,
    membership,
    note,
    offer,
    product,
    products_relations,
    shop,
    shopping,
    shopping_item,
    shopping_list_item,
    synonym,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
