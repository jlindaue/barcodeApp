const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('shopping_list_item', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    amount: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    amount_unit: {
      type: DataTypes.STRING(4),
      allowNull: false
    },
    last_buy_date: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    max_cost: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    previous_purchases_count: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    priority: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    state: {
      type: DataTypes.STRING(4),
      allowNull: false
    },
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'product',
        key: 'id'
      }
    },
    client_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'client',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'shopping_list_item',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "shopping_list_item_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
