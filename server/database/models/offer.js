const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('offer', {
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
    offer_end: {
      type: DataTypes.DATE,
      allowNull: true
    },
    offer_start: {
      type: DataTypes.DATE,
      allowNull: true
    },
    percentage_sale: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    type: {
      type: DataTypes.STRING(1),
      allowNull: false
    },
    valid: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    membership_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'membership',
        key: 'id'
      }
    },
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'product',
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
