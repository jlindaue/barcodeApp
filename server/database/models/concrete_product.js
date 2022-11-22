const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('concrete_product', {
    barcode: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    brand: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    package_size: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    package_size_unit: {
      type: DataTypes.STRING(4),
      allowNull: true
    },
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
    tableName: 'concrete_product',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "concrete_product_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
