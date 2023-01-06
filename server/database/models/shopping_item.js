const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('shopping_item', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    amount: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    confirmed: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    offer_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'offer',
        key: 'id'
      }
    },
    shopping_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'shopping',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'shopping_item',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "shopping_item_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
