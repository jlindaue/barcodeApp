const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('product', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    barcode: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    base_amount: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    base_amount_unit: {
      type: DataTypes.STRING(4),
      allowNull: true
    },
    brand: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: "uk_jmivyxk9rmgysrmsqw15lqr5b"
    },
    package_size: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    package_size_unit: {
      type: DataTypes.STRING(4),
      allowNull: true
    },
    popularity: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    type: {
      type: DataTypes.STRING(1),
      allowNull: false
    },
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'category',
        key: 'id'
      }
    },
    subcategory_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'category',
        key: 'id'
      }
    },
    subsubcategory_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'category',
        key: 'id'
      }
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
