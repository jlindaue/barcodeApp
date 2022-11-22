const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('product', {
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
    base_amount: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    base_amount_unit: {
      type: DataTypes.STRING(4),
      allowNull: true
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: "uk_jmivyxk9rmgysrmsqw15lqr5b"
    }
  }, {
    sequelize,
    tableName: 'product',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "product_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "uk_jmivyxk9rmgysrmsqw15lqr5b",
        unique: true,
        fields: [
          { name: "name" },
        ]
      },
    ]
  });
};
