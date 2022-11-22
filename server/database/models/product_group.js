const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('product_group', {
    id: {
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
    tableName: 'product_group',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "product_group_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
