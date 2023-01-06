const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('products_relations', {
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'product',
        key: 'id'
      }
    },
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'product',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'products_relations',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "products_relations_pkey",
        unique: true,
        fields: [
          { name: "category_id" },
          { name: "product_id" },
        ]
      },
    ]
  });
};
