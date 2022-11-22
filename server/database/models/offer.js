const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('offer', {
    type: {
      type: DataTypes.STRING(1),
      allowNull: false
    },
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    cost: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    id_in_shop: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    valid: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'concrete_product',
        key: 'id'
      }
    },
    shop_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'shop',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'offer',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "offer_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
