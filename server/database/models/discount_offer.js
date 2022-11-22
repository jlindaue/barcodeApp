const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('discount_offer', {
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
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'offer',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'discount_offer',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "discount_offer_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
